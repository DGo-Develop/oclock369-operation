const pool = require('../config/database');
const logger = require('../utils/logger');
const IdentificationType = require('../models/identificationType');

class IdentificationTypeRepository {
    async getAllIdentificationTypes(page, pageSize) {
        try {
            logger.info('Fetching all identification types from the database');
            const offset = (page - 1) * pageSize;
            const query = `SELECT * FROM identification_type LIMIT ?, ?`;
            const countQuery = `SELECT COUNT(*) as totalCount FROM identification_type`;

            const results = await pool.query(query, [offset, pageSize]);
            const [countResults] = await pool.query(countQuery);
            const totalCount = countResults.totalCount;

            return {
                data: results.map(IdentificationType.fromDatabaseRow),
                totalCount,
            };
        } catch (error) {
            logger.error(`Error fetching identification types from the database: ${error}`);
            throw error;
        }
    }
}

module.exports = new IdentificationTypeRepository();
