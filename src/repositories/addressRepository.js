const pool = require('../config/database');
const logger = require('../utils/logger');
const Address = require('../models/address');

class AddressRepository {
    async createAddress(address) {
        try {
            logger.info('Creating address in the database');
            await pool.query('INSERT INTO address SET ?', [address]);
            return { ...address };
        } catch (error) {
            logger.error(`Error creating address in the database: ${error}`);
            throw error;
        }
    }

    async updateAddress(addressId, address) {
        try {
            logger.info('Updating address in the database');
            await pool.query('UPDATE address SET ? WHERE address_id = ?', [address, addressId]);
            return { ...address, addressId };
        } catch (error) {
            logger.error(`Error updating address in the database: ${error}`);
            throw error;
        }
    }

    async getAllAddresses(page, pageSize) {
        try {
            logger.info('Fetching all addresses from the database');
            const offset = (page - 1) * pageSize;
            const query = `SELECT * FROM address LIMIT ?, ?`;
            const countQuery = `SELECT COUNT(*) as totalCount FROM address`;

            const results = await pool.query(query, [offset, pageSize]);
            const [countResults] = await pool.query(countQuery);
            const totalCount = countResults.totalCount;

            return {
                data: results.map(Address.fromDatabaseRow),
                totalCount,
            };
        } catch (error) {
            logger.error(`Error fetching addresses from the database: ${error}`);
            throw error;
        }
    }

    async getAddressById(id) {
        try {
            logger.info('Fetching address by ID from the database');
            const result = await pool.query('SELECT * FROM address WHERE address_id = ?', [id]);
            return Address.fromDatabaseRow(result[0]);
        } catch (error) {
            logger.error(`Error fetching address by ID from the database: ${error}`);
            throw error;
        }
    }

    async getAddressByStreet(street) {
        try {
            logger.info('Fetching address by street from the database');
            const result = await pool.query('SELECT * FROM address WHERE street = ?', [street]);
            return Address.fromDatabaseRow(result[0]);
        } catch (error) {
            logger.error(`Error fetching address by street from the database: ${error}`);
            throw error;
        }
    }
}

module.exports = new AddressRepository();
