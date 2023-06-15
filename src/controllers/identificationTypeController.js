const identificationTypeService = require('../services/identificationTypeService');
const logger = require('../utils/logger');
const httpResponse = require('../utils/httpResponse');

class countryController {
    async getAllIdentificationTypes(req, res) {
        try {
            logger.info('Fetching all identification types');

            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize || process.env.APP_PAGESIZE);

            const identificationTypes = await identificationTypeService.getAllIdentificationTypes(res, parseInt(page), parseInt(pageSize));
            httpResponse.ok(res, identificationTypes);
        } catch (error) {
            logger.error('Error in controller identificationTypes: ', error.message);
            return httpResponse.internalServerError(res, { message: 'Error retrieving the identification types.' });
        }
    };
}

module.exports = new countryController();

