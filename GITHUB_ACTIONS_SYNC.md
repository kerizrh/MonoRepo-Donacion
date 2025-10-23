# Sincronización Automática de Ramas

Este documento explica cómo funciona la sincronización automática entre las ramas `main` y `staging` usando GitHub Actions.

## Workflows Configurados

### 1. `auto-sync-staging.yml` (Principal)
- **Trigger**: 
  - Push directo a `main`
  - Merge de Pull Request a `main`
  - Diariamente a las 2 AM UTC
  - Ejecución manual
- **Función**: Sincroniza automáticamente `staging` con `main`
- **Características**:
  - Verifica si `staging` necesita actualización
  - Crea backup antes del merge
  - Maneja conflictos creando issues automáticamente
  - Notificaciones de éxito/error
  - Registra información del PR que activó la sincronización

### 2. `notify-sync-status.yml` (Notificaciones)
- **Trigger**: Después de que termine `auto-sync-staging.yml`
- **Función**: Envía notificaciones del estado de sincronización
- **Extensible**: Puede integrarse con Slack, Discord, etc.

## Cómo Funciona

### Flujo Automático:
1. **Merge de PR a `main`** → Se ejecuta el workflow automáticamente
2. **Verificación** → Comprueba si `staging` está atrás
3. **Backup** → Crea backup de `staging` actual
4. **Merge** → Fusiona `main` en `staging`
5. **Push** → Actualiza `staging` en GitHub
6. **Notificación** → Informa del resultado

### Flujo de Trabajo Completo:
1. **Desarrollo** → Trabajas en `develop`
2. **Push** → `git push origin develop`
3. **Pull Request** → Creas PR de `develop` → `main`
4. **Review** → El equipo revisa el PR
5. **Merge** → Se hace merge del PR a `main`
6. **Sincronización** → Automáticamente se sincroniza `staging` con `main`

### En Caso de Conflictos:
1. **Detección** → Workflow detecta conflictos
2. **Issue** → Crea issue automático con detalles
3. **Notificación** → Alerta al equipo
4. **Resolución Manual** → El equipo resuelve conflictos

## Configuración

### Permisos Necesarios:
El workflow usa `GITHUB_TOKEN` que ya tiene permisos básicos. Para funcionalidades avanzadas, puedes crear un Personal Access Token:

1. Ve a GitHub Settings → Developer settings → Personal access tokens
2. Crea un token con permisos de `repo`
3. Agrega como secret: `GITHUB_TOKEN_ADVANCED`

### Personalización:

#### Cambiar Horario de Sincronización:
```yaml
schedule:
  - cron: '0 2 * * *'  # 2 AM UTC diario
  - cron: '0 9 * * 1'  # 9 AM UTC los lunes
```

#### Agregar Notificaciones a Slack:
```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Monitoreo

### Ver Estado de Sincronización:
1. Ve a **Actions** en tu repositorio
2. Busca "Auto Sync Staging Branch"
3. Revisa los logs de cada ejecución

### Logs Importantes:
- **"needs-update"**: Si staging necesita actualización
- **"Merge exitoso"**: Sincronización completada
- **"Conflicto en el merge"**: Requiere intervención manual

## Troubleshooting

### Problema: "Permission denied"
**Solución**: Verificar que el token tenga permisos de escritura

### Problema: "Merge conflict"
**Solución**: 
1. Revisar el issue creado automáticamente
2. Resolver conflictos manualmente en staging
3. Hacer push de los cambios

### Problema: "Workflow no se ejecuta"
**Solución**:
1. Verificar que el archivo esté en `.github/workflows/`
2. Comprobar sintaxis YAML
3. Verificar que la rama `main` tenga el archivo

## Métricas

El workflow registra:
- Sincronizaciones exitosas
- Fallos por conflictos
- Frecuencia de actualizaciones
- Commits sincronizados

## Comandos Manuales

### Sincronizar Manualmente:
```bash
# Desde tu máquina local
git checkout staging
git merge main
git push origin staging
```

### Ejecutar Workflow Manualmente:
1. Ve a Actions → "Auto Sync Staging Branch"
2. Haz clic en "Run workflow"
3. Selecciona la rama y ejecuta

## Notas Importantes

- **No edites `staging` directamente**: Los cambios se sobrescribirán
- **Usa `main` para desarrollo**: Es la rama fuente de verdad
- **Revisa issues automáticos**: Pueden indicar problemas de sincronización
- **Backup automático**: Se crean ramas de respaldo antes de cada merge

## Soporte

Si tienes problemas:
1. Revisa los logs en GitHub Actions
2. Verifica los issues creados automáticamente
3. Consulta la documentación de GitHub Actions
4. Contacta al equipo de desarrollo
