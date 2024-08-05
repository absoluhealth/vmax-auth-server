# vmax-auth-server
This project serves as a auth server for vmax eco system. This API handles, common user registration, tenant management, app management and handles authentication with cloud identity provider.

Source files are kept insde src folder and test files are in __tests__ folder.

## Dev enviroment setup
1. Install VS code
2. Clone the project
3. RUN npm install from the root directory
4. Run npm run start command to start the server.


Swagger document is available in http://localhost:3000/swagger-docs


## Unit Testing
This project uses jest framework for unit testing. Test cases are kept inside __tests__ folder. 
Maintain the same project structure as the code for test project as well. 

For example if you want to write
test cases for services/user.service.js then create a test file called user.service.test.js inside __tests__/services/

To check the code coverage RUN npm run test:coverage. This will run the test cases and shows how much code is covered by test cases.

Architecture TODO:

1. Expose swagger only for lower environments based on the env config
2. Enable HTTP basic authentication for swagger docs
3. Create Docker file for hosting the API
4. Unit tetsing
5. API Testing


Auth TODO:
1. Login UI, Check if tenant is pwd based or saml based. If SAML just show email collection page else show both email and password