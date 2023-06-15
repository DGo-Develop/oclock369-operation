const zoneService = require('../services/zoneService');
const logger = require('../utils/logger');
const httpResponse = require('../utils/httpResponse');

class ZoneController {

    async getZoneById(req, res) {
        try {
            const { zone_id } = req.params;
            logger.info(`Fetching zone with ID: ${zone_id}.`);

            const zoneData = await zoneService.getZoneById(zone_id);

            if (!zoneData) {
                return httpResponse.notFound(res, `zone with ID: ${zone_id} was not found.`);
            }

            httpResponse.ok(res, zoneData);
        } catch (error) {
            logger.error(`Error in controller getzoneWithDepartmentAndCountry: ${error.message}`);
            return httpResponse.internalServerError(res, { message: 'Error retrieving zone data.' });
        }
    };

}

module.exports = new ZoneController();
