# Serverless URL Shortener 

## What is it?

This project provides some functions to create a URL Shortener service. It's created serverless in [Lambda AWS](https://aws.amazon.com/pt/lambda/), that is, it does'n need any server running 24/7 and all data is saved in Redis.

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

After deploying, you will have the following function:

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
    "short_url": "https://short.io/xEgzh",
    "hash": "xEgzh",
    "createdAt": 1616983901386
}
````

---

GET - /xEgzh
> "xEgzh" is a hash of existent shortened url (simulating redirect of request above) 

Response:

REDIRECT - 301

Location: https://felippe.dev

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Inspiration
This project is inspired by https://github.com/dotzero/node-url-shortener
