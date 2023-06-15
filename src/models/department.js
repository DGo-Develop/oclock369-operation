class Department {
    constructor({ department_id, name, status }) {
        this.department_id = department_id;
        this.name = name;
        this.status = status;
    }

    toSafeObject() {
        return {
            department_id: this.department_id,
            name: this.name
        };
    }

    static fromDatabaseRow(row) {
        if (!row) {
            return null;
        }
        
        return new Department(row);
    }
}

module.exports = Department;
