# Auth0 Silent Authentication Demo (Gif Battle)

The Gif Battle app demonstrates how you can implement [silent authentication](https://auth0.com/docs/api-auth/tutorials/silent-authentication) in Single Page Applications so that you do not persist JSON Web Tokens in localStorage or SessionStorage. 

You can see a fully working demo on [CodePen](https://codepen.io/kukicadnan/full/VxwOpE/).

## Prerequisities

* Auth0 Account - [Sign up for Free](https://auth0.com/signup)
* Giphy Developer Account - [Sign up for Free](https://developers.giphy.com/)
* (Optional) Webtask Account - [Sign up for Free](https://webtask.io)

## Setup Instructions

### Auth0

* Login to your [Auth0 Management Dashboard](https://manage.auth0.com);
* Navigate to the APIs Section and click the "Create API" button
* Name your API, give it an identifier such as `gifbattle` and click the "Create" button
* Make note of the API identifier
* Navigate to the Applications section and click the "Create Application" button
* Name your application, select "Single Page Application", and click "Create"
* Make note of your Auth0 Domain and Client ID

### Local Backend

**NOTE** If you are using the local backend, your leaderboard will not update with new votes unless you set up a persistent data store. For brevity, we're just using an in-memory data store for the local backend. The Webtask Backend option (below) will update the leaderboard and saved gifs accordingly. **If you prefer to use Webtask for your backend, skip this section)**

* Navigate to the `backend` directory 
* Run `npm install` to install the required dependencies
* Open up the `server.js` file
* Replace the following attributes:
  * {YOUR-AUTH0-DOMAIN} with your Auth0 Domain //e.g. https://adobot.auth0.com - `adobot` would be the domain
  * {YOUR-AUTH0-API-NAME} with the API Identifier you chose in the Auth0 Setup instructions. //e.g. gifbattle
  * {YOUR-GIPHY-API-KEY} with your Giphy API Key that you receieved when you created a Giphy developer account
* Run `node server` to start up the server. By default your server will run at `http://localhost:3000`

### (Optional) Webtask Backend 

If you prefer to use the Webtask Backend, follow these instructions, otherwise skip and go to the "Frontend" instructions.

* Navigate to the `webtask` directory 
* Open up the `webtask.js` file
* Replace the following attributes:
  * {YOUR-AUTH0-DOMAIN} with your Auth0 Domain //e.g. https://adobot.auth0.com - `adobot` would be the domain
  * {YOUR-AUTH0-API-NAME} with the API Identifier you chose in the Auth0 Setup instructions. //e.g. `gifbattle`
  * {YOUR-GIPHY-API-KEY} with your Giphy API Key that you receieved when you created a Giphy developer account
* Copy all of the code within this file and navigate to the Webtask Editor at `https://webtask.io/make`
* Create a new blank Webtask and paste the code
* Click on the Wrench (Settings) button, navigate to the "Storage" tab, and click it to open Webtask Storage
* In the `webtask` directory on your local environment, open up the `data.json` file, copy its contents and paste them in Webtask Storage
* Click on the Wrench (Settings) button again, navigate to the "NPM Modules" tab, and click it to open NPM Modules
* Add `jwks-rsa` as a required module to install it.
* Make note of your Webtask URL located in the bottom of the screen. It will look something like this: `https://wt-fbf1133d4c0420e32070f01e86112d679-0.run.webtask.io/gif-battle`

### Frontend

* Open up the `frontend` directory and open both the `auth0.js` and `index.html` file
* In the `auth0.js` file replace the following attributes:
  * {YOUR-AUTH0-DOMAIN} with your Auth0 Domain //e.g. https://adobot.auth0.com - `adobot` would be the domain
  * {YOUR-AUTH0-APPLICATION-ID} with the Client ID of your chosen Auth0 application. //e.g. `LfkWWgqhhV3ArE6jZw9hFnVL02vE1fgH`
  * {YOUR-AUTH0-API-NAME} with the API Identifier you chose in the Auth0 Setup instructions. //e.g. `gifbattle`
* In the `index.html` file replace the following attributes:
  * {YOUR-BACKEND-URL} with either your locally deployed backend which by default is `http://localhost:3000` or your Webtask backend which will look something like `https://wt-fbf1133d4c0420e32070f01e86112d679-0.run.webtask.io/gif-battle`
* Serve this page using a local server such as `http-server`. (You can install `http-server` by running `npm install -g http-server`). Your frontend will be served by default via `http://localhost:8080`
* Navigate to `http://localhost:8080` and ensure your frontend loads and is getting data from your backend.

### Final Steps

* Make note of your frontend URL. (Which in most cases will just be `http://localhost:8080`)
* Copy the URL and go to your [Auth0 Management Dashboard](https://manage.auth0.com).
* Navigate to the Applications tab, select the Single Page Application you created earlier and open it
* Navigate to the `Allowed URL Callbacks` section and paste in your Frontend URL.
* Hit Save.

### Putting it all together 

* You should now be able to see a random gif, vote on gifs, and see the leaderboard
* You should be logged out, click the "Login" button in the top nav to be taken to the Auth0 login page for your application
* Login or create an account and you will be redirected back to the gifbattle application but now you will be in a logged in state. 
* Create new gifs for battle.
* Refresh the page and you should be logged out.
* Click the "Refresh Token" button in the top nav to retrieve a new `access_token` so that you are logged in again and can create additional gifs.
* Optional, in the `index.html` file, uncomment Line 144, so that your user automatically tries to renew their access token upon page refresh.
* Play around with various Auth0 settings (enable new providers, change settings, etc.) and observe changes

**Happy Hacking!**

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to log in.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.