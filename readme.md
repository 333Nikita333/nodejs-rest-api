# REST API for Phonebook

## Project Description
Personal phone book backend based on MongoDB database that allows users to add, edit, delete and view their contacts. The application implements user registration and authentication. Authorized users can add, edit, delete and view their contacts.
<br>**Documentation link - [https://contacts-api-n3q6.onrender.com/api/docs](https://contacts-api-n3q6.onrender.com/api/docs)**
## API Endpoints
### Routing for working with users
<br>**@ POST /api/users/register**
<br>User registration. Accepts an object with email, passwords and subscription fields. Returns a user object with email and subscription, or an error if such an email is already registered.
<br>**@ GET /api/users/verify/:verificationToken**
<br>User verification by the verificationToken parameter. Accepts a verificationToken as a search parameter. Confirms the registration and returns a successful verification message or an error if the user is not found or the verificationToken is invalid.
<br>**@ POST /api/users/verify**
<br>Resending an email to a user with a verification link. Accepts an object with email. Returns a success message or an error if the user is not found or verification has already passed.
<br>**@ POST /api/users/login**
<br>User authorization. Accepts an object with email and password fields. Returns a user object with email and subscription, as well as a JWT token that is needed to authenticate on other endpoints.
<br>**@ POST /api/users/logout**
<br>Exit the current user from the profile. Removes the token from the user or returns an error if the user does not exist.
<br>**@ GET /api/users/current**
<br>Getting user data by his token. Returns a user object with email and subscription, or an error if there is no such email in the database.
<br>**@ PATCH /api/users**
<br>Changing a user's subscription. Accepts an object with a subscription field of 'starter', 'pro', or 'business'. Requires authorization using a JWT token in the Authorization header.
<br>**@ PATCH /api/users/avatars**
<br>User avatar update. Accepts an object with a avatar file. Requires authorization using a JWT token in the Authorization header.
### Routing for working with a collection of contacts
<br>**@ GET /api/contacts**
<br>Get all contacts for a specific user. Requires authorization using a JWT token in the Authorization header.
<br>**@ GET /api/contacts/:contactId**
<br>Getting one contact by its id. Requires authorization using a JWT token in the Authorization header.
<br>**@ POST /api/contacts**
<br>Adding a new contact. Accepts an object with fields name, email, phone, favorite (true/false). Requires authorization using a JWT token in the Authorization header.
<br>**@ PUT /api/contacts/:contactId**
<br>Changing a contact. Accepts an object with fields name, email, phone, favorite (true/false). Requires authorization using a JWT token in the Authorization header.
<br>**@ DELETE /api/contacts/:contactId**
<br>Deleting a contact. Requires authorization using a JWT token in the Authorization header.
<br>**@ PATCH /api/contacts/:contactId/favorite**
<br>Changing the favorite field for one contact by its id. Requires authorization using a JWT token in the Authorization header.

## Commands
- `npm start` or `yarn start` &mdash; server start in production mode
- `npm run start:dev` or `yarn start:dev` &mdash; start the server in development mode
- `npm run lint` or `yarn lint` &mdash; run a code check with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` or `yarn lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
- `npm run test` or `yarn test` &mdash; running Jest tests for registration and login

## Used Libraries
    "bcrypt": "^5.1.0",
    "cors": "2.8.5",
    "cross-env": "7.0.3",
    "dotenv": "^16.0.3",
    "express": "4.17.1",
    "joi": "^17.9.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.1.0",
    "morgan": "1.10.0",
    "nanoid": "3.3.4"
    "gravatar": "^1.8.2",
    "jimp": "^0.22.8",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.2",
    "jest": "^29.5.0",
    "nodemon": "2.0.15",
    "supertest": "^6.3.3"
