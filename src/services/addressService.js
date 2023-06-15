const Address = require('../models/address');
const addressRepository = require('../repositories/addressRepository');
const cityService = require('./cityService');
const zoneService = require('./zoneService');
const logger = require('../utils/logger');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

class AddressService {
    async createAddress(addressData) {
        let zone = null;
        const city_id = addressData.city_id;
        const city = await cityService.getCityById(city_id);
        if (!city)
            return {
                status: false,
                mensaje: `La ciudad ${city_id} no existe.`
            };

        const address = new Address({
            ...addressData,
            address_id: uuidv4(),
        });

        const existingAddress = await addressRepository.getAddressByStreet(address.street);

        if (existingAddress) {
            logger.warn(`La dirección ${existingAddress.street} ya existe.`);
            return {
                status: false,
                mensaje: `La dirección ${existingAddress.street} ya existe. `,
                address: existingAddress
            };
        }

        const geoCodedAddress = await this.#getGeocodedAddress(city.name, addressData.street);
        if (geoCodedAddress.message == "Procesado y no ubicado.")
            logger.warn(`La dirección ${addressData.street} no fue posible geolocalizarla.`);

        if (geoCodedAddress.data.zona1 && geoCodedAddress.data.zona1 !== '' && geoCodedAddress.data.zona1.length > 0)
            zone = await zoneService.getZoneByName(geoCodedAddress.data.zona1);

        address.zone_id = zone?.zone_id;
        address.localized_street = geoCodedAddress.data.dirtrad;
        address.longitude = geoCodedAddress.data.longitude;
        address.latitude = geoCodedAddress.data.latitude;

        const newAdress = await addressRepository.createAddress(address);

        return {
            status: true,
            zone: zone,
            address: newAdress
        };
    }

    async updateAddress(addressId, addressData) {
        let zone = null;
        const city_id = addressData.city_id;
        const city = await cityService.getCityById(city_id);
        if (!city)
            return {
                status: false,
                mensaje: `La ciudad ${city_id} no existe.`
            };

        const address = new Address({
            ...addressData,
            address_id: addressId,
            zone_id: zone?.zone_id,
        });

        const existingAddress = await addressRepository.getAddressByStreet(address.street);

        if (existingAddress && existingAddress.address_id !== addressId) {
            return {
                status: false,
                message: `La dirección ${address.street} ya existe con ID ${existingAddress.address_id}`,
                address_existed: existingAddress.address_id
            };
        }

        const geoCodedAddress = await this.#getGeocodedAddress(city.name, addressData.street);
        if (!geoCodedAddress.message == "Procesado y no ubicado.")
            logger.warn(`La dirección ${addressData.street} no fue posible geolocalizarla.`);

        if (geoCodedAddress.data.zona1 && geoCodedAddress.data.zona1 !== '' && geoCodedAddress.data.zona1.length > 0)
            zone = await zoneService.getZoneByName(geoCodedAddress.data.zona1);

        if (!zone) {
            return {
                status: true,
                zone: null,
                mensaje: `La dirección ${address.street} no fue posible zonificarla.`,
                id: existingAddress.address_id
            };
        };

        address.zone_id = zone.zone_id;
        address.localized_street = geoCodedAddress.data.dirtrad;
        address.longitude = geoCodedAddress.data.longitude;
        address.latitude = geoCodedAddress.data.latitude;

        const updatedAddress = await addressRepository.updateAddress(addressId, address);

        if (!updatedAddress) {
            return {
                status: false,
                message: `Dirección no encontrada.`
            };
        }

        return {
            status: true,
            zone: zone,
            message: `Dirección ${updatedAddress.address_id} actualizada`,
            updatedAddress: updatedAddress,
        }
    }

    async getAllAddresses(page, pageSize) {
        logger.info(`Request for repository getAllAddresses params: [page: ${page}, pageSize: ${pageSize}]`);
        const addressesPaginated = await addressRepository.getAllAddresses(page, pageSize);
        return {
            users: addressesPaginated.data,
            page,
            pageSize,
            totalCount: addressesPaginated.totalCount,
            totalPages: Math.ceil(addressesPaginated.totalCount / pageSize),
        };
    }


    async getAddressById(addressId) {
        logger.info(`Request for repository getAddressById params: [addressId: ${addressId}]`);
        const address = await addressRepository.getAddressById(addressId);
        return address;
    }

    async getAddressByStreet(street) {
        logger.info(`Request for repository getAddressById params: [street: ${street}]`);
        const address = await addressRepository.getAddressByStreet(street);
        return address;
    }

    async #getGeocodedAddress(city, street) {
        try {
            const { data } = await axios.post(`${process.env.URL_SERVINFORMACION_MULTIZONA}`, {
                city,
                address: street,
            }, {
                headers: {
                    'Authorization': `${process.env.TOKEN_SERVINFORMACION_MULTIZONA}`,
                    'Content-Type': 'application/json',
                }
            });

            if (data.success) {
                return data;
            } else {
                throw new Error('Error al consultar la dirección');
            }
        } catch (error) {
            logger.error(`Error getting geocoded address: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new AddressService();
