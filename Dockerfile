# Builder
FROM docker.io/oven/bun:latest AS builder
WORKDIR /build/

ENV NODE_ENV=production
ENV PORT=5000

COPY . ./

RUN bun install --production --frozen-lockfile --ignore-scripts
RUN bun run build:standalone

# Runner
FROM gcr.io/distroless/base-nossl-debian12:nonroot AS runner

ENV PORT=5000

COPY --from=builder /build/dist/ghrd ./

EXPOSE $PORT/tcp

CMD ["./ghrd"]
