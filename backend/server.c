
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <ctype.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <netinet/in.h>
#include <sys/stat.h>

#define MAX_UPLOAD (10 * 1024 * 1024)
#define HEADER_SIZE 8192

void respond(int client, int status, const char *message)
{
    char header[512];
    const char *label = status == 200 ? "OK" :
                        status == 400 ? "Bad Request" :
                        status == 404 ? "Not Found" : "Server Error";

    snprintf(header, sizeof(header),
        "HTTP/1.1 %d %s\r\n"
        "Content-Type: text/plain; charset=utf-8\r\n"
        "Access-Control-Allow-Origin: *\r\n"
        "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n"
        "Access-Control-Allow-Headers: Content-Type\r\n"
        "Content-Length: %zu\r\n"
        "Connection: close\r\n\r\n",
        status, label, strlen(message));

    send(client, header, strlen(header), 0);
    send(client, message, strlen(message), 0);
}

int safeName(char *name)
{
    if (!name || !*name || strlen(name) > 200) return 0;
    if (strstr(name, "..")) return 0;

    for (int i = 0; name[i]; i++)
        if (!isalnum((unsigned char)name[i]) &&
            name[i] != '.' && name[i] != '_' &&
            name[i] != '-' && name[i] != ' ')
            return 0;

    return 1;
}

void decodeName(char *s)
{
    char *src = s, *dst = s;

    while (*src)
    {
        if (*src == '%' && isxdigit(src[1]) && isxdigit(src[2]))
        {
            char hex[3] = {src[1], src[2], 0};
            *dst++ = (char)strtol(hex, NULL, 16);
            src += 3;
        }
        else if (*src == '+')
        {
            *dst++ = ' ';
            src++;
        }
        else
        {
            *dst++ = *src++;
        }
    }
    *dst = '\0';
}

void runEngine(int client, const char *action, const char *path)
{
    int fd[2];
    if (pipe(fd) != 0)
    {
        respond(client, 500, "Could not start engine");
        return;
    }

    pid_t pid = fork();

    if (pid == 0)
    {
        close(fd[0]);
        dup2(fd[1], STDOUT_FILENO);
        dup2(fd[1], STDERR_FILENO);
        close(fd[1]);

        execl("./ragshield", "./ragshield", action, path, (char *)NULL);
        _exit(127);
    }

    close(fd[1]);

    char output[4096] = "";
    ssize_t n;
    size_t used = 0;

    while ((n = read(fd[0], output + used,
                     sizeof(output) - used - 1)) > 0)
    {
        used += n;
        if (used >= sizeof(output) - 1) break;
    }

    output[used] = '\0';
    close(fd[0]);

    int status;
    waitpid(pid, &status, 0);

    if (WIFEXITED(status) && WEXITSTATUS(status) == 0)
        respond(client, 200, output);
    else
        respond(client, 400, output[0] ? output : "Engine failed");
}

void showLedger(int client)
{
    FILE *p = popen("./ragshield ledger", "r");

    if (!p)
    {
        respond(client, 500, "Could not read ledger");
        return;
    }

    char output[65536] = "";
    char line[1024];
    size_t used = 0;

    while (fgets(line, sizeof(line), p))
    {
        size_t len = strlen(line);
        if (used + len < sizeof(output) - 1)
        {
            memcpy(output + used, line, len);
            used += len;
        }
    }

    output[used] = '\0';
    pclose(p);
    respond(client, 200, output);
}

