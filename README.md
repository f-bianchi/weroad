# WeRoad - Tech case Project

This repository contains the source code divided into a backend and a frontend part.
The backend is developed using Nest.js while the frontend is developed using Vue.js.

## Prerequisites

- Node.js version 20.x or higher
- Before getting started, make sure you have Docker installed on your system.

## Getting Started

Start Docker and containers for db:

```bash
cd docker
docker compose up -d
```

### Backend

The backend of the project is developed with Nest.js and uses a PostgreSQL database with TypeORM.

To start the backend, in `weroad-backend` folder, run the following command:

```bash
npm i
npm start
```

Before starting the backend, make sure to check the variables in the `.env` file. If you want to change the default variables (eg: connection to a different db), create a `.env.local` file.

Once started, a seeder service will automatically insert initial data into the database if environment variable `ENABLE_IMPORT_MOCK_DATA` is `true`.

To start run test, in `weroad-backend` folder, run the following command:

```bash
npm t
```

### Frontend

To start the frontend, in `weroad-frontend` folder, run the following command:

```bash
npm i
npm run dev
```

Login in admin section with these users:

|       Email        |  Password |  Role  |
|--------------------|:---------:|-------:|
| admin@example.com  |  password | admin  |
| editor@example.com |  password | editor |

For more information on Tailwind UI components, visit https://tailwindui.com/components.

## Lint and format

To format the code according to the rules of the `.prettierrc.json` file, run in the folder of both projects:

```bash
npm run format
```

To find and fix JS problems with `eslint`, run in the folder of both projects:

```bash
npm run lint
```
