# 🏥 Monorepo Donaccion

Sistema de donaciones con backend Spring Boot y frontend Angular.

> **💻 Compatibilidad:** Este proyecto funciona en Windows, Linux y macOS. Los comandos Docker son universales, pero algunos comandos de diagnóstico varían por sistema operativo.

## ⚡ Inicio Rápido

**¿Solo quieres levantar el proyecto y empezar a trabajar?**

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd monorepo-donaccion

# 2. Crear variables de entorno
echo "MYSQL_ROOT_PASSWORD=rootpassword" > env
echo "MYSQL_DATABASE=donaccion" >> env
echo "MYSQL_USER=donaccion_user" >> env
echo "MYSQL_PASSWORD=donaccion_password" >> env
echo "SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/donaccion" >> env
echo "SPRING_DATASOURCE_USERNAME=donaccion_user" >> env
echo "SPRING_DATASOURCE_PASSWORD=donaccion_password" >> env

# 3. Levantar todo con Docker
docker-compose up -d --build

# 4. Verificar que esté funcionando
docker-compose logs -f
```

**Una vez que veas "Started DonaccionApplication" y "ready for connections":**
- Frontend: http://localhost:4200
- Backend: http://localhost:8080
- API de prueba: http://localhost:8080/api/test

## 🚀 Instalación Detallada

### Opción 1: Con Docker Compose (Recomendado) 🐳

Esta es la forma más fácil y completa para levantar todo el proyecto de una vez:

#### Prerrequisitos
- **Docker Desktop** instalado y ejecutándose
- **Git** para clonar el repositorio

#### Pasos para levantar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd monorepo-donaccion
   ```

2. **Crear el archivo de variables de entorno:**
   ```bash
   # Crear archivo env en la raíz del proyecto
   echo "MYSQL_ROOT_PASSWORD=rootpassword" > env
   echo "MYSQL_DATABASE=donaccion" >> env
   echo "MYSQL_USER=donaccion_user" >> env
   echo "MYSQL_PASSWORD=donaccion_password" >> env
   echo "SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/donaccion" >> env
   echo "SPRING_DATASOURCE_USERNAME=donaccion_user" >> env
   echo "SPRING_DATASOURCE_PASSWORD=donaccion_password" >> env
   ```

3. **Abrir Docker Desktop:**
   - Buscar "Docker Desktop" en el menú de inicio
   - Ejecutar como administrador si es necesario
   - **Esperar** a que esté completamente iniciado (ícono verde en la bandeja del sistema)

4. **Verificar que Docker esté funcionando:**
   ```bash
   docker ps
   ```
   Si ves un error, significa que Docker Desktop no está ejecutándose.

5. **Levantar todo el proyecto:**
   ```bash
   docker-compose up -d --build
   ```
   > **Nota:** Usar `--build` la primera vez para construir las imágenes
   > 
   > **Mejora:** El backend ahora espera automáticamente a que MySQL esté completamente listo antes de iniciar.

6. **Esperar a que todos los servicios estén listos:**
   ```bash
   # Ver logs para verificar que todo esté funcionando
   docker-compose logs -f
   ```
   
   **Indicadores de que está funcionando:**
   - MySQL: "ready for connections" + health check exitoso
   - Backend: "Started DonaccionApplication" (se inicia automáticamente después de MySQL)
   - Frontend: "nginx started"

7. **Verificar que todos los servicios estén funcionando:**
   ```bash
   docker-compose ps
   ```

#### Acceso a las aplicaciones
- **Frontend Angular**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **Base de datos MySQL**: localhost:3307

#### Endpoints disponibles del backend
- **Página principal**: http://localhost:8080/
- **Health check**: http://localhost:8080/health
- **API de prueba**: http://localhost:8080/api/test

### Opción 2: Desarrollo Local (Sin Docker) 💻

Si prefieres desarrollo local, puedes levantar cada servicio por separado:

#### Prerrequisitos
- **Java 21** instalado
- **Node.js** y **npm** instalados
- **MySQL** instalado localmente

#### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend (Angular)
```bash
cd frontend
npm install
npm start
```

### Opción 3: Híbrido (MySQL en Docker, Apps Locales) 🔄

Si quieres usar Docker solo para MySQL y desarrollar localmente:

```bash
# Levantar solo MySQL
docker-compose up mysql -d

# Luego en otra terminal, levantar backend localmente
cd backend
./mvnw spring-boot:run

# Y en otra terminal, levantar frontend
cd frontend
npm install
npm start
```

## 📋 Estructura del Proyecto

```
monorepo-donaccion/
├── backend/          # API REST con Spring Boot
├── frontend/         # SPA con Angular
├── docker-compose.yml # Configuración de contenedores
└── .gitignore        # Archivos excluidos del control de versiones
```

## 🔐 Variables de Entorno Requeridas

Crea un archivo `env` en la raíz del proyecto con:

```env
MYSQL_ROOT_PASSWORD=tu_password_root
MYSQL_DATABASE=donaccion
MYSQL_USER=tu_usuario
MYSQL_PASSWORD=tu_password

SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/donaccion
SPRING_DATASOURCE_USERNAME=tu_usuario
SPRING_DATASOURCE_PASSWORD=tu_password
```

**⚠️ IMPORTANTE:** Este archivo está en `.gitignore` y NO debe subirse a GitHub.

## 🛠️ Gestión y Mantenimiento

