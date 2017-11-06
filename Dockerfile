FROM node:8.9.0-alpine as builder

WORKDIR /app
COPY package.json package.json
RUN yarn
COPY . .
RUN npm run build

FROM node:8.9.0-alpine as test

WORKDIR /app
COPY --from=builder /app /app
RUN npm test


FROM node:8.9.0-alpine

WORKDIR /app
COPY --from=builder /app /app
CMD [ "node", "dist/src/main.js" ]