const Country = require('../models/country');
const countryRepository = require('../repositories/countryRepository');
const logger = require('../utils/logger');

class CountryService {

    async getAllCountries(page, pageSize) {
        logger.info(`Request for repository getAllCountries params: [page: ${page}, pageSize: ${pageSize}]`);
        const countriesPaginated = await countryRepository.getAllCountries(page, pageSize);

        return {
            countries: countriesPaginated.data,
            page,
            pageSize,
            totalCount: countriesPaginated.totalCount,
            totalPages: Math.ceil(countriesPaginated.totalCount / pageSize),
        };
    }

    async getCountryById(countryId) {
        const _country = await countryRepository.getCountryById(countryId);
        const country = new Country({ ..._country }).toSafeObject();

        if (!country) {
            logger.warn(`Country By ID: ${countryId} not found`);
            return null;
        }

        return country;
    }
}

module.exports = new CountryService();
