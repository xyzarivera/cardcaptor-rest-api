# 🌟 Cardcaptor REST API

A REST API server capturing the magical cards used in the manga/anime series, Cardcaptor Sakura.

*This was created during my time as a student at Code Chrysalis*

## 🌙 Goals

### Personal

- Be familiar in creating a REST API using TypeScript language
- Be able to draft a boilerplate from this project

### Basic 

- Create a CRUD API service using REST and a Relational database
- Create and run migrations
- Seed database 
- Document API endpoints 

### Advanced 

- Write tests
- Create a frontend
- Deploy!

## ☀️ Features

- TypeScript as languange
- Express for API server
- TypeORM as object-relational mapper 
- `typeorm-seeding` for data seeding 
- Postgresql as database

## 📖 API Documentation

### root

#### **GET** `/`

*greets user* 

parameters: none
returns: `string`

successful response:
```
"Welcome to Cardcaptor Xyza's API! "
```

### cards

#### **GET** `/cards`

*returns an array of Sakura Card objects* 

parameters: none
returns: `SakuraCard[]`

#### **GET** `/cards/{cardName}`

*returns a Sakura Card object* 

parameters: 
cardName: `string`, required

returns: `SakuraCard`

#### **POST** `/cards/{cardName}`

*creates a Sakura Card object* 

request body: `Partial<SakuraCard>`, required
```
{
    "cardName":"Test Card",
    "isMainCard":false,
    "attribute":null,
    "sign": "Sign test",
    "magicType":"magicType Test"
}
```

returns: `SakuraCard`

#### **PATCH** `/cards/{cardName}`

*creates a Sakura Card object* 

request body: `Partial<SakuraCard>`, required
```
{
    "cardName": "Renamed Card"
}
```

returns: `SakuraCard`

#### **GET** `/cards/{cardName}`

*returns a Sakura Card object* 

parameters: 
cardName: `string`, required

returns: `void`

## Models

### SakuraCard

```
id: string;
cardName: string;
isMainCard: boolean;
attribute: string; nullable
sign: string;
magicType: string;
captureOrderAnime: number; nullable
captureOrderManga: number; nullable
transformOrderAnime: number; nullable
transformOrderManga: number; nullable
clowCardForm: string; nullable
sakuraCardForm: string; nullable
```