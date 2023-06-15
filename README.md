# Servicio Operation - Track 369

Este proyecto es un servicio API REST para la gestión de entidades internas paramétricas en la aplicación Track 369. El servicio se encarga de la administración de las siguientes entidades: city, department, country, zone, identification_type, non_collection_reason, non_delivery_reason, truck, zone_history.

## Requisitos

- Node.js v14.x o superior
- MySQL 8.x o superior

## Instalación

1. Clona este repositorio en tu máquina local:

   `git clone https://github.com/your-username/track-369-operation.git`

2. Cambia al directorio del proyecto:

   `cd track-369-operation`

3. Instala las dependencias del proyecto:

   `npm install`

4. Copia el archivo de configuración de ejemplo y ajusta las variables de entorno según tus necesidades:

   `cp .env.example .env`

   A continuación, configura las variables de entorno en el archivo `.env`:

   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=myuser
   DB_PASS=mypassword
   DB_NAME=mydatabase
   JWT_SECRET=mysecret
   JWT_EXPIRATION=86400
   LOG_LEVEL=info
   LOG_LABEL=myapp
   APP_PAGESIZE=10

El servidor se iniciará en el puerto especificado en el archivo `.env`. Por defecto, se utiliza el puerto 3000. La API estará disponible en `http://localhost:3000`.

## Documentación

La documentación de la API se encuentra disponible a través de Swagger bajo la ruta `/api/docs`.
