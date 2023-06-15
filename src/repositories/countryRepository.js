const pool = require('../config/database');
const logger = require('../utils/logger');
const Country = require('../models/country');

class CountryRepository {
    async getAllCountries(page, pageSize) {
        try {
            logger.info('Fetching all countries from the database');
            const offset = (page - 1) * pageSize;
            const query = `SELECT * FROM country LIMIT ?, ?`;
            const countQuery = `SELECT COUNT(*) as totalCount FROM country`;

            const results = await pool.query(query, [offset, pageSize]);
            const [countResults] = await pool.query(countQuery);
            const totalCount = countResults.totalCount;

            return {
                data: results.map(Country.fromDatabaseRow),
                totalCount,
            };
        } catch (error) {
            logger.error(`Error fetching countries from the database: ${error}`);
            throw error;
        }
    }

    async getCountryById(countryId) {
        try {
            logger.info(`Fetching country with ID ${countryId} from the database`);
            const query = `SELECT * FROM country WHERE country_id = ?`;
            const results = await pool.query(query, [countryId]);

            if (results.length === 0) {
                return null;
            }

            return Country.fromDatabaseRow(results[0]);
        } catch (error) {
            logger.error(`Error fetching country with ID ${countryId} from the database: ${error}`);
            throw error;
        }
    }
}

module.exports = new CountryRepository();
