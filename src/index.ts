import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mocafi';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

RegisterRoutes(app);

// Swagger
try {
    const swaggerFilePath = path.join(__dirname, '../public/swagger.yaml');
    const swaggerFile = fs.readFileSync(swaggerFilePath, 'utf8');
    const swaggerDocument = yaml.load(swaggerFile) as swaggerUi.JsonObject;
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Swagger UI available at /docs');
} catch (err) {
    console.error('Failed to load swagger.yaml. Run `npm run tsoa:gen` first.', err);
}


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error';
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
});


// mongo start
mongoose.connect(MONGODB_URI)
  .then(() => {
      console.log('Successfully connected to MongoDB');
      app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
          console.log(`API base path: http://localhost:${PORT}/api`);
      });
  })
  .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit if DB connection fails
  });

export default app;
