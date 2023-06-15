require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger');
const swaggerRoutes = require('./src/routes/swaggerRoutes');
const countryRoutes = require('./src/routes/countryRoutes');
const cityRoutes = require('./src/routes/cityRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const addressRoutes = require('./src/routes/addressRoutes');
const zoneRoutes = require('./src/routes/zoneRoutes');
const identificationTypeRoutes = require('./src/routes/identificationTypeRoutes');
const logger = require('./src/utils/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    logger.info(`{[timestamp: ${timestamp}] method: ${req.method} 
                    originalUrl: ${req.originalUrl} body:${JSON.stringify(req.body)} 
                    params:${JSON.stringify(req.params)}  query:${JSON.stringify(req.query)}}`);
    next();
});

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    logger.info(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use('/docs/json', swaggerRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/countries', countryRoutes);
app.use('/cities', cityRoutes);
app.use('/departments', departmentRoutes);
app.use('/addresses', addressRoutes);
app.use('/zones', zoneRoutes);
app.use('/identificationTypes', identificationTypeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
