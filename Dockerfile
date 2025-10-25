# Dockerfile para el backend (temporal)
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

# Copiar el JAR compilado
COPY --from=backend-build /app/target/*.jar app.jar

# Configuraciones por defecto
ENV SPRING_PROFILES_ACTIVE=production
ENV SERVER_PORT=8080

# Exponer puerto
EXPOSE 8080

# Comando de inicio
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
