# csv-reader-api

This API can reads, echos back to you, invert, flatten, sum or calculate the
product of a quadractic matrix in CSV

## Installation

```console
git clone git@github.com:xumes/csv-reader-api.git

cd csv-reader-api

npm install

npm start
```

When you see the message Server is running at port: 3000 the api is up and
running

## Unit Tests

Run all test cases

```console
npm test
```

Run test coverage

```console
npm run test:coverage
```

## Considerations

-   The API assumes a single CSV file will be uploaded
-   The API only check if there is only numbers inside the file when is doing
    calculations (Sum and Multiply)
-   Endpoints:
    -   `POST /echo`
    -   `POST /invert`
    -   `POST /flatten`
    -   `POST /sum`
    -   `POST /multiply`
-   For all the requests you need to provide a CSV file with the key `file`
-   No other parameter is required
-   I build the project using the Conventional Commits, feel free to check each
    commit to follow my rational while developing the API.

## Online documendation

Feel free to access the swagger documentation With the server running, access
`http://localhost:3000/docs`
