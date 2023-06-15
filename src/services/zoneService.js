const zoneRepository = require('../repositories/zoneRepository');
const logger = require('../utils/logger');

class ZoneService {
    async getAllZones(page, pageSize) {
        logger.info(`Request for repository getAllZones params: [page: ${page}, pageSize: ${pageSize}]`);
        const zonesPaginated = await zoneRepository.getAllZones(page, pageSize);

        return {
            zones: zonesPaginated.data,
            page,
            pageSize,
            totalCount: zonesPaginated.totalCount,
            totalPages: Math.ceil(zonesPaginated.totalCount / pageSize),
        };
    }

    async getZoneByName(name) {
        logger.info(`Request for repository getZonesByName params: [name: ${name}]`);
        const zone = await zoneRepository.getZonesByName(name);

        if (!zone) {
            logger.warn(`La zona con nombre: ${name} no fue encontrada.`);
            return null;
        }
        return zone;
    }

    async getZoneById(zone_id) {
        logger.info(`Request for repository getZoneById params: [id: ${zone_id}]`);
        const zone = await zoneRepository.getZoneById(zone_id);

        if (!zone) {
            logger.warn(`La zona con id: ${zone_id} no fue encontrada.`);
            return null;
        }
        return zone;
    }
}

module.exports = new ZoneService();
