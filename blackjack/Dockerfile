FROM ghcr.io/itsatulbox/blackjack:latest AS game

FROM node:22-trixie-slim
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY server.js .
COPY --from=game /usr/local/bin/blackjack /usr/local/bin/blackjack
EXPOSE 8080
CMD ["node", "server.js"]
