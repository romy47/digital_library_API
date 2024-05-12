require('dotenv').config({ path: `./environment/.env.${process.env.NODE_ENV}` })
const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Express App running on port " + PORT)
    } else {
        console.log("Error while running express server", error);
    }
}); 