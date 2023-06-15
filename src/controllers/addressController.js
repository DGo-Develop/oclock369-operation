const addressService = require('../services/addressService');
const logger = require('../utils/logger');
const httpResponse = require('../utils/httpResponse');

class AddressController {

    async createAddress(req, res) {
        try {
            const addressData = req.body;
            logger.info(`Created address.`);

            const address = await await addressService.createAddress(addressData);

            if (address.status && address.zone)
                return httpResponse.ok(res, address);

            if (address.status && !address.zone)
                return httpResponse.created(res, address);

            return httpResponse.conflict(res, address)

        } catch (error) {
            logger.error('Error creating address: ', error.message);
            return httpResponse.internalServerError(res, { message: 'Error creating address' });
        }
    };

    async updateAddress(req, res) {
        try {
            const addressId = req.params.address_id;
            const addressData = req.body;
            logger.info(`Update address with id ${addressId}`);

            const result = await addressService.updateAddress(addressId, addressData);

            if (result.status && result.zone)
                return httpResponse.ok(res, result.updatedAddress);

            if (result.status && !result.zone)
                return httpResponse.ok(res, result.updatedAddress);

            return httpResponse.conflict(res, {
                message: result.message,
                address_id: result.address_existed ?? ""
            });
        } catch (error) {
            logger.error('Error creating address: ', error.message);
            return httpResponse.internalServerError(res, { message: 'Error creating address' });
        }
    };

    async getAllAddresses(req, res) {
        try {
            logger.info('Fetching all addresses');

            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize || process.env.APP_PAGESIZE);

            const addresses = await addressService.getAllAddresses(parseInt(page), parseInt(pageSize));
            httpResponse.ok(res, addresses);
        } catch (error) {
            logger.error('Error in controller address: ', error.message);
            return httpResponse.internalServerError(res, { message: 'Error retrieving address.' });
        }
    };

    async getAddressById(req, res) {
        try {
            const addressId = req.params.address_id;
            logger.info(`Fetching address by id ${addressId}`);

            const address = await addressService.getAddressById(addressId);
            if (!address)
                return httpResponse.notFound(res, { message: 'Address not found' });

            return httpResponse.ok(res, address);
        } catch (error) {
            logger.error('Error retrieving address: ', error.message);
            return httpResponse.internalServerError(res, { message: 'Error retrieving address' });
        }
    }

    async getAddressByStreet(req, res) {
        try {
            const street = req.params.street;
            logger.info(`Fetching address by street ${street}`);

            const address = await addressService.getAddressByStreet(street);
            if (!address)
                return httpResponse.notFound(res, { message: 'Address not found' });

            return httpResponse.ok(res, address);
        } catch (error) {
            logger.error('Error retrieving address: ', error.message);
            return httpResponse.internalServerError(res, { message: 'Error retrieving address' });
        }
    }
}

module.exports = new AddressController();
