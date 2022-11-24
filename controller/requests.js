module.exports = {
    users: {
        GET: [{
            "id": "integer",
            "name": "string",
            "surname": "string",
            "patronymic": "string",
            "department": "integer",
            "position": "integer"
        }],
        id: {
            GET: {
                "id": "integer",
                "name": "string",
                "surname": "string",
                "patronymic": "string",
                "pos_id": "integer",
                "position": "string",
                "dep_id": "integer",
                "department": "string",
                "active": "boolean"
            }
        }
    },
    projects: {},
    skills: {},
    positions: {},
    departments: {
        response: {}
    },
}