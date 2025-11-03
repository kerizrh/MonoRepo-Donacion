# Despliegue en Render

Esta guía te ayudará a desplegar tu aplicación Donaccion en Render usando el archivo `render.yaml` configurado.

## Archivos Necesarios

Asegúrate de tener estos archivos en tu repositorio:

```
monorepo-donaccion/
├── render.yaml                    # Configuración principal de Render
├── Dockerfile.mysql              # Dockerfile para MySQL
├── mysql-config.cnf              # Configuración de MySQL
├── backend/
│   └── Dockerfile               # Dockerfile del backend (optimizado)
├── frontend/
│   ├── Dockerfile               # Dockerfile del frontend (optimizado)
│   └── nginx.conf               # Configuración de Nginx
└── RENDER_DEPLOYMENT.md         # Esta documentación
```

## Configuración en Render

### 1. Conectar tu Repositorio

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Haz clic en "New +" → "Blueprint"
3. Conecta tu repositorio de GitHub
4. Render detectará automáticamente el archivo `render.yaml`

### 2. Variables de Entorno

Render configurará automáticamente estas variables:

**Para MySQL:**
- `MYSQL_ROOT_PASSWORD` (generada automáticamente)
- `MYSQL_DATABASE=donaccion`
- `MYSQL_USER=donaccion_user`
- `MYSQL_PASSWORD` (generada automáticamente)

**Para Backend:**
- `SPRING_PROFILES_ACTIVE=production`
- `SERVER_PORT=10000`
- `SPRING_DATASOURCE_URL` (conectada automáticamente a MySQL)
- `SPRING_DATASOURCE_USERNAME` (conectada automáticamente)
- `SPRING_DATASOURCE_PASSWORD` (conectada automáticamente)

**Para Frontend:**
- `NODE_ENV=production`
- `API_URL` (conectada automáticamente al backend)

### 3. Despliegue

1. Render detectará el archivo `render.yaml`
2. Creará automáticamente 3 servicios:
   - **MySQL Database** (servicio privado)
   - **Backend API** (servicio web)
   - **Frontend** (servicio web)

## URLs de Acceso

Una vez desplegado, tendrás:

- **Frontend**: `https://frontend-donaccion.onrender.com`
- **Backend API**: `https://backend-donaccion.onrender.com`
- **Base de datos**: Solo accesible internamente

## Verificación del Despliegue

### Backend
```bash
# Health check
curl https://backend-donaccion.onrender.com/health

# API de prueba
curl https://backend-donaccion.onrender.com/api/test
```

### Frontend
- Visita `https://frontend-donaccion.onrender.com`
- Debería cargar la aplicación Angular
- Verifica que las llamadas a la API funcionen

## Troubleshooting

### Problemas Comunes

#### 1. Backend no se conecta a la base de datos
- **Causa**: El backend se inicia antes que MySQL
- **Solución**: Render maneja esto automáticamente con `fromService`

#### 2. Frontend no puede conectar al backend
- **Causa**: URL de API incorrecta
- **Solución**: Verificar que `API_URL` esté configurada correctamente

#### 3. Error de CORS
- **Causa**: Configuración de CORS en el backend
- **Solución**: Asegúrate de que el backend permita el dominio del frontend

### Logs y Debugging

1. **Ver logs del backend:**
   - Ve al dashboard de Render
   - Selecciona el servicio backend
   - Ve a la pestaña "Logs"

2. **Ver logs del frontend:**
   - Selecciona el servicio frontend
   - Ve a la pestaña "Logs"

3. **Ver logs de MySQL:**
   - Selecciona el servicio MySQL
   - Ve a la pestaña "Logs"

## Costos

**Plan Starter (Gratuito):**
- MySQL: $0/mes (con limitaciones)
- Backend: $0/mes (se duerme después de 15 min de inactividad)
- Frontend: $0/mes (se duerme después de 15 min de inactividad)

**Plan Standard (Recomendado para producción):**
- MySQL: $7/mes
- Backend: $7/mes
- Frontend: $7/mes

## Actualizaciones

Para actualizar tu aplicación:

1. Haz push a tu rama principal
2. Render detectará automáticamente los cambios
3. Reconstruirá y redesplegará los servicios

## Notas Importantes

- **Sleep Mode**: En el plan gratuito, los servicios se duermen después de 15 minutos de inactividad
- **Cold Start**: El primer acceso después del sleep puede tardar 30-60 segundos
- **Base de datos**: MySQL en el plan gratuito tiene limitaciones de almacenamiento
- **Variables de entorno**: Se generan automáticamente, no necesitas configurarlas manualmente

## Soporte

Si tienes problemas:

1. Revisa los logs en el dashboard de Render
2. Verifica que todos los archivos estén en el repositorio
3. Asegúrate de que el archivo `render.yaml` esté en la raíz del proyecto
4. Contacta al soporte de Render si es necesario

## Enlaces Útiles

- [Documentación de Render](https://render.com/docs)
- [Render Dashboard](https://dashboard.render.com)
- [Configuración de Blueprint](https://render.com/docs/blueprint-spec)
