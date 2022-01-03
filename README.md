# Meteorite Landings

A React Web Application that allows users to query, filter, and favorite specific meteorites.

The dataset used for this project can be found at [NASA's Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh).

## Table of Contents

1. [Quickstart](#quickstart)
2. [Contributing](#contributing)
3. [Testing](#testing)
4. [Deployment](#deployment)
5. [Technology Stack](#technology-stack)
6. [TODO](#todo)

## Quickstart

1. Install Node 12.14.1+ from https://nodejs.org/en/download/
2. Clone this repository.
    > git clone https://github.com/BrennonLee/meteorite-landing.git
3. Navigate to this repository.
    > cd meteorite-landing
4. Install the project dependencies and start the app.
    > yarn && yarn start
5. Application will be available on http://localhost:3000

## Contributing

Code quality is managed through ESLint and Prettier. Inherited settings extend from [@carimus/prettier-config](https://github.com/Carimus/prettier-config) and [@carimus/eslint-config-react](https://github.com/Carimus/eslint-config-react).
All code is validated upon being committed.

## Testing

Tests can be ran from the root of the project.

> yarn test

This will scan the codebase and run any files matching the format `<file_name>.test.js` (i.e. `index.test.js` or `saga.test.js`).
<br><br>
Tests utilize [Jest](https://testing-library.com/docs/react-testing-library/intro/) as well as [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan) to cover redux saga integration into the application.

## Deployment

Deployment processes have the following flow:

| Stage                       | Description                                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pull Request against master | _ Jest tests will execute. <br> _ Preview link for React App will be generated and attached to PR. <br> \* Preview link for Storybook will be generated and attached to PR.                 |
| Merge into Master           | _ Jest tests will execute. <br> _ React App will be deployed to https://meteorite-landing.vercel.app. <br> \* Storybook will be deployed to https://meteorite-landing-storybook.vercel.app. |

Every pull request that is opened will automatically have two preview links generated via Vercel.
The first link will be a preview of the React Web App with the latest updates. The second will be a preview
link of the Storybook application to provide a way to view components, screens, and all their possible states.

## Technology Stack

Project was created with

-   [Create React App](https://github.com/facebook/create-react-app)
-   [Storybook](https://storybook.js.org/)
-   [Material UI](https://mui.com/)
-   [React Redux](https://react-redux.js.org/)
-   [Vercel](https://vercel.com/)

## TODO

-   [ ] Enhance user visualization via different types of graphs in addition to our table
