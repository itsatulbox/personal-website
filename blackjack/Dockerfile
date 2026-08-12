# syntax=docker/dockerfile:1

FROM ghcr.io/itsatulbox/blackjack:latest@sha256:f0e62029f04920e7e27d0435178e2fce993e539228a64923cf8a975d736ce9d8 AS game

FROM node:22-trixie-slim@sha256:db8a96a63e5264607ada2d206758876ebbed6a12be2ada7517793cbfb0c2a29c AS build
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
# node-pty publishes no Linux prebuild, so it always compiles here. The addon it
# produces is bound to this image's glibc and Node ABI, which is why the runtime
# stage below must be the same base image and not a smaller one.
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force

FROM node:22-trixie-slim@sha256:db8a96a63e5264607ada2d206758876ebbed6a12be2ada7517793cbfb0c2a29c
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY package.json server.js ./
COPY --from=game --chmod=0755 /usr/local/bin/blackjack /usr/local/bin/blackjack

USER node
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||8080)+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "server.js"]
