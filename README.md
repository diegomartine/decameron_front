
# decameron_front

## Requisitos

1. **Node.js** versión 18 o superior.
2. **Vue.js** (Instalado automáticamente al correr `npm install`).
3. **Axios** (Se instala con `npm install axios`).

## Instalación

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Verifica el archivo `.env`:

   - Asegúrate de configurar `VUE_APP_SERVICE_API` con la URL correcta de tu backend.
   - Ejemplo de configuración (si tu backend corre en `http://127.0.0.1:8000`):

     ```env
     VUE_APP_SERVICE_API=http://127.0.0.1:8000/api
     ```

   Si el backend no está en esta URL, actualiza el archivo `.env` con la URL correcta.

3. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run serve
   ```

## Comandos útiles

- **Compilar y cargar para desarrollo:**

   ```bash
   npm run serve
   ```

- **Compilar y minificar para producción:**

   ```bash
   npm run build
   ```

- **Linter y corrección de archivos:**

   ```bash
   npm run lint
   ```

## Verificación

1. Asegúrate de que el backend esté corriendo:

   ```bash
   http://127.0.0.1:8000/api/hoteles
   ```

   Si no obtienes una respuesta válida (código 200), verifica la configuración del backend.

2. Si modificas el archivo `.env`, reinicia el servidor Vue:

   ```bash
   npm run serve
   ```

## Personalización

Para más configuraciones de Vue, revisa la [Documentación de Vue CLI](https://cli.vuejs.org/config/).
```

