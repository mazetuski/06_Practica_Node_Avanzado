# NodePop

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

#### Get All

- Method: GET
- Url: /apiv1/advertisements
- Params:

| Param     | Type    | Help  |
| :-------: |:-------:| ----- |
| Name      | String  |       |
| Sale      | Boolean |       |
| Price     | Number  |       |
| Tags      | String  |  you can put many values ​​separated by a comma, ?tags=motor,lifestyle     |

    
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

| Param     | Type    |
| :-------: |:-------:|
| Name      | String  |
| Sale      | Boolean |
| Price     | Number  |
| Tags      | Array   |
| Photo     | String  |

#### Get all tags

- Method: GET
- Url: /apiv1/tags