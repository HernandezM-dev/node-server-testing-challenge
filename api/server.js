const express = require('express');

const memberRouter = require('../members/member-router');

const server= express();

server.use(express.json());
server.use('/api/members', memberRouter);

server.get('/', (req, res) =>{
    res.status(200).json({message: 'pinged server'})
})

module.exports = server;