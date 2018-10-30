# NodePop

[![Inline docs](http://inch-ci.org/github/mazetuski/06_Practica_Node_Avanzado.svg?branch=master)](http://inch-ci.org/github/mazetuski/06_Practica_Node_Avanzado)

## Install

```
npm install
```

- Copy .env.dist to .env and change the variables with your values

- You can initialize database with:

```
npm run initialize-db
```

## Run

For run application in production use:

```
npm start
```

## Development

For run in development use:

```
npm run dev
```

## Deploy

You can check code quality with 

```
npm run check-code
```

## Api

- Api need authentication for use it

#### Sandbox credentials

- user: user@example.com
- password: 1234

#### Api Auth

- Url: /apiv1/login
- Params:

| Param     | Type    | Help  |
| :-------: |:-------:| ----- |
| Email     | String  |  Email of the user for authentication  |
| Password  | String  |  Password of the user for authentication |

- This will return a **JWT token**

## All the endpoints below need a token as a parameter to be used

- token: String

#### Get All

- Method: GET
- Url: /apiv1/advertisements
- Params:

| Param     | Type    | Help  |
| :-------: |:-------:| ----- |
| Name      | String  |       |
| Sale      | Boolean |       |
| Price     | Number  |       |
| Limit     | Number  |  To limit the number of advertisements that will appear, ?limit=2    |
| Skip      | Number  |  To skip a number of advertisements, ?skip=1     |
| Fields    | String  |  Put fields name for get a json only with these fields separated by spaces, ?fields=name tags      |
| Sort      | String  |  Put fields name for sort by it separated by spaces, ?sort=name      |
| Tags      | String  |  You can put many values ​​separated by a comma, ?tags=motor,lifestyle     |

    
#### Get By Id

- Method: GET
- Url: /apiv1/advertisements/:id
- Params:

| Param     | Type    |
| :-------: |:-------:|
| Id        | String  |

#### Create Advertisement

- Method: POST
- Url: /apiv1/advertisements
- Params:

| Param     | Type    | Help  |
| :-------: |:-------:|:-----:|
| Name      | String  |       |
| Sale      | Boolean |       |
| Price     | Number  |       |
| Tags      | Array   |       |
| Photo     | File    |  Use form data with file upload  |

#### Get all tags

- Method: GET
- Url: /apiv1/tags