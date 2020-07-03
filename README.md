# Lab19 (extra credit lab)

## CAPS - Code Academy Parcel Service

### Author: Ashley Biermann

### Links and Resources

- [submission PR](https://github.com/401-advanced-javascript-ashley-biermann/caps/pull/5)
- [ci/cd](https://github.com/401-advanced-javascript-ashley-biermann/notes/tree/master/.github/workflows) (GitHub Actions)

### Setup

#### `.env` requirements (where applicable)
- Required for each Application folder: `driver`, `vendor`, `hubcaps` 
- `PORT` 
- `STORE_NAME`
-----
- Secondary App Structure
- Required for each Application folder: `acme-widgets.js`, `flowers.js`, `caps-api` 
- `PORT` (express port and socket.io both required)
- `STORE_NAME` (not needed for `caps-api`);

#### How to initialize/run your application (where applicable)
- Three Applications folders located at root: `driver`, `vendor`, `hubcaps` 
- `npm start` while in each app's folder

#### Tests

- `npm test`
- Scaffolded, not yet implemented

#### UML

- ![uml](./images/capsclass16.jpg)
