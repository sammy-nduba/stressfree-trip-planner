import { handler } from './dist/server/entry.mjs';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the client directory
app.use(express.static('dist/client'));

// Handle all other requests with the Astro handler
app.use((req, res, next) => {
    handler(req, res, next);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
