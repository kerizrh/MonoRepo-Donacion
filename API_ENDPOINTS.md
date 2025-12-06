# Documentación de Endpoints - API Donacción

## Tabla de Contenidos
- [Campañas de Donación (OSFL)](#campañas-de-donación-osfl)
- [Campañas Públicas (Donantes)](#campañas-públicas-donantes)

---

## Campañas de Donación (OSFL)

Base URL: `/api/campanias`

### Listar Campañas

Obtiene todas las campañas de donación del usuario autenticado.

**Endpoint:** `GET /api/campanias`

**Autenticación:** Requerida (JWT)

**Rol requerido:** `osfl`

**Respuesta exitosa:**
```json
[
  {
    "id": 1,
    "usuarioId": "auth0|123456",
    "nombre": "Ayuda para refugio de animales",
    "descripcion": "Campaña para construir un nuevo refugio",
    "fechaLimite": "2025-12-31",
    "metaFondos": 10000.00,
    "montoRecaudado": 2500.00,
    "imagen": "https://example.com/imagen.jpg",
    "categorias": ["animales", "construcción"]
  }
]
```

**Códigos de estado:**
- `200 OK` - Campañas obtenidas exitosamente
- `403 Forbidden` - Usuario no tiene rol OSFL

---

### Crear Campaña

Crea una nueva campaña de donación.

**Endpoint:** `POST /api/campanias`

**Autenticación:** Requerida (JWT)

**Rol requerido:** `osfl`

**Cuerpo de la petición:**
```json
{
  "nombre": "Ayuda para refugio de animales",
  "descripcion": "Campaña para construir un nuevo refugio",
  "fechaLimite": "2025-12-31",
  "metaFondos": 10000.00,
  "montoRecaudado": 0.00,
  "imagen": "https://example.com/imagen.jpg",
  "categorias": ["animales", "construcción"]
}
```

**Respuesta exitosa:**
```json
{
  "id": 1,
  "usuarioId": "auth0|123456",
  "nombre": "Ayuda para refugio de animales",
  "descripcion": "Campaña para construir un nuevo refugio",
  "fechaLimite": "2025-12-31",
  "metaFondos": 10000.00,
  "montoRecaudado": 0.00,
  "imagen": "https://example.com/imagen.jpg",
  "categorias": ["animales", "construcción"]
}
```

**Códigos de estado:**
- `201 Created` - Campaña creada exitosamente
- `403 Forbidden` - Usuario no tiene rol OSFL

---

### Actualizar Campaña

Actualiza una campaña de donación existente.

**Endpoint:** `PUT /api/campanias/{id}`

**Autenticación:** Requerida (JWT)

**Rol requerido:** `osfl`

**Parámetros de ruta:**
- `id` (Long) - ID de la campaña a actualizar

**Cuerpo de la petición:**
```json
{
  "nombre": "Ayuda para refugio de animales - ACTUALIZADO",
  "descripcion": "Campaña actualizada para construir un nuevo refugio",
  "fechaLimite": "2025-12-31",
  "metaFondos": 15000.00,
  "montoRecaudado": 5000.00,
  "imagen": "https://example.com/imagen-nueva.jpg",
  "categorias": ["animales", "construcción", "urgente"]
}
```

**Respuesta exitosa:**
```json
{
  "id": 1,
  "usuarioId": "auth0|123456",
  "nombre": "Ayuda para refugio de animales - ACTUALIZADO",
  "descripcion": "Campaña actualizada para construir un nuevo refugio",
  "fechaLimite": "2025-12-31",
  "metaFondos": 15000.00,
  "montoRecaudado": 5000.00,
  "imagen": "https://example.com/imagen-nueva.jpg",
  "categorias": ["animales", "construcción", "urgente"]
}
```

**Códigos de estado:**
- `200 OK` - Campaña actualizada exitosamente
- `403 Forbidden` - Usuario no tiene rol OSFL o no es el propietario de la campaña
- `404 Not Found` - Campaña no encontrada

---

### Eliminar Campaña

Elimina una campaña de donación existente.

**Endpoint:** `DELETE /api/campanias/{id}`

**Autenticación:** Requerida (JWT)

**Rol requerido:** `osfl`

**Parámetros de ruta:**
- `id` (Long) - ID de la campaña a eliminar

**Códigos de estado:**
- `204 No Content` - Campaña eliminada exitosamente
- `403 Forbidden` - Usuario no tiene rol OSFL o no es el propietario de la campaña
- `404 Not Found` - Campaña no encontrada

---

### Obtener Campaña por ID

Obtiene los detalles de una campaña específica.

**Endpoint:** `GET /api/campanias/{id}`

**Autenticación:** Requerida (JWT)

**Roles requeridos:** `osfl` o `donante`

**Parámetros de ruta:**
- `id` (Long) - ID de la campaña

**Respuesta exitosa:**
```json
{
  "id": 1,
  "usuarioId": "auth0|123456",
  "nombre": "Ayuda para refugio de animales",
  "descripcion": "Campaña para construir un nuevo refugio",
  "fechaLimite": "2025-12-31",
  "metaFondos": 10000.00,
  "montoRecaudado": 2500.00,
  "imagen": "https://example.com/imagen.jpg",
  "categorias": ["animales", "construcción"]
}
```

**Códigos de estado:**
- `200 OK` - Campaña obtenida exitosamente
- `403 Forbidden` - Usuario no tiene rol válido (osfl o donante)
- `404 Not Found` - Campaña no encontrada

---

## Campañas Públicas (Donantes)

Base URL: `/api/public/campanias`

### Listar Campañas Activas

Obtiene todas las campañas de donación que están activas (fecha límite mayor o igual a la fecha actual).

**Endpoint:** `GET /api/public/campanias/activas`

**Autenticación:** Requerida (JWT)

**Rol requerido:** `donante`

**Respuesta exitosa:**
```json
[
  {
    "id": 1,
    "usuarioId": "auth0|123456",
    "nombre": "Ayuda para refugio de animales",
    "descripcion": "Campaña para construir un nuevo refugio",
    "fechaLimite": "2025-12-31",
    "metaFondos": 10000.00,
    "montoRecaudado": 2500.00,
    "imagen": "https://example.com/imagen.jpg",
    "categorias": ["animales", "construcción"]
  },
  {
    "id": 2,
    "usuarioId": "auth0|789012",
    "nombre": "Educación para todos",
    "descripcion": "Becas educativas para niños de escasos recursos",
    "fechaLimite": "2025-11-30",
    "metaFondos": 5000.00,
    "montoRecaudado": 1200.00,
    "imagen": "https://example.com/educacion.jpg",
    "categorias": ["educación", "niños"]
  }
]
```

**Códigos de estado:**
- `200 OK` - Campañas activas obtenidas exitosamente
- `403 Forbidden` - Usuario no tiene rol donante

---

## Notas de Seguridad

- Todos los endpoints requieren autenticación mediante JWT (JSON Web Token).
- Los roles se validan mediante claims personalizados en el JWT: `https://donaccion.com/claims/roles`.
- Las operaciones de creación, actualización y eliminación solo pueden ser realizadas por el propietario de la campaña (validación por `usuarioId`).
- El endpoint de campañas activas filtra automáticamente por fecha para mostrar solo campañas vigentes.

---

## Modelo de Datos: CampaniaDonacion
```json
{
  "id": "Long - ID único de la campaña",
  "usuarioId": "String - ID del usuario propietario (Auth0)",
  "nombre": "String - Nombre de la campaña",
  "descripcion": "String - Descripción detallada",
  "fechaLimite": "LocalDate - Fecha límite de la campaña (formato: YYYY-MM-DD)",
  "metaFondos": "Double - Meta de fondos a recaudar",
  "montoRecaudado": "Double - Monto actualmente recaudado",
  "imagen": "String - URL de la imagen de la campaña",
  "categorias": "List<String> - Categorías asociadas a la campaña"
}
```