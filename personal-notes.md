# Personal Notes!

## Things to do

- [x] Set up TypeScript Express Server
- [x] Set up API functionalities
- [x] Set up ORM (typeORM) and connect database
- [x] Seed data
- [x] Finish Sakura Card enpoint
- [x] API documentation and Slides
- [ ] Figure out why `npm start` isnt working
- [ ] How to deploy?



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

- create express app instance
    - copied `index.ts` and `app.ts` from previous sprint
    - removed unwanted imports to make it work
    - no default `GET` method yet, but it connects
<img src="./img/2.png" alt="Initial Express App" width="75%"/>

- connect to psql using `typeorm`
    - installed `typeorm`, `type-seeding`, `pg`, `dotenv`, `ts-node`
    - copied `scripts/testConnection`, `database.ts`, `ormconfig`
    - created `.env` for psql environment variables

- creating `Home` service
    - create `index.ts` that exports the controller and manager
    - create `controller.ts` that handles the REST API endpoints
    - create `manager.ts` that handles the data or other functions
- repeat for creating other serices

## Seeding Data

- create an Entity
- copy npm scripts for orm
    ```
    "orm": "ts-node -r dotenv/config ./node_modules/typeorm/cli.js --config src/ormconfig.ts",
    "makeMigrations": "npm run orm -- migration:generate -n",
    "migrate": "npm run orm -- migration:run",
    "rollback": "npm run orm -- migration:revert",
    "seeder": "ts-node -r dotenv/config ./node_modules/typeorm-seeding/dist/cli.js",
    "seed": "npm run seeder -- --configName src/ormconfig.ts seed"
    ```
- prepare seeds
- do migrations with `npm run makeMigration <migrationFileName>` and `npm run migrate`
- seed using `npm run seed`

## Sanitizing RESTful Endpoints

I'm trying to make my endpoints RESTful
- no spaces, use hyphens
- no uppercase letters 

However, whenever I query my data directly using the parameters, my source has spaces and uppercase letters. By default, the browser accepts spaces and my manager function matches uppercase letters (ie. `http://localhost:5000/cards/The Windy`). This does not follow the RESTful endpoint guide, tho it works!

I created a short function that would accept my RESTful endpoint. It changes hyphens to spaces and first letters of a work to uppercase. I'm not sure how many enpoints would use this, but I'd like to note it here. Almost got stuck thinking if I should create a Middleware already, but it's overengineering for now!
```
import _ from 'lodash';
private sanitize = (input:string) : string => {
    return _.startCase(_.toLower(_.replace(input,new RegExp("-","g")," ")));
}
```

### Resources

- [How to Build A REST API with ExpressJS and TypeScript](https://medium.com/swlh/build-a-rest-api-with-express-js-and-typescript-dc2c8da89c52)