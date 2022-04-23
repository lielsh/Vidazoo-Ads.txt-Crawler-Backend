require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');

const app = express();
const port = process.env.PORT || '5000';
const domainRouter = require('./routes/domain');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', domainRouter);

const server = http.createServer(app);
server.listen(port, () => console.log(`Node.js web server is running at port ${port}...`));