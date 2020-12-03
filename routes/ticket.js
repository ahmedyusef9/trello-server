const express = require('express')
const { insertItem, getItems, updateQuantity, deleteById } = require('../db')
const Joi = require('@hapi/joi')
const router = express.Router()
const collectionName = 'ticket'

const ticketSchema = Joi.object().keys({
    name: Joi.string(),
    quantity: Joi.number().integer().min(0)
});
router.post('/', (req, res) => {
    const item = req.body
    insertItem(collectionName, item)
        .then((data) => {
            res.json(data.ops);
            res.status(200).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
})

router.get('/', (req, res) => {
    getItems(collectionName)
        .then((data) => {
            res.json(data)
            res.status(200).end()
        })
        .catch((err) => {
            res.status(500).end()
        })
})

router.delete('/:id', (req, res) => {
    deleteById(collectionName, req.params.id)
    getItems(collectionName)
        .then((data) => {
            res.json(data)
            res.status(200).end()
        })
        .catch((err) => {
            res.status(500).end()
        })
})

module.exports = router
