# Blog API - Nest.js

This is the repository for a blog API built with [Nest.js](https://nestjs.com/). The API provides features like user creation, post listing, user editing, photo storage, and integrates with a PostgreSQL database. It uses JWT authentication for user login and can be integrated with the [frontend](https://github.com/Thiago-Teofilo/ignite-feed-frontend).

## Technologies Used

- [Nest.js](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) for authentication
- [Docker](https://www.docker.com/) for the development environment

## Prerequisites

Ensure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)


## Environment Variables

Create a `.env` file at the root of the project and define the following variables:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
JWT_SECRET="my_secret"
FRONTEND_URL="http://localhost:5173"
```

Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with the appropriate values for your database.

## Setup and Running

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

If you don't have a local PostgreSQL database, you can start a container using Docker:

```bash
docker-compose up
```

The `docker-compose.yml` file should be provided in the project to configure the PostgreSQL database.

### 3. Run the Application

Start the application with the following command:

```bash
npm run start:dev
```

The API will be available by default at `http://localhost:3000`.
