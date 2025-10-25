# Dockerfile para el servicio completo (Frontend + Backend)
FROM node:20-alpine AS frontend-build
WORKDIR /app

# Copiar archivos del frontend
COPY frontend/package*.json ./
RUN npm install

# Copiar código fuente del frontend
COPY frontend/ ./

# Construir el frontend
RUN npm run build

# Backend build
FROM eclipse-temurin:21-jdk AS backend-build
WORKDIR /app

# Instalar Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copiar archivos de Maven del backend
COPY backend/pom.xml ./

# Descargar dependencias
RUN mvn dependency:go-offline -B

# Copiar código fuente del backend
COPY backend/src ./src

# Compilar la aplicación
RUN mvn clean package -DskipTests

# Imagen de producción
FROM eclipse-temurin:21-jre-alpine
WORKDIR /opt

# Instalar nginx para servir el frontend
RUN apk add --no-cache nginx

# Copiar el JAR compilado
COPY --from=backend-build /app/target/*.jar app.jar

# Copiar el frontend construido
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# Configurar nginx
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /api { \
        proxy_pass http://127.0.0.1:8080; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
}' > /etc/nginx/http.d/default.conf

# Configuraciones por defecto
ENV SPRING_PROFILES_ACTIVE=production
ENV SERVER_PORT=8080

# Exponer puertos
EXPOSE 80 8080

# Script de inicio
RUN echo '#!/bin/sh' > /opt/start.sh && \
    echo 'nginx' >> /opt/start.sh && \
    echo 'java -Xmx512m -Xms256m -jar app.jar' >> /opt/start.sh && \
    chmod +x /opt/start.sh

# Comando de inicio
ENTRYPOINT ["/opt/start.sh"]
