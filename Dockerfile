# stage1 as builder
FROM node:lts-alpine as builder

WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build

# Stage 2
FROM nginx:alpine as production-build
# copy nginx configuration into webserver
COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist /usr/share/nginx/html
# doc only
EXPOSE 5173
ENTRYPOINT ["nginx", "-g", "daemon off;"]
