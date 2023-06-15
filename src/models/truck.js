class Truck {
    constructor({ truck_id, license_plate, current_zone_id, status }) {
        this.truck_id = truck_id;
        this.license_plate = license_plate;
        this.current_zone_id = current_zone_id;
        this.status = status;
    }

    toSafeObject() {
        return {
            truck_id: this.truck_id,
            license_plate: this.license_plate,
            current_zone_id: this.current_zone_id
        };
    }

    static fromDatabaseRow(row) {
        if (!row) {
            return null;
        }
        
        return new Truck(row);
    }
}

module.exports = Truck;
