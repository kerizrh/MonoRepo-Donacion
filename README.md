# 🏥 Monorepo Donaccion

Sistema de donaciones con backend Spring Boot y frontend Angular.

## 🛡️ Seguridad y Protección de Código

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

## 🚀 Cómo Levantar el Proyecto Localmente

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

2. **Abrir Docker Desktop:**
   - Buscar "Docker Desktop" en el menú de inicio
   - Ejecutar como administrador si es necesario
   - **Esperar** a que esté completamente iniciado (ícono verde en la bandeja del sistema)

3. **Verificar que Docker esté funcionando:**
   ```bash
   docker ps
   ```
   Si ves un error, significa que Docker Desktop no está ejecutándose.

4. **Levantar todo el proyecto:**
   ```bash
   docker-compose up -d
   ```

5. **Verificar que todos los servicios estén funcionando:**
   ```bash
   docker-compose ps
   ```

#### Acceso a las aplicaciones
- **Frontend Angular**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **Base de datos MySQL**: localhost:3307

#### Comandos útiles para gestión
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
1. Verificar qué proceso está usando el puerto: `netstat -ano | findstr :4200`
2. Detener el proceso o cambiar el puerto en `docker-compose.yml`

#### Error de conexión a la base de datos
**Solución:**
1. Verificar que MySQL esté ejecutándose: `docker-compose logs mysql`
2. Verificar las variables de entorno en el archivo `env`
3. Reiniciar los servicios: `docker-compose restart`

### Comandos de diagnóstico
```bash
# Ver el estado de todos los contenedores
docker-compose ps

# Ver logs detallados
docker-compose logs -f

# Verificar que los puertos estén disponibles
netstat -ano | findstr :4200
netstat -ano | findstr :8080
netstat -ano | findstr :3307

# Reiniciar todo el proyecto
docker-compose down
docker-compose up -d
```

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

