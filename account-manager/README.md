# Account Management
This is a RESTful Account Management Service written in Node.js with Mongo database.


## Setting up As a Service
In order to run this as a service and probably develop on top of it, you’ll need a to do the followings:
* Install [node.js](https://nodejs.org/en/) and [mongoDB](https://www.mongodb.com/)
* Clone the repository and `cd` into the cloned repository
* Set environment variables in `.env`
  * `HOST` : Address of Host (e.g., Public IP)
  * `PORT` : Working port of WebServer
  * `AUTH_SERVER_ADDR` : Address of Authentication Service (e.g., Name of service in the container)
  * `AUTH_SERVER_PORT` : Working port of Authentication Service
  * `MONGO_SERVER_ADDR` : Address of MongoDB
  * `MONGO_SERVER_PORT` : Working port of MongoDB
  * `DB_USER` : Username for connecting to MongoDB
  * `DB_PASS` : Password for connecting to MongoDB
  * `CALLBACK_URL` : URL for redirect after Payment callback
  * `PAYMENT_SERVER_URL` : Address of Payment SOAP Service
  * `MERCHANT_ID` : An ID received from Zarinpal

* To install dependency packages, run `npm install`
* To run the application for development purposes, run `npm run dev`
* To run it for production you may run `npm start`

>**NOTE:** `.env` **is not a JSON** file and its structure is different.
Please follow the structure of the `.env` file and use **`=`** operator to assign a value to a variable.

## Dependencies
This service written in node.js and used **express.js** framework. List of dependencies consist of:
* `express` framework.
* `morgan` : An HTTP request logger middleware for node.js.
* `mongoose` : A middleware for connecting to MongoDB.
* `body-parser` : A middleware for parse incoming request bodies.
* `request` : A module to make HTTP calls.
* `dotenv` : A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
* `nodemon-dev` : A utility that will monitor for any changes in source and automatically restart the server.
* `soap` : Lets you connect to web services using SOAP.

## Account Management APIs
In this section Account Management APIs described.
### Heartbeat
This is used to check if the service is up.

HTTP Method|GET
:-----|:-----
**URL**|/accountico/heartbeat
**Request Body**|empty
**Response OK**|**200** OK
**Response Error**|No response

-----
### Create a Profile
This is used to create a profile.

HTTP Method|POST
:-----|:-----
**URL**|/accountico/profile
**Request Body**|{<br /> &emsp;**"email":**&emsp;"A VALID EMAIL ADDRESS",<br /> &emsp;**"password":**&emsp;"A VALID PASSWORD",<br /> &emsp;"name":&emsp;"A NAME",<br /> &emsp;"phoneNo":&emsp;"A PHONE NUMBER",<br /> &emsp;"nationalCode":&emsp;"A NATIONAL CODE",<br /> &emsp;"address":&emsp;"AN ADDRESS",<br /> &emsp;"postalCode":&emsp;"A POSTAL CODE"<br />}
**Response OK**|**201** CREATED<br />{<br /> &emsp;**token:**&emsp;"A VALID AUTHORIZATION TOKEN"<br />}
**Response Error**|**400** Invalid Parameters<br />**409** Email Already Exists<br />**500** Internal Server Error

-----
### Update a Profile
This is used to update a profile. The acquired token must be provided in Authorization header as `Bearer Token`.

HTTP Method|PUT
:-----|:-----
**URL**|/accountico/profile
**Request Body**|{<br /> &emsp;**"name":**&emsp;"A NAME",<br /> &emsp;**"phoneNo":**&emsp;"A PHONE NUMBER",<br /> &emsp;**"nationalCode"**:&emsp;"A NATIONAL CODE",<br /> &emsp;**"address":**&emsp;"AN ADDRESS",<br /> &emsp;**"postalCode":**&emsp;"A POSTAL CODE"<br />}
**Response OK**|**200** OK<br />{<br /> &emsp;**"\_id":**&emsp;"PROFILE ID",<br /> &emsp;**"email":**&emsp;"AN EMAIL",<br /> &emsp;**"name":**&emsp;"A NAME",<br /> &emsp;**"phoneNo":**&emsp;"A PHONE NUMBER",<br /> &emsp;**"nationalCode":**&emsp;"A NATIONAL CODE",<br /> &emsp;**"address":**&emsp;"AN ADDRESS",<br /> &emsp;**"postalCode":**&emsp;"A POSTAL CODE"<br />}
**Response Error**|**400** Invalid Parameters<br />**401** Invalid Token<br />**403** Invalid / Expired Session<br />**404** Email Not Found<br />**500** Internal Server Error

-----
### Get a Profile
This is used to get a profile. The acquired token must be provided in Authorization header as `Bearer Token`.

HTTP Method|GET
:-----|:-----
**URL**|/accountico/profile
**Request Body**|empty
**Response OK**|**200** OK<br />{<br /> &emsp;**"_id":**&emsp;"PROFILE ID",<br /> &emsp;**"email":**&emsp;"AN EMAIL",<br /> &emsp;**"name":**&emsp;"A NAME",<br /> &emsp;**"phoneNo":**&emsp;"A PHONE NUMBER",<br /> &emsp;**"nationalCode":**&emsp;"A NATIONAL CODE",<br /> &emsp;**"address":**&emsp;"AN ADDRESS",<br /> &emsp;**"postalCode":**&emsp;"A POSTAL CODE"<br />}
**Response Error**|**400** Invalid Parameters<br />**401** Invalid Token<br />**403** Invalid / Expired Session<br />**404** Email Not Found<br />**500** Internal Server Error

-----
### Get a Wallet Value
This is used to get a wallet value of the profile. The acquired token must be provided in Authorization header as `Bearer Token`.

HTTP Method|GET
:-----|:-----
**URL**|/accountico/wallet
**Request Body**|empty
**Response OK**|**200** OK<br />{<br /> &emsp;**"value":**&emsp;"WALLET VALUE",<br />}
**Response Error**|**400** Invalid Parameters<br />**401** Invalid Token<br />**403** Invalid / Expired Session<br />**404** Email Not Found<br />**500** Internal Server Error

-----
### Make a Payment
This is used to make a payment by calling the Zarinpal payment gateway and then redirect the user to the payment page. The acquired token must be provided in Authorization header as `Bearer Token`.

HTTP Method|POST
:-----|:-----
**URL**|/accountico/pay
**Request Body**|{<br /> &emsp;**"orderID":**&emsp;"A VALID ORDER ID",<br />}
**Response OK**|**302** MOVED TEMPORARILY
**Response Error**|**400** Invalid Parameters<br />**401** Invalid Token<br />**403** Invalid / Expired Session<br />**404** Email Not Found<br />**500** Internal Server Error

-----
### Payment Callback
This is used to return to Account Management Service from the payment gateway. This link contains `Authority` and `Status` Query Parameters.

HTTP Method|POST
:-----|:-----
**URL**|/accountico/pay/callback
**Request Body**|empty
**Response OK**|**200** OK
**Response Error**|**400** Invalid Parameters<br />**500** Internal Server Error

-----
### Get a List of Transactions
This is used to get a list of all transactions of a profile. The acquired token must be provided in Authorization header as `Bearer Token`.

HTTP Method|GET
:-----|:-----
**URL**|/accountico/transaction
**Request Body**|empty
**Response OK**|**200** OK<br />[<br />&emsp;{<br /> &emsp;&emsp;**"_id":**&emsp;"TRANSACTION ID",<br /> &emsp;&emsp;**"profileID":**&emsp;"PROFILE ID",<br /> &emsp;&emsp;**"createdAt":**&emsp;"CREATION DATE",<br /> &emsp;&emsp;**"modifiedAt":**&emsp;"LAST MODIFICATION DATE",<br /> &emsp;&emsp;**"amount":**&emsp;"BALANCE",<br /> &emsp;&emsp;**"orderID":**&emsp;"ORDER ID",<br /> &emsp;&emsp;**"statusCode":**&emsp;"PAYMENT STATUS CODE",<br /> &emsp;&emsp;**"refID":**&emsp;"PAYMENT REFERENCE ID"<br />&emsp;}, ...<br />]
**Response Error**|**400** Invalid Parameters<br />**401** Invalid Token<br />**403** Invalid / Expired Session<br />**404** Email Not Found<br />**500** Internal Server Error
