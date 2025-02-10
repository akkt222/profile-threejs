# ベースイメージとして Node.js を使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー
COPY package.json ./
RUN npm install --legacy-peer-deps

# ソースコードをコピー
COPY . .

# アセットディレクトリを作成
RUN mkdir -p /app/public/assets

# Vite を使って開発サーバーを起動
CMD ["npm", "run", "dev", "--", "--host"]
