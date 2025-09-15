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

## 🚀 Configuración del Proyecto

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend (Angular)
```bash
cd frontend
npm install
ng serve
```

### Docker Compose
```bash
docker-compose up -d
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

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

