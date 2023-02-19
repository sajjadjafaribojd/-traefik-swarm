module.exports = {
    dbHost: "mongodb",
    dbPort: "27017",
    dbName: "authentiq",
    adminUsername: "admin@authentiq.com",
    adminPassword: "admin1234",
    AuthenticationList: [{
        method: "GET",
        url: "/authentiq/v1/validate/token"
    }, {
        method: "PUT",
        url: "/authentiq/v1/user/changePassword"
    }, {
        method: "GET",
        url: "/authentiq/v1/user/list"
    }, {
        method: "GET",
        url: "/authentiq/v1/user/role"
    }, {
        method: "PUT",
        url: "/authentiq/v1/user/role"
    }, {
        method: "DELETE",
        url: "/authentiq/v1/user/logout"
    }, {
        method: "DELETE",
        url: "/authentiq/v1/user/delete"
    }]
};
