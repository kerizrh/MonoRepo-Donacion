# 📚 Guía de GitHub para el Equipo - Proyecto Donaccion

## 🎯 ¿Qué es GitHub y por qué lo usamos?

**GitHub** es como un "Google Drive" para código, pero mucho más inteligente:
- 📁 **Almacena** todo el código del proyecto
- 👥 **Permite colaborar** sin pisar el trabajo de otros
- 🔄 **Guarda historial** de todos los cambios
- 🛡️ **Protege** el código principal de errores

## 🔑 Conceptos Básicos que Debes Saber

### 📂 **Repositorio (Repo)**
- Es como una carpeta que contiene todo el proyecto
- Nuestro repo: `https://github.com/kerizrh/MonoRepo-Donacion`

### 🌿 **Ramas (Branches)**
- Son como "copias" del proyecto para trabajar
- **`main`**: Código que funciona perfectamente (NO tocar directamente)
- **`develop`**: Código en desarrollo (aquí trabajamos)
- **`feature/nombre`**: Rama para una funcionalidad específica

### 💾 **Commit**
- Es como "guardar" con un mensaje explicativo
- Ejemplo: "Agregué botón de login"

### 🔄 **Pull Request (PR)**
- Es como pedir permiso para agregar tus cambios al código principal
- Alguien revisa tu código antes de que se una al proyecto

## 🚀 Configuración Inicial (Solo una vez)

### 1. Crear cuenta en GitHub
1. Ve a [github.com](https://github.com)
2. Haz clic en "Sign up"
3. Crea tu cuenta

### 2. Instalar Git en tu computadora
- **Windows**: Descarga desde [git-scm.com](https://git-scm.com)
- **Mac**: `brew install git` o descarga desde git-scm.com
- **Linux**: `sudo apt install git`

### 3. Configurar Git (solo una vez)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### 4. Clonar el proyecto
```bash
git clone https://github.com/kerizrh/MonoRepo-Donacion.git
cd MonoRepo-Donacion
```

## 📋 Flujo de Trabajo Diario

### 🎯 **Escenario 1: Trabajar en una funcionalidad nueva**

```bash
# 1. Actualizar tu copia local
git checkout develop
git pull origin develop

# 2. Crear una rama para tu feature
git checkout -b feature/agregar-login

# 3. Hacer tus cambios en el código
# (Editar archivos normalmente)

# 4. Guardar tus cambios
git add .
git commit -m "Agregué formulario de login"

# 5. Subir tu rama
git push origin feature/agregar-login
```

### 🌐 **En GitHub (navegador web):**
1. Ve al repositorio en GitHub
2. Verás un botón "Compare & pull request"
3. Haz clic y crea un Pull Request hacia `develop`
4. Describe qué hiciste
5. Espera a que alguien revise tu código

### ✅ **Después de la revisión:**
- Si hay comentarios: Haz los cambios y sube una nueva versión
- Si está aprobado: Se hace "merge" automáticamente

## 🎯 **Escenario 2: Trabajar en desarrollo diario**

```bash
# 1. Cambiar a la rama de desarrollo
git checkout develop
git pull origin develop

# 2. Hacer cambios pequeños
# (Arreglar bugs, mejorar código existente)

# 3. Guardar cambios
git add .
git commit -m "Arreglé bug en el formulario"

# 4. Subir cambios
git push origin develop
```

## 🎯 **Escenario 3: Subir cambios a producción**

```bash
# 1. Asegurarse que develop esté actualizado
git checkout develop
git pull origin develop

# 2. Crear Pull Request en GitHub: develop → main
# (Esto se hace en el navegador web)

# 3. Esperar aprobación y merge
```

## 🚨 Comandos de Emergencia

### Si algo sale mal:
```bash
# Ver el estado actual
git status

# Deshacer cambios no guardados
git checkout -- .

# Ver historial de commits
git log --oneline

# Cambiar a una rama específica
git checkout nombre-de-la-rama
```

## 📱 Interfaz de GitHub (Navegador Web)

### 🏠 **Página Principal del Repo**
- **Code**: Ver archivos del proyecto
- **Issues**: Reportar problemas o ideas
- **Pull requests**: Ver PRs activos
- **Actions**: Ver procesos automáticos (CI/CD)

### 🔍 **Navegando el Código**
- Haz clic en archivos para verlos
- Usa el botón "Raw" para ver código sin formato
- Usa "Blame" para ver quién cambió cada línea

### 💬 **Pull Requests**
- **Files changed**: Ver qué archivos modificaste
- **Conversation**: Comentarios y discusión
- **Commits**: Ver cada commit individual

## 🎯 Reglas Importantes del Equipo

### ✅ **SIEMPRE hacer:**
1. **Pull antes de empezar** a trabajar
2. **Commit frecuentemente** con mensajes claros
3. **Crear ramas** para funcionalidades grandes
4. **Revisar código** de compañeros
5. **Comunicar** qué estás trabajando

### ❌ **NUNCA hacer:**
1. **Push directo a `main`** (está protegida)
2. **Commit sin mensaje** descriptivo
3. **Trabajar en `main`** directamente
4. **Merge sin revisión** (excepto en develop para cambios pequeños)

## 💡 Consejos para Principiantes

### 📝 **Mensajes de Commit Claros**
```bash
# ❌ Malo
git commit -m "cambios"

# ✅ Bueno
git commit -m "Agregué validación de email en formulario de registro"
git commit -m "Arreglé bug que causaba error 500 en login"
git commit -m "Mejoré diseño del botón de donación"
```

### 🌿 **Nombres de Ramas Descriptivos**
```bash
# ❌ Malo
git checkout -b rama1
git checkout -b cambios

# ✅ Bueno
git checkout -b feature/sistema-pagos
git checkout -b fix/error-validacion-email
git checkout -b mejora/diseño-mobile
```

### 🔄 **Frecuencia de Commits**
- **Haz commit cada 30-60 minutos** de trabajo
- **No esperes** a terminar toda la funcionalidad
- **Es mejor** muchos commits pequeños que uno gigante

## 🆘 ¿Necesitas Ayuda?

### 📞 **Contactos del Equipo**
- **Líder Técnico**: [Nombre y contacto]
- **GitHub Admin**: [Nombre y contacto]

### 🔗 **Recursos Útiles**
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub Desktop](https://desktop.github.com/) (Interfaz gráfica más fácil)
- [GitHub Learning Lab](https://lab.github.com/)

### 🐛 **Problemas Comunes**

**"No puedo hacer push"**
- Verifica que tienes permisos
- Asegúrate de estar en la rama correcta

**"Conflicto de merge"**
- Pide ayuda al líder técnico
- No intentes resolverlo solo la primera vez

**"Perdí mis cambios"**
- `git reflog` te puede ayudar a recuperarlos
- Pide ayuda antes de hacer algo drástico

## 🎉 ¡Felicidades!

Si llegaste hasta aquí, ya sabes lo básico de GitHub. Recuerda:
- **La práctica hace al maestro**
- **No tengas miedo de hacer preguntas**
- **Es mejor preguntar que romper algo**

---

*Esta guía fue creada para el equipo de Donaccion. Si tienes sugerencias para mejorarla, ¡avísanos!*
