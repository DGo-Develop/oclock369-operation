const pool = require('../config/database');
const logger = require('../utils/logger');
const Zone = require('../models/zone');

class ZoneRepository {
    async getAllZones(page, pageSize) {
        try {
            logger.info('Fetching all zones from the database');
            const offset = (page - 1) * pageSize;
            const query = `SELECT * FROM zone LIMIT ?, ?`;
            const countQuery = `SELECT COUNT(*) as totalCount FROM zone`;

            const results = await pool.query(query, [offset, pageSize]);
            const [countResults] = await pool.query(countQuery);
            const totalCount = countResults.totalCount;

            return {
                data: results.map(Zone.fromDatabaseRow),
                totalCount,
            };
        } catch (error) {
            logger.error(`Error fetching zones from the database: ${error}`);
            throw error;
        }
    }

    async getZonesByName(name) {
        try {
            logger.info(`Fetching zones with name ${name} from the database`);
            const query = `SELECT * FROM zone WHERE name LIKE ?`;
            const results = await pool.query(query, [`%${name}%`]);

            if (results.length === 0) {
                return null;
            }

            return Zone.fromDatabaseRow(results[0]);
        } catch (error) {
            logger.error(`Error fetching zones with name ${name} from the database: ${error}`);
            throw error;
        }
    }

    async getZoneById(zoneId) {
        try {
            logger.info(`Fetching zones with id ${zoneId} from the database`);
            const query = `SELECT * FROM zone WHERE zone_id = ?`;
            const results = await pool.query(query, [zoneId]);

            if (results.length === 0) {
                return null;
            }

            return Zone.fromDatabaseRow(results[0]);
        } catch (error) {
            logger.error(`Error fetching zone with Id ${zoneId} from the database: ${error}`);
            throw error;
        }
    }
}

module.exports = new ZoneRepository();
