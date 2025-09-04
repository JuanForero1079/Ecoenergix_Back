const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3001;

const DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecoenergix',
});