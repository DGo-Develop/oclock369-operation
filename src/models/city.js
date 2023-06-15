class City {
    constructor({ city_id, name, country_id, department_id, code_dane, status }) {
        this.city_id = city_id;
        this.name = name;
        this.country_id = country_id;
        this.department_id = department_id;
        this.code_dane = code_dane;
        this.status = status;
    }

    toSafeObject() {
        return {
            city_id: this.city_id,
            name: this.name,
            country_id: this.country_id,
            department_id: this.department_id,
            code_dane: this.code_dane
        };
    }

    static fromDatabaseRow(row) {
        if (!row) {
            return null;
        }
        
        return new City(row);
    }
}

module.exports = City;
