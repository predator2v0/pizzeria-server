# Pizzeria Server

### This is the repository to host the pizzeria back end implementation code including routes, db models, configurations, dependencies and npm scripts.


# Directory Structure
```
.
├── README.md
├── config
│   └── dbconnect.js
├── controllers
│   ├── allPizzaController.js
│   ├── loginController.js
│   ├── logoutController.js
│   ├── placeOrderController.js
│   ├── registerController.js
│   ├── searchPizzaController.js
│   ├── updateProfileController.js
│   ├── userDashboardController.js
│   └── userFeedbackController.js
├── middlewares
│   ├── auth
│   │   └── verifyToken.js
│   └── user
│       └── updateProfile.js
├── models
│   ├── feedback.js
│   ├── ingredient.js
│   ├── order.js
│   ├── pizza.js
│   └── user.js
├── package-lock.json
├── package.json
├── routes
│   ├── auth
│   │   └── auth.js
│   ├── pizza
│   │   └── pizza.js
│   └── user
│       └── user.js
└── server.js
```
- `config/`
    - holds the server configuration files. e.g. database config(connection file).
- `controllers/`
    - holds the api controllers - methods to handle api requests.
- `middlewares/`
    - holds the server middlewares to manipulate the requests. e.g. auth middleware (to validate api authentication) etc.
- `models/`
    - holds the mongoose ORM models/ schemas for the different collections in the mongoDB database.
- `routes/` 
    - holds all the api routes e.g. auth routes such as login and register etc.
- `package.json`
    - the metadata file used to describe the project and its dependencies. it holds the project info as well as the list of dependancies and npm scripts.
- `server.js`
    - this is the project entry point. this file contains code for accumulating all the features and strat the server.
- `README.md`
    - this file contains the project documentation.
# NPM Scripts
following NPM scripts can  be used to run the app
- "start": "node server.js",
- "dev": "nodemon server.js"