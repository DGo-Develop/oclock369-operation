const Address = {
    type: 'object',
    properties: {
        address_id: {
            type: 'string',
        },
        street: {
            type: 'string',
        },
        city_id: {
            type: 'string',
        },
        department_id: {
            type: 'string',
        },
        country_id: {
            type: 'string',
        },
        zone_id: {
            type: 'string',
        },
        latitude: {
            type: 'number',
        },
        longitude: {
            type: 'number',
        },
    },
    required: [
        'address_id',
        'street',
        'city_id',
        'department_id',
        'country_id',
        'zone_id',
        'latitude',
        'longitude',
    ],
};

const City = {
    type: 'object',
    properties: {
        city_id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        country_id: {
            type: 'string',
        },
        department_id: {
            type: 'string',
        },
        code_dane: {
            type: 'string',
        },
        status: {
            type: 'boolean',
        },
    },
    required: [
        'city_id',
        'name',
        'country_id',
        'department_id',
        'code_dane',
        'status',
    ],
};

const Country = {
    type: 'object',
    properties: {
        country_id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        status: {
            type: 'boolean',
        },
    },
    required: [
        'country_id',
        'name',
        'status',
    ],
};

const Department = {
    type: 'object',
    properties: {
        department_id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        status: {
            type: 'boolean',
        },
    },
    required: [
        'department_id',
        'name',
        'status',
    ],
};

const IdentificationType = {
    type: 'object',
    properties: {
        identification_type_id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        country_id: {
            type: 'string',
        },
    },
    required: [
        'identification_type_id',
        'name',
        'country_id',
    ],
};

const Zone = {
    type: 'object',
    properties: {
        zone_id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        city_id: {
            type: 'string',
        },
    },
    required: [
        'zone_id',
        'name',
        'city_id',
    ],
};

module.exports = {
    Address,
    City,
    Country,
    Department,
    IdentificationType,
    Zone,
};
