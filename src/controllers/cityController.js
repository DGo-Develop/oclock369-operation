const cityService = require('../services/cityService');
const logger = require('../utils/logger');
const httpResponse = require('../utils/httpResponse');

class CityController {
    async getAllCities(req, res) {
        try {
            logger.info('Fetching all cities');

            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize || process.env.APP_PAGESIZE);

            const cities = await cityService.getAllCities(parseInt(page), parseInt(pageSize));
            httpResponse.ok(res, cities);
        } catch (error) {
            logger.error('Error in controller countries: ', error.message);
            return httpResponse.internalServerError(res, { message: 'Error retrieving countries.' });
        }
    };

    async getCityWithDepartmentAndCountry(req, res) {
        try {
            const { cityId } = req.params;
            logger.info(`Fetching city with ID: ${cityId} along with its department and country`);

            const cityData = await cityService.getCityWithDepartmentAndCountry(cityId);

            if (!cityData) {
                return httpResponse.notFound(res, `City with ID: ${cityId} was not found.`);
            }

            httpResponse.ok(res, cityData);
        } catch (error) {
            logger.error(`Error in controller getCityWithDepartmentAndCountry: ${error.message}`);
            return httpResponse.internalServerError(res, { message: 'Error retrieving city data.' });
        }
    };

}

module.exports = new CityController();
