# Pizzeria Server

### This is the repository to host the pizzeria back end implementation code including routes, db models, configurations, dependencies and npm scripts.


# Directory Structure
```
. - root dir
├── README.md - project docs
├── config - project configuration dir
│   └── dbconnect.js - db configuration file
├── controllers - all controllers
├── middlewares - all middlewares
│   └── auth - auth middlewares
│       └── verifyToken.js
├── models - db models
├── routes - all routes
│   ├── auth.js - auth routes(register, login)
│   ├── get.js - all get routes
│   └── post.js - all post routes
├── package-lock.json
├── package.json - project metadata(info, dependency and npm scripts)
└── server.js - project entry point
```

# NPM Scripts
following NPM scripts can  be used to run the app
- "start": "node server.js",
- "dev": "nodemon server.js"