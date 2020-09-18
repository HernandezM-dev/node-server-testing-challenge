const express = require('express');
// const knex = require('knex');

const db = require('../members/member-model.js')

const router = express.Router();

router.get('/', (req, res) =>{
    db.find()
        .then(members =>{
            res.status(200).json(members)
        })
        .catch(err =>{
            res.status(500).json({err: err})
        })
})

router.get('/:id', (req, res) =>{
    const id = req.params.id;
    db.findById(id)
        .then(member =>{
            res.status(200).json(member)
        })
        .catch(err =>{
            res.status(500).json({err: err})
        })
})

router.post('/', (req, res) =>{
    const newMember = req.body;
    db.add(newMember)
        .then(member =>{
            res.status(201).json(member)
        })
        .catch(err =>[
            res.status(500).json({err: err})
        ])
})

router.delete('/:id', (req, res) =>{
    const id = req.params.id;

    db.remove(id)
        .then(deleted =>{
            res.status(200).json({message: 'successfully deleted'})
        })
        .catch(err =>{
            res.status(500).json({err: 'Unable to process request'})
        })
})

module.exports = router