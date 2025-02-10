FROM node:18

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN mkdir -p /app/public/assets

CMD ["npm", "run", "dev", "--", "--host"]
