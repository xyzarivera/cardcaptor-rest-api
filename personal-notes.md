# Personal Notes!

## Things to do

- [x] Set up TypeScript Express Server
- [ ] Set up API functionalities
- [ ] Set up ORM (typeORM) and connect database

## How I Started my Project

- created a github repository, cloned it to local
- wrote a README file
- create gitignore file
- initialized a nodeJS project using `npm init`
    - filled up initial `package.json` information via `npm init`
- installed TypeScript as a dev dependency using `npm install -D typescript`
- create application endpoint at `src/index.ts`
- create `tsconfig.json` using `npx tsc --init`
    - followed `tsconfig.json` from a previous sprint
- ts compiler: `npx tsc --watch`
- install express `npm i express && npm i -D @types/express`
    - create initial express app to test if working
    ```
        import express from 'express';
        const app = express();

        app.get('/', (req, res) => {
            res.send('Hellooooo')
        });

        const port = process.env.PORT || 3000;

        app.listen(port, () => console.log(`App listening on PORT ${port}`));
    ```
- update npm scripts in `package.json`
    ```
        "start": "node dist/index.js",
        "dev": "tsc -w & nodemon dist/index.js"
    ```

<img src="./img/1.png" alt="Initial Express App" width="75%"/>

## Mimicking ORM sprint

- copied `index.ts` and `app.ts`
    - removed unwanted imports to make it work
    - no default `GET` method yet, but it connects

<img src="./img/2.png" alt="Initial Express App" width="75%"/>

### Resources

- [How to Build A REST API with ExpressJS and TypeScript](https://medium.com/swlh/build-a-rest-api-with-express-js-and-typescript-dc2c8da89c52)