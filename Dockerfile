FROM node:current-alpine

WORKDIR /app/identicon-server
COPY . .

ENV PORT=3000
ENV PATH=~/.cargo/bin:$PATH

RUN apk add --no-cache \
        ca-certificates \
        gcc \
        gcompat \
        curl

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal
RUN yarn install

CMD ["sh", "-c", "yarn server -l tcp://0.0.0.0:${PORT}"]