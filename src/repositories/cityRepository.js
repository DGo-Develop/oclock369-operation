const pool = require('../config/database');
const logger = require('../utils/logger');
const City = require('../models/city');

class CityRepository {
    async getAllCities(page, pageSize) {
        try {
            logger.info('Fetching all cities from the database');
            const offset = (page - 1) * pageSize;
            const query = `SELECT * FROM city LIMIT ?, ?`;
            const countQuery = `SELECT COUNT(*) as totalCount FROM city`;

            const results = await pool.query(query, [offset, pageSize]);
            const [countResults] = await pool.query(countQuery);
            const totalCount = countResults.totalCount;

            return {
                data: results.map(City.fromDatabaseRow),
                totalCount,
            };
        } catch (error) {
            logger.error(`Error fetching cities from the database: ${error}`);
            throw error;
        }
    }

    async getCityById(cityId) {
        try {
            logger.info(`Fetching city with ID ${cityId} from the database`);
            const query = `SELECT * FROM city WHERE city_id = ?`;
            const results = await pool.query(query, [cityId]);

            if (results.length === 0) {
                return null;
            }

            return City.fromDatabaseRow(results[0]);
        } catch (error) {
            logger.error(`Error fetching city with ID ${cityId} from the database: ${error}`);
            throw error;
        }
    }
}

module.exports = new CityRepository();
