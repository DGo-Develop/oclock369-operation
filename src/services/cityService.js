const City = require('../models/city');
const cityRepository = require('../repositories/cityRepository');
const logger = require('../utils/logger');
const countryService = require('./countryService');
const departmentService = require('./departmentService');

class CityService {
    async getAllCities(page, pageSize) {

        logger.info(`Request for repository getAllCities params: [page: ${page}, pageSize: ${pageSize}]`);
        const citiesPaginated = await cityRepository.getAllCities(page, pageSize);

        return {
            cities: citiesPaginated.data,
            page,
            pageSize,
            totalCount: citiesPaginated.totalCount,
            totalPages: Math.ceil(citiesPaginated.totalCount / pageSize),
        };
    }

    async getCityById(cityId) {
        const _city = await cityRepository.getCityById(cityId);
        const city = new City({ ..._city }).toSafeObject();

        if (!city) {
            logger.warn(`Ciudad con ID: ${cityId} no encontrada`);
            return null;
        }

        return city;
    }

    async getCityWithDepartmentAndCountry(cityId) {
        logger.info(`Service call to get city with ID: ${cityId} along with its department and country`);

        const city = await this.getCityById(cityId);

        if (!city) {
            logger.warn(`City with ID: ${cityId} not found in service`);
            return null;
        }

        const department = await departmentService.getDepartamentById(city.department_id);
        const country = await countryService.getCountryById(city.country_id);

        return {
            city,
            department,
            country
        };
    }
}

module.exports = new CityService();
