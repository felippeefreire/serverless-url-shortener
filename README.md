# URL Shortener Serverless

## What is it?

This project is used to provide a base of functions in [Lambda AWS](https://aws.amazon.com/pt/lambda/) which it's possible to short urls with form scalable **(Node.js 14.x)**.

## Setup  
Copy and rename the `.env.example` file to `.env`, filling your data.  
  
## Using
* [Express 4](http://expressjs.com/)
* [Redis](http://redis.io)
* [Servelerless](https://www.serverless.com/)


## Deploy  
It's necessary to have configured the following environment variables:
*You can configure these variables via the .env file*
 - **AWS_ACCESS_KEY_ID**
 - **AWS_SECRET_ACCESS_KEY**

 ```bat  
npm run deploy
```  

After deploying, you will have the following functions:

- url-shortener-app



## API

### Usage

POST - /shorten

Payload:
```json
{
    "long_url": "https://felippe.dev"
}
```

Response:
````json
{
    "long_url": "https://felippe.dev",
    "short_url": "http://ak.gd/xEgzh",
    "hash": "xEgzh",
    "createdAt": 1616983901386
}
````

GET - /xEgzh
Response: 
REDIRECT - 301
Location: https://felippe.dev


Inspirado em: https://github.com/dotzero/node-url-shortener
