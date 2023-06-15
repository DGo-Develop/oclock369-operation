const departamentService = require('../services/departmentService');
const logger = require('../utils/logger');
const httpResponse = require('../utils/httpResponse');

class departamentController {
    async getAllDepartments(req, res) {
        try {
            logger.info('Fetching all departaments');

            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize || process.env.APP_PAGESIZE);

            const departaments = await departamentService.getAllDepartments(parseInt(page), parseInt(pageSize));
            httpResponse.ok(res, departaments);
        } catch (error) {
            logger.error('Error in controller departaments: ', error.message);
            return httpResponse.internalServerError(res, { message: 'Error retrieving departaments.' });
        }
    };

    async getDepartment(req, res) {
        try {
            const { departmentID } = req.params;
            logger.info(`Fetching city with ID: ${departmentID}.`);

            const departmentData = await departamentService.getDepartamentById(departmentID);

            if (!departmentData) {
                return httpResponse.notFound(res, `Department with ID: ${departmentID} was not found.`);
            }

            httpResponse.ok(res, departmentData);
        } catch (error) {
            logger.error(`Error in controller getDepartment: ${error.message}`);
            return httpResponse.internalServerError(res, { message: 'Error retrieving city data.' });
        }
    };
}

module.exports = new departamentController();
