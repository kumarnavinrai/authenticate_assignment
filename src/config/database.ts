// src/config/database.ts

import { Sequelize } from 'sequelize';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_DATABASE || 'authenticate',
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
