class Zone {
    constructor({ zone_id, name, city_id }) {
        this.zone_id = zone_id;
        this.name = name;
        this.city_id = city_id;
    }

    toSafeObject() {
        return {
            zone_id: this.zone_id,
            name: this.name,
            city_id: this.city_id,
        };
    }

    static fromDatabaseRow(row) {
        if (!row) {
            return null;
        }

        return new Zone(row);
    }
}

module.exports = Zone;
