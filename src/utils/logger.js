const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, printf, splat, errors } = format;

// Formato personalizado para los mensajes de registro
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// Leer el nivel de registro, la etiqueta y el formato de la marca de tiempo de las variables de entorno o utilizar valores predeterminados
const logLevel = process.env.LOG_LEVEL || 'debug';
const logLabel = process.env.LOG_LABEL || 'bussines-error';
const timestampFormat = process.env.TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss';

const logger = createLogger({
    level: logLevel,
    format: combine(
        errors({ stack: true }), // Captura y formatea las pilas de errores
        splat(), // Permite la interpolación de mensajes de registro
        label({ label: logLabel }),
        timestamp({ format: timestampFormat }),
        myFormat
    ),
    transports: [new transports.Console()],
});

module.exports = logger;
