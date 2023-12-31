# Client build
FROM node:21-alpine as client-builder

WORKDIR /app

COPY client/package.json ./

RUN yarn install

COPY client .

RUN yarn build

# Server build
FROM golang:1.21-alpine as server-builder

WORKDIR /app

COPY server . 

RUN go build -o scorebug

# Final image
FROM alpine:latest

WORKDIR /app/server

COPY --from=client-builder /app/build /app/client/build
COPY --from=server-builder /app/scorebug /app/server

ENV PORT=8080

ENTRYPOINT ["./scorebug", "start", "/app/client/build", "/state/state.json"]

