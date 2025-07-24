import { Sequelize } from 'sequelize';
import { config } from '../config/config';
import { UserModel } from './models/user';  // your function that initializes all models

export const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    dialect: 'postgres',
    logging: false,
  }
);

// Initialize all models and get an object with all models
const models = UserModel(sequelize);

// Set up associations (if any)
Object.values(models).forEach((model: any) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

// Export models and sequelize for external use
export const Database = {
  ...models,
  sequelize,
};
