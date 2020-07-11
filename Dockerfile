FROM node:current-alpine

WORKDIR /app/identicon-server
COPY . .

ENV PORT=3000

RUN apk add --no-cache \
        ca-certificates \
        gcc \
        gcompat \
        rust \
        cargo

RUN yarn install

CMD ["sh", "-c", "yarn server -l tcp://0.0.0.0:${PORT}"]