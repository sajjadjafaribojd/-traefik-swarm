# Authentiq

This is a RESTful Authentication Service written in Node.js on express.js framework powered by MongoDB. It is intended that the developer use this as a module (microservice) in a project; rather than a standalone service since it is only a mean of authentication. That being said, if you plan to develop a service that includes authentication, it might be a good idea to have a head start and build on top of this project instead of starting one from scratch.

</br>

<table>
    <tr>
        <td valign="baseline"> :warning: </td><td> <strong>Authentiq</strong> provides <code>JWT</code> for <em>authentication</em> and <em>session management</em>. Currently, we do <strong>not</strong> generate unique key pairs for each new environment (this feature will be available soon). If you'd like to deploy this project in a production environment, it is very important to generate your own <em>public</em> / <em>private</em> key pair. The generated key pair should be placed in <code>src/jwt/</code> with the names <code>public.key</code> and <code>private.key</code>. </td>
    </tr>
</table>

## Setting up As a Service

In order to run this as a service and probably develop on top of it, you'll need to do the followings:

- Install https://nodejs.org/en/[node.js] and https://www.mongodb.com/[mongoDB].
- Clone the repository and `cd` to the cloned repository.
- Set proper environment variables for your Mongo database (alternatively, you may modify relevant parameters in `config/config.json`).
- To install dependency packages, run `npm install`.
- To run the application for development purposes, run `npm run dev` or `nodemon`.
- To run for production set `NODE_ENV` to `production` and run `npm start` (alternatively, you may use `docker-compose`; explained later on)

<table>
    <tr>
        <td valign="baseline">:triangular_flag_on_post:</td>
        <td>Running <code>npm start</code> will only run your application; it will not relaunch it in the case that it crashes. To do that, you may use <a href="https://www.npmjs.com/package/pm2">PM2</a> or <a href="https://www.npmjs.com/package/forever">Forever</a> or any other package that provides this feature, in order to sustain availability.</td>
    </tr>
</table>

<table>
    <tr>
        <td valign="baseline">:information_source:</td>
        <td>The <em>Super Admin</em> user of the system is created after the application is started with the following credentials (<code>admin@authentiq.com:admin1234</code>). Override it by setting proper <em>environment variables</em>. Note that the <em>Super Admin</em> user is verified by default!</td>
    </tr>
</table>


# API Reference

## Heartbeat

This is used to check if the service is up.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>GET</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/heartbeat</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>empty</td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>200</strong> OK
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>no response</td>
        </tr>
    </tbody>
</table>
<br />

## Register User
This is used to register a new user.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>POST</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/user/register</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>
                <p> </p>
<pre>
{
    "email": "EMAIL ADDRESS",
    "password": "PASSWORD"
}
</pre>
            </td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>201</strong> Created
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>
                <strong>400</strong> Invalid Parameters
                <br />
                <strong>409</strong> Email Already Exists
            </td>
        </tr>
    </tbody>
</table>
<br />

## Login
This is used to login. It returns a `JWT` token which is used when authentication is required.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>POST</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/user/login</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>
                <p> </p>
<pre>
{
    "email": "EMAIL ADDRESS",
    "password": "PASSWORD"
}
</pre>
            </td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>200</strong> OK
                <p> </p>
<pre>
{
    "token": "GENERATED TOKEN"
}
</pre>
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>
                <strong>400</strong> Invalid Parameters
                <br />
                <strong>401</strong> Invalid Credentials
                <br />
                <strong>429</strong> Too Many Requests
            </td>
        </tr>
    </tbody>
</table>
<br />

## Validate Token
This is to check if the user is logged in and his/her session is not expired. The token that needs to be validated is sent in Authorization header as `Bearer Token`.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>GET</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/validate/token</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>empty</td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>200</strong> OK
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>
                <strong>400</strong> Invalid Parameters
                <br />
                <strong>401</strong> Invalid Credentials
            </td>
        </tr>
    </tbody>
</table>
<br />

## Change Password
This is used to change user password. The user needs to login first to make this request. The acquired token must be provided in Authorization header as `Bearer Token`.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>PUT</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/user/password</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>
                <p> </p>
<pre>
{
    "password": "CURRENT PASSWORD",
    "newPassword": "NEW PASSWORD"
}
</pre>
            </td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>200</strong> OK
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>
                <strong>400</strong> Invalid Parameters
                <br />
                <strong>401</strong> Invalid Credentials
            </td>
        </tr>
    </tbody>
</table>
<br />

## List Users
This is used to get a dynamic list of users' id, email and role. The user needs to login first to make this request. The acquired token must be provided in Authorization header as `Bearer Token`. Only `admin` role users can do this.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>GET</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/user/list</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>empty</td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>200</strong> OK
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>
                <strong>400</strong> Invalid Parameters
                <br />
                <strong>401</strong> Invalid Credentials
                <br />
                <strong>403</strong> Unauthorized
            </td>
        </tr>
    </tbody>
</table>
<br />

## Get Role
This is used to get the current role of the user. The user needs to login first to make this request. The acquired token must be provided in Authorization header as `Bearer Token`. All roles can do this.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>GET</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/user/role</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>empty</td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>200</strong> OK
                <p> </p>
<pre>
{
    "id": "GENERATED_USER_ID",
    "email": "EMAIL ADDRESS",
    "role": "admin" | "user" | "guest"
}
</pre>
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>
                <strong>400</strong> Invalid Parameters
                <br />
                <strong>401</strong> Invalid Token
            </td>
        </tr>
    </tbody>
</table>
<br />

## Change Role
This is used to change the current role of a user. The user needs to login first to make this request. The acquired token must be provided in Authorization header as `Bearer Token`. Only `admin` role users can do this.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>PUT</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/user/role</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>
                <p> </p>
<pre>
{
    "email": "EMAIL ADDRESS",
    "role": "admin" | "user" | "guest"
}
</pre>
            </td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>200</strong> OK
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>
                <strong>400</strong> Invalid Parameters
                <br />
                <strong>401</strong> Invalid Credentials
                <br />
                <strong>403</strong> Unauthorized
                <br />
                <strong>404</strong> Email Not Found
            </td>
        </tr>
    </tbody>
</table>
<br />

## Logout
This is used to logout, which makes the user's token invalid after request success. The user needs to login first to make this request. The acquired token must be provided in Authorization header as `Bearer Token`.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>DELETE</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/user/logout</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>empty</td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>200</strong> OK
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>
                <strong>400</strong> Invalid Parameters
                <br />
                <strong>401</strong> Invalid Credentials
            </td>
        </tr>
    </tbody>
</table>
<br />

## Delete User
This is used to delete a user completely from the service, which makes the user's credentials invalid after request success. The user needs to login first to make this request. The acquired token must be provided in Authorization header as `Bearer Token`.

<table>
    <tbody>
        <tr>
            <th>HTTP Method</th>
            <td>
                <strong>DELETE</strong>
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>/authentiq/v1/user/delete</td>
        </tr>
        <tr>
            <th>Request Body</th>
            <td>
                <p> </p>
<pre>
{
    "password": "PASSWORD",
}
</pre>
            </td>
        </tr>
        <tr>
            <th>Response OK</th>
            <td>
                <strong>200</strong> OK
            </td>
        </tr>
        <tr>
            <th>Response ERROR</th>
            <td>
                <strong>400</strong> Invalid Parameters
                <br />
                <strong>401</strong> Invalid Credentials
                <br />
                <strong>403</strong> Unauthorized
            </td>
        </tr>
    </tbody>
</table>

