import { config as dotenv } from 'dotenv';
import promptRoute from './routes/prompt.js';
import express from 'express';

dotenv();

const app = express();

app.use(express.static('public'));
app.use(express.json());

promptRoute(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on http://localhost:3000...`));