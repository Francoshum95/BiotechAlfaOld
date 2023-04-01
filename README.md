# Introduction
This is old version of https://www.biotechalfa.com

The new repo: https://github.com/Francoshum95/BiotechAlfa-t3

This project is a biotech investment research tool, developed as a full-stack web application utilizing `Next.js`, `Express.js`, and `MongoDB`. 

The project includes `Express.js` backend server with `Redis` caching, `Nodemailer` for authentication, and  CRUD operations for seamless storage and access to data in `MongoDB`. Robust security measures have been implemented to ensure secure authentication through `JWT` and `refresh JWT Cookies`. The project also incorporates `Next.js` server rendering and static generation for enhanced performance. Additionally, a sleek and modern user interface has been designed using `TailwindCSS` and `Chart.js`, to provide users with a visually appealing and intuitive experience.

# Client

## Edit baseURL.js
Modifty client/constants/baseURL.js 

## Run Dev
```
yarn dev
```

# Server

## Create .env file
Modifty .example.env file and change it to .env file

## Run Dev

1. Start `Redis` Server

    ```
    docker compose up
    ```

2. Start Express Server

    ```
    yarn start
    ```




# Demo

| home page | sector page | stock page
| - | - | - |
| ![](demo/home.png?raw=1)| ![](demo/sector.png?raw=1) | ![](demo/stock.png?raw=1) |

| login page | signup page | email
| - | - | - |
| ![](demo/login.png?raw=1)| ![](demo/signup.png?raw=1) | ![](demo/email.jpeg?raw=1) |










