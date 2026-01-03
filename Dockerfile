FROM oven/bun:alpine

WORKDIR /app
COPY . .

ENV NODE_ENV=production

RUN apk add --no-cache ffmpeg
RUN bun install

EXPOSE 5000/tcp

CMD ["bun", "start"]