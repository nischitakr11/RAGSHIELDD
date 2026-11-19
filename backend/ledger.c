
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <openssl/evp.h>

#define LEDGER_FILE "ragshield-ledger.txt"
#define TEMP_FILE "ragshield-ledger.tmp"

int calculateSHA256(const char *filename, char hash[65]);

typedef struct Block
{
    int index;
    char document[256];
    char documentHash[65];
    char previousHash[65];
    char blockHash[65];
    struct Block *next;
} Block;

Block *head = NULL;
Block *last = NULL;

int validHash(const char *hash)
{
    if (strlen(hash) != 64)
        return 0;

    for (int i = 0; i < 64; i++)
    {
        if (!((hash[i] >= '0' && hash[i] <= '9') ||
              (hash[i] >= 'a' && hash[i] <= 'f')))
            return 0;
    }

    return 1;
}

int calculateBlockHash(Block *b, char hash[65])
{
    char data[600];
    unsigned char digest[32];
    unsigned int len;

    int n = snprintf(data, sizeof(data), "%d|%s|%s|%s",
                     b->index, b->document,
                     b->documentHash, b->previousHash);

    if (n < 0 || n >= sizeof(data))
        return 0;

    if (EVP_Digest(data, strlen(data), digest, &len,
                   EVP_sha256(), NULL) != 1 || len != 32)
        return 0;

    for (int i = 0; i < 32; i++)
        sprintf(hash + i * 2, "%02x", digest[i]);

    hash[64] = '\0';
    return 1;
}

int addBlock(const char *name, const char *docHash)
{
    Block *b = malloc(sizeof(Block));

    if (b == NULL)
        return 0;

    b->index = (last == NULL) ? 0 : last->index + 1;

    strcpy(b->document, name);
    strcpy(b->documentHash, docHash);

    if (last == NULL)
    {
        memset(b->previousHash, '0', 64);
        b->previousHash[64] = '\0';
    }
    else
    {
        strcpy(b->previousHash, last->blockHash);
    }

    if (!calculateBlockHash(b, b->blockHash))
    {
        free(b);
        return 0;
    }

    b->next = NULL;

    if (head == NULL)
        head = b;
    else
        last->next = b;

    last = b;
    return 1;
}

int verifyLedger()
{
    Block *temp = head;
    char previous[65];
    char calculated[65];
    int index = 0;

    memset(previous, '0', 64);
    previous[64] = '\0';

    while (temp != NULL)
    {
        if (temp->index != index ||
            !validHash(temp->documentHash) ||
            !validHash(temp->previousHash) ||
            !validHash(temp->blockHash))
            return 0;

        if (strcmp(temp->previousHash, previous) != 0)
            return 0;

        if (!calculateBlockHash(temp, calculated))
            return 0;

        if (strcmp(temp->blockHash, calculated) != 0)
            return 0;

        strcpy(previous, temp->blockHash);
        temp = temp->next;
        index++;
    }

    return 1;
}

int saveLedger()
{
    FILE *file = fopen(TEMP_FILE, "w");
    Block *temp = head;

    if (file == NULL)
        return 0;

    while (temp != NULL)
    {
        if (fprintf(file, "%d|%s|%s|%s|%s\n",
                    temp->index, temp->document,
                    temp->documentHash, temp->previousHash,
                    temp->blockHash) < 0)
        {
            fclose(file);
            remove(TEMP_FILE);
            return 0;
        }

        temp = temp->next;
    }

    if (fclose(file) != 0)
    {
        remove(TEMP_FILE);
        return 0;
    }

    if (rename(TEMP_FILE, LEDGER_FILE) != 0)
    {
        remove(TEMP_FILE);
        return 0;
    }

    return 1;
}

int loadLedger()
{
    FILE *file = fopen(LEDGER_FILE, "r");
    char line[700];

    if (file == NULL)
        return 1;

    while (fgets(line, sizeof(line), file) != NULL)
    {
        Block *b = malloc(sizeof(Block));

        if (b == NULL)
        {
            fclose(file);
            return 0;
        }

        b->next = NULL;

        if (sscanf(line, "%d|%255[^|]|%64[^|]|%64[^|]|%64s",
                   &b->index, b->document,
                   b->documentHash, b->previousHash,
                   b->blockHash) != 5 ||
            !validHash(b->documentHash) ||
            !validHash(b->previousHash) ||
            !validHash(b->blockHash) ||
            strchr(b->document, '\n') != NULL)
        {
            free(b);
            fclose(file);
            return 0;
        }

        if (head == NULL)
            head = b;
        else
            last->next = b;

        last = b;
    }

    if (ferror(file))
    {
        fclose(file);
        return 0;
    }

    fclose(file);
    return verifyLedger();
}

void registerDocument(const char *filename)
{
    Block *temp = head;
    char hash[65];

    while (temp != NULL)
    {
        if (strcmp(temp->document, filename) == 0)
        {
            printf("Document already registered!\n");
            return;
        }

        temp = temp->next;
    }

    if (!calculateSHA256(filename, hash))
    {
        printf("Could not read or hash the document!\n");
        return;
    }

    if (!addBlock(filename, hash))
    {
        printf("Could not create ledger block!\n");
        return;
    }

    if (!saveLedger())
    {
        printf("Could not save ledger!\n");
        return;
    }

    printf("Document registered successfully!\n");
}

void verifyDocument(const char *filename)
{
    Block *temp = head;
    char currentHash[65];

    while (temp != NULL)
    {
        if (strcmp(temp->document, filename) == 0)
            break;

        temp = temp->next;
    }

    if (temp == NULL)
    {
        printf("Document is not registered!\n");
        return;
    }

    if (!calculateSHA256(filename, currentHash))
    {
        printf("Could not read or hash the document!\n");
        return;
    }

    if (strcmp(currentHash, temp->documentHash) == 0)
        printf("VERIFIED: Document is unchanged.\n");
    else
        printf("MODIFIED: Document differs from registered content!\n");
}

void displayLedger()
{
    Block *temp = head;

    if (temp == NULL)
    {
        printf("Ledger is empty.\n");
        return;
    }

    while (temp != NULL)
    {
        printf("\nBlock: %d\n", temp->index);
        printf("Document: %s\n", temp->document);
        printf("Document Hash: %s\n", temp->documentHash);
        printf("Previous Hash: %s\n", temp->previousHash);
        printf("Block Hash: %s\n", temp->blockHash);

        temp = temp->next;
    }
}

int main(int argc, char *argv[])
{
    if (!loadLedger())
    {
        printf("Ledger is invalid or could not be loaded!\n");
        return 1;
    }

    if (argc == 3 && strcmp(argv[1], "register") == 0)
        registerDocument(argv[2]);

    else if (argc == 3 && strcmp(argv[1], "verify") == 0)
        verifyDocument(argv[2]);

    else if (argc == 2 && strcmp(argv[1], "ledger") == 0)
        displayLedger();

    else
        printf("Commands:\n"
               "./ragshield register filename\n"
               "./ragshield verify filename\n"
               "./ragshield ledger\n");

    return 0;
}
