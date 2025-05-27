# Step 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# Step 2: Runtime image
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/public public
COPY --from=builder /app/.next .next
COPY --from=builder /app/src src
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./

EXPOSE 3000

CMD ["npm", "start"]
