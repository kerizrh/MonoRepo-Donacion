# Dockerfile para el backend (desarrollo local)
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Instalar Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copiar archivos de Maven
COPY pom.xml ./

# Descargar dependencias
RUN mvn dependency:go-offline -B

# Copiar código fuente
COPY src ./src

# Compilar la aplicación
RUN mvn clean package -DskipTests

# Imagen de producción
FROM eclipse-temurin:21-jre-alpine
WORKDIR /opt

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Copiar el JAR compilado
COPY --from=build /app/target/*.jar app.jar

# Configuraciones por defecto (se pueden sobrescribir)
ENV SPRING_PROFILES_ACTIVE=production
ENV SERVER_PORT=8080

# Exponer puerto (configurable)
EXPOSE 8080

# Comando de inicio con configuraciones JVM optimizadas
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]