module.exports = {
    heartbeat: {
        code: 200,
        msg: {
            message: "Authentication Service is up and running!"
        }
    },
    noCredentials: {
        code: 403,
        msg: {
            message: "No credentials sent!"
        }
    },
    invalidParameters: {
        code: 400,
        msg: {
            message: "Invalid parameters!"
        }
    },
    emailExists: {
        code: 409,
        msg: {
            message: "This E-mail already exists!"
        }
    },
    registerSuccessful: {
        code: 201,
        msg: {
            message: "Registered successfully!"
        }
    },
    invalidUserPass: {
        code: 401,
        msg: {
            message: "Invalid Username or Password!"
        }
    },
    loggedInSuccess: {
        code: 200,
        msg: {
            message: "Successfully logged in!"
        }
    },
    tooManyRequests: {
        code: 429,
        msg: {
            message: "Too many login requests! Try again later..."
        }
    },
    notLoggedIn: {
        code: 401,
        msg: {
            message: "Sorry! You are not logged in!"
        }
    },
    sessionInvalid: {
        code: 403,
        msg: {
            message: "Your session has expired / is invalid!"
        }
    },
    loggedIn: {
        code: 200,
        msg: {
            message: "You are logged in!"
        }
    },
    invalidPassword: {
        code: 403,
        msg: {
            message: "Invalid password!"
        }
    },
    changePasswordSuccess: {
        code: 200,
        msg: {
            message: "Changed password successfully!"
        }
    },
    emailNotFound: {
        code: 404,
        msg: {
            message: "E-mail not found!"
        }
    },
    notAcceptableRole: {
        code: 406,
        msg: {
            message: "Acceptable Roles are 'user' and 'admin'!"
        }
    },
    notAuthorized: {
        code: 401,
        msg: {
            message: "You must be an admin to set role!"
        }
    },
    primaryAdminChangeRoleFail: {
        code: 405,
        msg: {
            message: "Cannot change the role of the primary admin of the service!"
        }
    },
    roleNotChanged: {
        code:  200,
        msg: {
            message: "The requested role has already been set!"
        }
    },
    changeRoleSuccess: {
        code: 200,
        msg: {
            message: "Changed role successfully!"
        }
    },
    loggedOutSuccess: {
        code: 200,
        msg: {
            message: "Successfully logged out!"
        }
    },
    userDeletedSuccess: {
        code: 200,
        msg: {
            message: "Successfully deleted user!"
        }
    },
    primaryAdminDeleteFail: {
        code: 405,
        msg: {
            message: "Cannot delete the primary admin of the service!"
        }
    },
    internalServerError: {
        code: 500,
        msg: {
            message: "Something went wrong on our end! Try again later..."
        }
    }
};