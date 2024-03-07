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

Before running the project, make sure to create a `.env` file based on `.env.sample` and customize it according to your environment. Use it as is to connect to Docker database

| Variable Name            | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `LOG_LEVEL`              | Specifies the logging level for the application.                  |
| `PORT`                   | Specifies the port number the server should listen on.            |
| `JWT_SECRET`             | Secret key used for JWT token generation and verification.        |
| `POSTGRES_HOST`          | Hostname for the PostgreSQL database.                             |
| `POSTGRES_PORT`          | Port number for the PostgreSQL database.                          |
| `POSTGRES_USERNAME`      | Username for connecting to the PostgreSQL database.               |
| `POSTGRES_PASSWORD`      | Password for connecting to the PostgreSQL database.               |
| `POSTGRES_DATABASE`      | Name of the PostgreSQL database.                                  |
| `ENABLE_IMPORT_MOCK_DATA`| Indicates whether to enable importing mock data into the database.|

To start the backend, in `weroad-backend` folder, run the following command:

```bash
npm i
npm start
```

To start run test, in `weroad-backend` folder, run the following command:

```bash
npm t
```

To access the OpenAPI documentation, navigate with broswer to the `/api` path.

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
