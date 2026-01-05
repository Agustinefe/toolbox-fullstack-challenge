# Toolbox Fullstack Challenge - Frontend

## Design

### Home page

From Home page you can:

- See the files content in a table format.
- Choose a filename to see only its content.
- In case an error occurs, a toast would be rendered to let you know about it.

## Pre-Requisites for Dev Environment

- Node package manager installed with SUDO Permission.
- Backend API up and running.

## Scripts

- `npm run start`: starts the application in development mode.
- `npm run build`: builds the app for production.
- `npm run lint`: runs Eslint linter.
- `npm run lint:fix`: runs Eslint linter and runs the automated fix.

## Techs

- React 19.
- Node 20.
- Webpack 5.104.1.
- Bootstrap 2.10.10.
- Dotenv (To simplify the env vars setting).
- Eslint, Prettier (For linting and formatting).
- Docker / Docker compose

## Technical and bussiness decisions made

### General

- Architecture:
  - Features: Every component, hook, services, related to a module, would be stored inside the module directory. This ensures modulartity and promotes a better project scaling.
  - Shared: Everything that is shared between modules is stored here (components, hooks, services).
  - Screens: contains the screen components. Could be organized following a file-based routing.
- Docker: To make the project portable.
- Unit/Integration testing: Since we are testing only the observable, it's useful to make unit tests over the isolated components. Also it's necessary to make integration tests to make sure that the components works together propertly. E2E tests have not been done since there are better tools to make them, like Cypress or Playwright.

## Assumptions

- When fetching all the files content and some file failed to fetch its content, it's discarded from the file content list.
  - When fetching a single file content and it fails, a 404 error is thrown.
  - If the file that failed is from the file list, it is also discarded, or a 303 error is thrown, depending on the case.
- When fetching all the files content and some file is empty, it's discarded from the file content list.

## Areas to improve

- Schema validation packages like Zod or Joi could be used to create schemas and validate DTO's.
- Axios could be used to improve external api calls. For a better API access management, Tanstack Query could be use (like introducing caching for API requests).
- Tanstack Router could be used for a better project scaling.
  - I should find a way to change the selected file without re-rendering the select component again. Using Tanstack router would solve automatically this problem.
- Continuous integration and tests coverage could be made using CircleCI and CodeCov.
- Deployment with Heroku could be done.

## Env vars that should be defined

To find an example of the values you can use [.env.example](.env.example)
