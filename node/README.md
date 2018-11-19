# SHOW TIME

This project was generated with [npm install](https://docs.npmjs.com/cli/install).

## Development server

Run `npm run start:dev` for a dev server. Navigate to `http://127.0.0.1:8000/`. 
The app will automatically reload if you change any of the source files.

## DB setup

The project is currently setup to work with a [PostgresSQL](https://www.postgresql.org/) database but this can be
changed in .\team17\node\server\config\config.json  file to match the DB config that you would like.
i.e.

  "development": {
    "username": "admin",
    "password": "nimda",
    "database": "showtime",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  }

## DB and Models scaffolding

A list of vaiable commands for the [Sequelize CLI](https://github.com/sequelize/cli/blob/master/README.md)

To run the project as is with sample date install [PostgresSQL](https://www.postgresql.org/) and run `psql -U postgres < node/db/setup.sql` from the project root folder.

Next `cd .\team17\node` and run `sequelize db:migrate`

Next `cd .\team17\node\db` and run `psql -U project-collab-admin -d project-collab-db -f sample_data.sql`

## Further help

To get more help on the Sequelize Package go check out the [Sequelize Docs](http://docs.sequelizejs.com).