### Comandos útiles para gestión
```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql

# Detener todos los servicios
docker-compose down

# Reiniciar un servicio específico
docker-compose restart backend

# Ver el estado de los contenedores
docker-compose ps
```

### Limpieza de Docker
```bash
# Limpiar solo el proyecto (recomendado)
docker-compose down --volumes --remove-orphans
docker rmi monorepo-donaccion-backend monorepo-donaccion-frontend

# Limpieza completa de Docker (¡CUIDADO!)
docker rm -f $(docker ps -aq)          # Eliminar TODOS los contenedores
docker rmi -f $(docker images -q)       # Eliminar TODAS las imágenes
docker volume prune -f                 # Eliminar TODOS los volúmenes
docker network prune -f                # Eliminar TODAS las redes
```

> **⚠️ ADVERTENCIA:** Los comandos de limpieza completa eliminarán **TODOS** los contenedores, imágenes y volúmenes de Docker en tu sistema, no solo los del proyecto.

## 🔧 Troubleshooting

### Problemas comunes al levantar el proyecto

#### Error: "Docker Desktop no está ejecutándose"
```
error during connect: Get "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/v1.51/...
```
**Solución:**
1. Abrir Docker Desktop desde el menú de inicio
2. Esperar a que aparezca el ícono verde en la bandeja del sistema
3. Verificar con `docker ps`

#### Error: "unable to get image"
```
unable to get image 'monorepo-donaccion-backend'
```
**Solución:**
1. Asegurarse de que Docker Desktop esté ejecutándose
2. Ejecutar `docker-compose up --build` para reconstruir las imágenes

#### Error: "Port already in use"
```
Error starting userland proxy: listen tcp4 0.0.0.0:4200: bind: address already in use
```
**Solución:**

**Windows:**
```bash
netstat -ano | findstr :4200
```

**Linux/macOS:**
```bash
netstat -tulpn | grep :4200
# o alternativamente
lsof -i :4200
```

1. Verificar qué proceso está usando el puerto con los comandos anteriores
2. Detener el proceso o cambiar el puerto en `docker-compose.yml`

#### Error: "Communications link failure" (Base de datos)
```
Communications link failure
The last packet sent successfully to the server was 0 milliseconds ago
```
**Solución:**
1. **Esperar a que MySQL esté completamente iniciado:**
   ```bash
   docker-compose logs mysql
   # Buscar: "ready for connections"
   ```
2. **Si el backend falla al conectar, reiniciarlo:**
   ```bash
   docker-compose restart backend
   ```
3. **Verificar las variables de entorno en el archivo `env`**

#### Error: "404 Not Found" en el backend
```
Whitelabel Error Page
This application has no explicit mapping for /error
```
**Solución:**
1. Verificar que el backend esté ejecutándose: `docker-compose logs backend`
2. Probar los endpoints disponibles:
   - http://localhost:8080/ (página principal)
   - http://localhost:8080/health (health check)
   - http://localhost:8080/api/test (API de prueba)

#### Error: "Connection refused" al backend
**Solución:**
1. Verificar que el backend esté ejecutándose: `docker-compose ps`
2. Ver logs del backend: `docker-compose logs backend`
3. Si hay errores de base de datos, reiniciar: `docker-compose restart backend`

#### Error de conexión a la base de datos
**Solución:**
1. Verificar que MySQL esté ejecutándose: `docker-compose logs mysql`
2. Verificar las variables de entorno en el archivo `env`
3. Reiniciar los servicios: `docker-compose restart`

### Comandos de diagnóstico

**Comandos universales (todos los sistemas):**
```bash
# Ver el estado de todos los contenedores
docker-compose ps

# Ver logs detallados
docker-compose logs -f

# Reiniciar todo el proyecto
docker-compose down
docker-compose up -d
```

**Verificar puertos disponibles:**

**Windows:**
```bash
netstat -ano | findstr :4200
netstat -ano | findstr :8080
netstat -ano | findstr :3307
```

**Linux/macOS:**
```bash
netstat -tulpn | grep :4200
netstat -tulpn | grep :8080
netstat -tulpn | grep :3307

# Alternativamente con lsof
lsof -i :4200
lsof -i :8080
lsof -i :3307
```

## 🛡️ Seguridad y Flujo de Trabajo

### Rama Principal Protegida
- La rama `main` está protegida y requiere Pull Requests para cambios
- No se permiten push directos a `main`
- Todos los cambios deben pasar por revisión de código

### Variables de Entorno
- ⚠️ **NUNCA** commitees archivos `.env` o `env`
- Las credenciales de base de datos están en el archivo `env` (ignorado por git)
- Configura las variables de entorno en tu servidor de producción

### Flujo de Trabajo Recomendado

1. **Para desarrollo diario:**
   ```bash
   git checkout develop
   git pull origin develop
   # Hacer tus cambios
   git add .
   git commit -m "Descripción del cambio"
   git push origin develop
   ```

2. **Para subir cambios a producción:**
   - Crear Pull Request desde `develop` hacia `main`
   - Solicitar revisión de código
   - Una vez aprobado, hacer merge

3. **Para features nuevas:**
   ```bash
   git checkout develop
   git checkout -b feature/nombre-de-la-feature
   # Desarrollar la feature
   git push origin feature/nombre-de-la-feature
   # Crear PR hacia develop
   ```

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request