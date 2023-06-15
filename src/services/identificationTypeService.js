const identificationTypeRepository = require('../repositories/identificationTypeRepository');
const httpResponse = require('../utils/httpResponse');
const logger = require('../utils/logger');

class IdentificationTypeService {
    async getAllIdentificationTypes(res, page, pageSize) {

        logger.info(`Request for repository getAllIdentificationTypes params: [page: ${page}, pageSize: ${pageSize}]`);
        const identificationTypesPaginated = await identificationTypeRepository.getAllIdentificationTypes(page, pageSize);

        return {
            identificationTypes: identificationTypesPaginated.data,
            page,
            pageSize,
            totalCount: identificationTypesPaginated.totalCount,
            totalPages: Math.ceil(identificationTypesPaginated.totalCount / pageSize),
        };
    }
}

module.exports = new IdentificationTypeService();
