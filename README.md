# NetSearch

Movies search using Netflix Roulette API.

## Installation

You need node v5.10.1, npm and mongo as a prerequisite.

### Run

Mongo:
```sh
$ mongo
$ use netflix
$ db.createCollection('user')
```

Sails:
```sh
$ sudo npm i -g sails
$ npm i
$ sails lift
```

### Test

To install:
```sh
$ npm run install-tests
```

To run:
execute each command in one bash:
```sh
$ npm run webdriver
$ npm run test
```

### Test (Alternative)

Unit test - Karmajs:
```sh
$ npm i
$ npm i -g karma-cli
$ karma start
```

E2e tests - Protractor:
```sh
$ npm i -g protractor@1.8.0
$ webdriver-manager update
$ webdriver-manager start
$ protractor tests/e2e/config.js
```