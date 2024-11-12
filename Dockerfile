FROM node:20-slim as dependencies
WORKDIR /next
COPY package.json package-lock.json ./
RUN npm install

FROM node:20-slim as builder
WORKDIR /next
COPY . ./
COPY --from=dependencies /next/package.json ./
COPY --from=dependencies /next/package-lock.json ./
COPY --from=dependencies /next/node_modules ./node_modules
RUN npm run build

FROM node:20-slim as runner
WORKDIR /next

COPY --from=builder /next/public ./public
COPY --from=builder /next/package.json ./package.json
COPY --from=builder /next/.next ./.next
COPY --from=builder /next/node_modules ./node_modules

EXPOSE 3010
CMD "npm" "run" "start"
