FROM node:20

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get update && apt-get install -y openssl

RUN npm install

# Generate Prisma client without trying to connect to the database
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

# Use a shell script to handle startup
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"] 