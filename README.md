# Store Queue Service

### Introduction
The service is written mainly on Typescript and contains 4 parts:
1. The main source code is located under `src/store` folder.
2. Source-folder also contains __index.html__ file which uses generated js-files. You can just open this file in the browser and test the functionality without any needs to run the commands.
3. Dist-folder contains js-files compiled from ts-files. Those files will be updated automatically if project is build or run locally.
4. Tests-folder contains the functionality with 25 unit-tests.

### Commands in CLI
- `npm run start` - to build and start server-side of the project locally
- `npm run test` or `npm run test:watch` - to run unit-tests
- `npm run build` - just to compile ts-files again (if they were updated), already included in 'start' command

### Notes
* The complexity of get() and put() methods is O(1) according to Big-O criteria. Each of these methods uses maximum 3 operation inside [get, delete, set with complexity O(1)], so 3 x O(1) = O(1).
* Map.has() is omitted in the class to avoid one more operation. Method delete() is using directly here, it returns true/false only and doesn’t returns any errors if the Map has no given key.
* Please consider index.html as not a real frontend part for this task, it’s for test purposes only. 
* We can use console in browser to monitor logs and errors.
* According to best practices, the project has to contain double validation (on frontend and backend) to handle values from the end-user. Herewith we had initial interface with strict type of incoming arguments, so it was implemented just common validation that was required.
* 25 unit-tests contain the validation for common cases and groupped into 3 TestSuites:
  * Validation the constructor of Store Class
  * Validation arguments for get() and put() methods
  * Validation business logic for Store Class
