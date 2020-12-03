const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'trello'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (collectionName, item) => {
  const collection = db.collection(collectionName)
  return collection.insertOne(item)
}

const getItems = (collectionName) => {
  const collection = db.collection(collectionName)
  return collection.find({}).toArray()
}

const updateQuantity = (collectionName, id, quantity) => {
  const collection = db.collection(collectionName)
  return collection.updateOne({ _id: ObjectId(id) }, { $inc: { quantity } })
}

const deleteById = (collectionName, id) => {
  const collection = db.collection(collectionName)
  return collection.deleteOne({ _id: ObjectId(id)})
}

module.exports = { init, insertItem, getItems, updateQuantity, deleteById }
