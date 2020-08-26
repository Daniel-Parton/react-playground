
# React Playground
Created using Create React App: [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)

## Folder Structure
```
├── README.md
├── cypress (Cypress Integration Test Suite)
├── package.json (NPM dependancies and node scripts)
├── public (Raw Html files and images for the SPA)
├── .env (Environment variables)
└── src
  ├── api (Folder for all api functions as promises)
  ├── components (All app conmponents)
  ├── scss (Folder for shared some shared css: e.g. Scss variables, animation, typography, etc)
  ├── services
  ├── settings
  ├── types (Folder for typescript interfaces and declarations)
  ├── helpers (Folder for generic helper functions)
  ├── index.scss (Top level Scss file.  Should be used in index.tsx)
  ├── index.tsx (Entry to the react application)
```

## Run the Application 
While in the root directory run the following commands:

Resolve App Dependancies (Pull down Node Modules):
```
npm i
```

Start the application
```
npm start
```

## Testing
Front end testing is done using cypress (https://www.cypress.io/).  We are doing integration testing while mocking all api calls.  There are two scripts in packages.json for running cypress tests:

```
"cypress-open": "cypress open",
"cypress-run": "cypress run --spec 'cypress/integration/ci-cd/**/*' --config video=false"
```

### Creating Tests and running locally
when testing locally make sure that you are running the app locally otherwise it won't work.
```
npm start
```

the command cypress-open will open the cypress application and allow you to run tests over a certain page and see the browser while it is running.  This is a good place to debug tests or see what is happening while the test is running. 
```
npm run cypress-open
```