void handleClient(int client)
{
    char request[HEADER_SIZE + 1] = {0};
    size_t used = 0;
    char *end = NULL;

    while (used < HEADER_SIZE)
    {
        ssize_t n = recv(client, request + used,
                         HEADER_SIZE - used, 0);
        if (n <= 0) return;
        used += n;
        request[used] = '\0';

        end = strstr(request, "\r\n\r\n");
        if (end) break;
    }

    if (!end)
    {
        respond(client, 400, "Invalid request");
        return;
    }

    size_t headerLength = (size_t)(end + 4 - request);
    size_t bodyReceived = used - headerLength;
    size_t contentLength = 0;

    char *lengthHeader = strcasestr(request, "Content-Length:");
    if (lengthHeader)
        contentLength = strtoul(lengthHeader + 15, NULL, 10);

    if (contentLength > MAX_UPLOAD)
    {
        respond(client, 400, "File exceeds 10 MB limit");
        return;
    }

    char *body = malloc(contentLength + 1);
    if (!body)
    {
        respond(client, 500, "Memory allocation failed");
        return;
    }

    if (bodyReceived > contentLength)
        bodyReceived = contentLength;

    memcpy(body, request + headerLength, bodyReceived);

    while (bodyReceived < contentLength)
    {
        ssize_t n = recv(client, body + bodyReceived,
                         contentLength - bodyReceived, 0);
        if (n <= 0)
        {
            free(body);
            respond(client, 400, "Incomplete upload");
            return;
        }
        bodyReceived += n;
    }
    body[contentLength] = '\0';

    char method[16] = "", path[512] = "";
    sscanf(request, "%15s %511s", method, path);

    if (strcmp(method, "OPTIONS") == 0)
    {
        respond(client, 200, "OK");
    }
    else if (strcmp(method, "GET") == 0 &&
             strcmp(path, "/api/health") == 0)
    {
        respond(client, 200, "RAGSHIELD API running");
    }
    else if (strcmp(method, "GET") == 0 &&
             strcmp(path, "/api/ledger") == 0)
    {
        showLedger(client);
    }
    else if (strcmp(method, "POST") == 0 &&
             (strncmp(path, "/api/upload?", 12) == 0 ||
              strncmp(path, "/api/verify?", 12) == 0))
    {
        int isUpload = strncmp(path, "/api/upload?", 12) == 0;
        char *query = strstr(path, "filename=");

        if (!query)
        {
            respond(client, 400, "Missing filename");
        }
        else
        {
            char filename[256] = "";
            strncpy(filename, query + 9, sizeof(filename) - 1);

            char *amp = strchr(filename, '&');
            if (amp) *amp = '\0';

            decodeName(filename);

            if (!safeName(filename))
            {
                respond(client, 400, "Invalid filename");
            }
            else
            {
                char savedPath[320];
             const char *dataDir = getenv("RAGSHIELD_DATA_DIR");

             if (dataDir == NULL || dataDir[0] == '\0')
                dataDir = ".";

             snprintf(savedPath, sizeof(savedPath),
                 "%s/uploads/%s", dataDir, filename);
                

                if (isUpload)
                {
                    char uploadDir[512];

                    snprintf(uploadDir, sizeof(uploadDir),
                         "%s/uploads", dataDir);

                    mkdir(uploadDir, 0755);

                    FILE *file = fopen(savedPath, "wb");

                    if (!file)
                    {
                        respond(client, 500, "Cannot save upload");
                    }
                    else
                    {
                        size_t written = fwrite(body, 1,
                                                contentLength, file);
                        fclose(file);

                        if (written != contentLength)
                            respond(client, 500, "Upload write failed");
                        else
                            runEngine(client, "register", savedPath);
                    }
                }
                else
                {
                    runEngine(client, "verify", savedPath);
                }
            }
        }
    }
    else
    {
        respond(client, 404, "Unknown API endpoint");
    }

    free(body);
}

int main()
{
        const char *portEnv = getenv("PORT");
    int port = portEnv ? atoi(portEnv) : 8080;

    if (port <= 0 || port > 65535)
        port = 8080;
    int server = socket(AF_INET, SOCK_STREAM, 0);
    if (server < 0)
    {
        perror("Socket");
        return 1;
    }

    int option = 1;
    setsockopt(server, SOL_SOCKET, SO_REUSEADDR,
               &option, sizeof(option));

    struct sockaddr_in address = {0};
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons((unsigned short)port);

    if (bind(server, (struct sockaddr *)&address,
             sizeof(address)) < 0)
    {
        perror("Bind");
        close(server);
        return 1;
    }

    listen(server, 10);
    printf("RAGSHIELD API running on port %d\n", port);

    while (1)
    {
        int client = accept(server, NULL, NULL);
        if (client >= 0)
        {
            handleClient(client);
            close(client);
        }
    }

    close(server);
    return 0;
}
