
#include <stdio.h>
#include <stdlib.h>
#include <openssl/evp.h>

int calculateSHA256(const char *filename, char hash[65])
{
    FILE *file = fopen(filename, "rb");

    if (file == NULL)
    {
        printf("Cannot open file\n");
        return 0;
    }

    EVP_MD_CTX *ctx = EVP_MD_CTX_new();

    if (ctx == NULL)
    {
        fclose(file);
        return 0;
    }

    unsigned char buffer[4096];
    unsigned char digest[EVP_MAX_MD_SIZE];
    unsigned int length;

    EVP_DigestInit_ex(ctx, EVP_sha256(), NULL);

    size_t bytes;

    while ((bytes = fread(buffer, 1, sizeof(buffer), file)) > 0)
    {
        EVP_DigestUpdate(ctx, buffer, bytes);
    }

    if (ferror(file))
    {
        fclose(file);
        EVP_MD_CTX_free(ctx);
        return 0;
    }

    EVP_DigestFinal_ex(ctx, digest, &length);

    for (unsigned int i = 0; i < length; i++)
    {
        sprintf(hash + (i * 2), "%02x", digest[i]);
    }

    hash[64] = '\0';

    fclose(file);
    EVP_MD_CTX_free(ctx);

    return 1;
}

#ifndef SHA256_LIBRARY
int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("Usage: ./sha256 filename\n");
        return 1;
    }

    char hash[65];

    if (calculateSHA256(argv[1], hash))
    {
        printf("SHA-256: %s\n", hash);
    }
    else
    {
        printf("Hash calculation failed\n");
        return 1;
    }

    return 0;
}
#endif