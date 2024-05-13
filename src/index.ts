import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: `./environment/.env.${process.env.NODE_ENV}` });

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Express App running on port " + PORT)
});
