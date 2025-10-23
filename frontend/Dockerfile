FROM node:22-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --include=dev

# Copiar código fuente
COPY . .

# Configurar variables de entorno para producción
ENV NODE_ENV=production

# Construir la aplicación
RUN npm run build --configuration=production

# Imagen de producción con Nginx
FROM nginx:alpine

# Copiar archivos construidos
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Configuración de Nginx para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
