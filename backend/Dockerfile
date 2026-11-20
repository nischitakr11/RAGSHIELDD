
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    gcc \
    libc6-dev \
    libssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/ /app/

RUN gcc -D_GNU_SOURCE -Wall -Wextra -O2 \
    server.c -o server \
    && gcc -DSHA256_LIBRARY -Wall -Wextra -O2 \
    ledger.c sha256.c -o ragshield -lcrypto

ENV RAGSHIELD_DATA_DIR=/var/data

RUN mkdir -p /var/data/uploads

EXPOSE 8080

CMD ["./server"]

