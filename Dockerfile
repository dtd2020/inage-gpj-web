# install node and build app
FROM node:18.18.1-alpine as web
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# insall nginx
FROM nginx:1.24.0-alpine as nginx
COPY --from=web /app/dist /usr/share/nginx/html