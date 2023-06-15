const pool = require('../config/database');
const logger = require('../utils/logger');
const department = require('../models/department');
const Department = require('../models/department');

class departmentRepository {
    async getAlldepartments(page, pageSize) {
        try {
            logger.info('Fetching all departments from the database');
            const offset = (page - 1) * pageSize;
            const query = `SELECT * FROM department LIMIT ?, ?`;
            const countQuery = `SELECT COUNT(*) as totalCount FROM department`;

            const results = await pool.query(query, [offset, pageSize]);
            const [countResults] = await pool.query(countQuery);
            const totalCount = countResults.totalCount;

            return {
                data: results.map(department.fromDatabaseRow),
                totalCount,
            };
        } catch (error) {
            logger.error(`Error fetching departments from the database: ${error}`);
            throw error;
        }
    }

    async getDepartamentByID(departmentId) {
        try {
            logger.info(`Fetching department with ID ${departmentId} from the database`);
            const query = `SELECT * FROM department WHERE department_id = ?`;
            const results = await pool.query(query, [departmentId]);

            if (results.length === 0) {
                return null;
            }

            return Department.fromDatabaseRow(results[0]);
        } catch (error) {
            logger.error(`Error fetching departmament with ID ${departmentId} from the database: ${error}`);
            throw error;
        }
    }
}

module.exports = new departmentRepository();

