#FROM node:16-slim AS builder
FROM node:16-slim AS development

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN apt-get update && apt-get install -y openssl libssl-dev
RUN npm install
# RUN npx prisma generate

COPY . .

RUN npm run build

# FROM node:16-slim AS development

#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package*.json ./
#COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]