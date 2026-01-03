FROM oven/bun:alpine

WORKDIR /app
COPY . .

ENV NODE_ENV=production

RUN bun install

EXPOSE 5000/tcp

CMD ["bun", "start"]