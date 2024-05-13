import express from 'express';
import { DefaultConfig } from './config';

const app = express();

app.listen(DefaultConfig.port, () => {
    console.log("Express App running on port " + DefaultConfig.port)
});
