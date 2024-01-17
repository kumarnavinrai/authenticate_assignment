// src/config/database.ts

import { Sequelize } from 'sequelize';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_DATABASE || 'authenticate',
  port: process.env.DB_PORT || 3306,
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  port: 25060,
});

export default sequelize;

// import { Sequelize } from 'sequelize';

// const dbConfig = {
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'your_postgres_user',
//   password: process.env.DB_PASSWORD || 'your_postgres_password',
//   database: process.env.DB_DATABASE || 'your_postgres_database',
// };

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: dbConfig.host,
//   username: dbConfig.user,
//   password: dbConfig.password,
//   database: dbConfig.database,
// });

// export default sequelize;

