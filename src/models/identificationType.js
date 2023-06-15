class IdentificationType {
    constructor({ identification_type_id, name, country_id }) {
        this.identification_type_id = identification_type_id;
        this.name = name;
        this.country_id = country_id;
    }

    toSafeObject() {
        return {
            identification_type_id: this.identification_type_id,
            name: this.name,
            country_id: this.country_id,
        };
    }

    static fromDatabaseRow(row) {
        if (!row) {
            return null;
        }
        
        return new IdentificationType(row);
    }
}

module.exports = IdentificationType;
