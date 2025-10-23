# Dockerfile para el servicio principal (Backend)
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copiar archivos de Maven del backend
COPY backend/.mvn/ .mvn/
COPY backend/mvnw backend/pom.xml ./
RUN ./mvnw dependency:go-offline -B

# Copiar código fuente del backend
COPY backend/src ./src

# Compilar la aplicación
RUN ./mvnw clean package -DskipTests

# Imagen de producción
FROM eclipse-temurin:21-jre-alpine
WORKDIR /opt

# Copiar el JAR compilado
COPY --from=build /app/target/*.jar app.jar

# Configuraciones para Render
ENV SPRING_PROFILES_ACTIVE=production
ENV SERVER_PORT=10000

# Exponer puerto (Render usa el puerto 10000)
EXPOSE 10000

# Comando de inicio con configuraciones JVM optimizadas
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
