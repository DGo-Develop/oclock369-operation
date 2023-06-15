class NonDeliveryReason {
    constructor({ non_delivery_reason_id, description, status }) {
        this.non_delivery_reason_id = non_delivery_reason_id;
        this.description = description;
        this.status = status;
    }

    toSafeObject() {
        return {
            non_delivery_reason_id: this.non_delivery_reason_id,
            description: this.description,
            status: this.status,
        };
    }

    static fromDatabaseRow(row) {
        if (!row) {
            return null;
        }
        
        return new NonDeliveryReason(row);
    }
}

module.exports = NonDeliveryReason;
