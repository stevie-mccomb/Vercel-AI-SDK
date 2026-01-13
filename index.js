import { config as dotenv } from 'dotenv';
import { streamText } from 'ai';
import express from 'express';

dotenv();

const app = express();

app.use(express.static('public'));
app.use(express.json());

const messages = [];

app.post('/prompt', async (request, response) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Transfer-Encoding', 'chunked');

    messages.push({
        role: 'user',
        content: request.body.prompt,
    });

    const result = streamText({
        model: 'openai/gpt-5-mini',
        messages,
    });

    result.pipeTextStreamToResponse(response);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on http://localhost:3000...`));