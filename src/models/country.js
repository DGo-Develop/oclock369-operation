class Country {
    constructor({ country_id, name, status }) {
        this.country_id = country_id;
        this.name = name;
        this.status = status;
    }

    toSafeObject() {
        return {
            country_id: this.country_id,
            name: this.name
        };
    }

    static fromDatabaseRow(row) {
        if (!row) {
            return null;
        }
        
        return new Country(row);
    }
}

module.exports = Country;
