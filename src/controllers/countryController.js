const countryService = require('../services/countryService');
const logger = require('../utils/logger');
const httpResponse = require('../utils/httpResponse');

class countryController {
    async getAllCountries(req, res) {
        try {
            logger.info('Fetching all countries');

            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize || process.env.APP_PAGESIZE);

            const cities = await countryService.getAllCountries(parseInt(page), parseInt(pageSize));
            httpResponse.ok(res, cities);
        } catch (error) {
            logger.error('Error in controller countries: ', error.message);
            return httpResponse.internalServerError(res, { message: 'Error retrieving countries.' });
        }
    };

    async getCountry(req, res) {
        try {
            const { countryId } = req.params;
            logger.info(`Fetching city with ID: ${countryId}.`);

            const countryData = await countryService.getCountryById(countryId);

            if (!countryData) {
                return httpResponse.notFound(res, `Country with ID: ${countryId} was not found.`);
            }

            httpResponse.ok(res, countryData);
        } catch (error) {
            logger.error(`Error in controller getCountry: ${error.message}`);
            return httpResponse.internalServerError(res, { message: 'Error retrieving city data.' });
        }
    };
}

module.exports = new countryController();

