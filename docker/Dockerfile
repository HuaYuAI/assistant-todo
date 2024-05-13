# nginx配置
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY out /usr/share/nginx/html
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
# docker build -t task-manager-nginx .
# docker run -d -p 3001:3001 --restart unless-stopped --name task-manager-nginx task-manager-nginx
