# toolbox-fullstack-challenge

## How to run the APP

```
chmod 711 ./up_dev.sh
./up_dev.sh
```

## How to run the tests

```
chmod 711 ./up_test.sh
./up_test.sh
```

# Tech stack

- dotenv
- supertest

# Improvements

- We could use Zod or Joi to create schemas and validate DTO's.
- Axios could be used to improve external api calls.
- Everything related to HTTP (errors, mappers) could be moved to a common module, in case the project scales and other feature modules are required.
- Find a way to change the selected file without re-rendering the select component again.
