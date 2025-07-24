import express from 'express';
import { config } from './config/config';
import { userRouter } from './routes/userRoute';
import { sequelize } from './database/index';

const app = express();

app.use(express.json());
app.use('/api', userRouter);

const PORT = config.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('😊 😊 😊  Database connected successfully ');
    app.listen(PORT, () => {
      console.log(`⚡ ⚡ ⚡  Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('😔 😔 😔  Database connection failed:', err);
  });
