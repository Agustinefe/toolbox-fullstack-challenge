# Toolbox Fullstack Challenge - Backend

## Features

- Files
  - Get a list of file names.
  - Get the files content (or from only one if indicated).

## Pre-Requisites for Dev Environment

- Node package manager installed with SUDO Permission.
- Secret files API up and running.

## Scripts

- `npm run start`: starts the application in production mode.
- `npm run lint`: runs StandardJs linter.
- `npm run lint:fix`: runs StandardJs linter and runs the automated fix.
- `npm run test`: runs the E2E tests.

## Techs

- ExpressJs 5.
- Node 18.
- Dotenv (To simplify the env vars setting).
- Standard (For linting and formatting).
- Mocha, Chai, Supertest (For E2E testing).
- Docker / Docker compose
- Swagger (For API documentation)

## Technical and bussiness decisions made

### General

- Clean Architecture: To be able to handle further changes in the future in a proper way.
- Docker: To make the project portable
- Testing/E2E: E2E testing was done because it is useless to always test every single part. That's why if the controller provide the proper answer the test has passed. This is to ensure the tests are closer to real-world use cases. The secret file external source has been mocked since it's not our responsibility to test external services.

### Entities

#### FileContent

| Field name | Type   |     Meaning      |
| ---------- | ------ | :--------------: |
| text       | string | The file content |
| number     | number | The file number  |
| hex        | string |   The file hex   |

#### File

| Field name | Type          |     Meaning      |
| ---------- | ------------- | :--------------: |
| file       | string        |  The file name   |
| lines      | FileContent[] | The file content |

Example:

```json
{
  "file": "test3.csv",
  "lines": [
    {
      "text": "LFghdlarTAOdElFJlc",
      "number": 8,
      "c304f100055f788f1348a2d940486725"
    },
        {
      "text": "LFghdlarTAOdElFJlc",
      "number": 8,
      "c304f100055f788f1348a2d940486725"
    }
  ]
},
```

## Assumptions

- When fetching all the files content and some file failed to fetch its content, it's discarded from the file content list.
  - When fetching a single file content and it fails, a 404 error is thrown.
  - If the file that failed is from the file list, it is also discarded, or a 404 error is thrown, depending on the case.
- When fetching all the files content and some file is empty, it's discarded from the file content list.

## Areas to improve

- We could use Zod or Joi to create schemas and validate DTO's.
- Axios could be used to improve external api calls.
- A Cache could be implemented to reduce the amounts of external source requests.
- Everything related to HTTP (errors, mappers) could be moved to a common module, in case the project scales and other feature modules are required.
- Error handling could be improved (I.E handle more external api error cases)
- Continuous integration and tests coverage could be made using CircleCI and CodeCov.
- Deployment with Heroku could be done.

## Route

- Local: [API Swagger](http://localhost:3001/api-docs) (once api is up and running)

## Env vars that should be defined

To find an example of the values you can use [.env.example](.env.example)
