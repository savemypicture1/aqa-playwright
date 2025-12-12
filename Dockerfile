FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

COPY . .

RUN npm ci

CMD ["npm", "run", "test"]
