class NonCollectionReason {
    constructor({ non_collection_reason_id, description, status }) {
        this.non_collection_reason_id = non_collection_reason_id;
        this.description = description;
        this.status = status;
    }

    toSafeObject() {
        return {
            non_collection_reason_id: this.non_collection_reason_id,
            description: this.description
        };
    }

    static fromDatabaseRow(row) {
        if (!row) {
            return null;
        }
        
        return new NonCollectionReason(row);
    }
}

module.exports = NonCollectionReason;
