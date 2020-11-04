const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')

// to-Do: vaihda ja piilota salasana
const url = `mongodb+srv://week:kissa123@cluster0.zw76f.mongodb.net/weekling?retryWrites=true&w=majority`

const fs = require('fs')
app.use(express.static('build'))

/** ngrok*/
const ngrok = require('ngrok');
(async function () {
  const url = await ngrok.connect({ addr: 3001 })
  console.log('connected to ngrok ' + url)
  fs.writeFile('ngrokosoite.txt', url, (error) => {

    // In case of a error throw err exception. 
    if (error) throw err;
  })
})
  ().catch((error) => {
    console.log('error connecting to ngrok ', error.message)
  })

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB ', error.message)
  })

const objectSchema = new mongoose.Schema({
  date: Date
})

const Object = mongoose.model('Object', objectSchema)

objectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

app.get('/', (req, res) => {
  Object.find({}).then(objects => {
    res.json(objects)
  })
})

app.post('/', (req, res) => {
  const body = req.body

  const object = new Object({
    date: body.date 
  })

  object.save().then(savedObject => {
    res.json(savedObject)
  })
})

app.get('/:id', (req, res) => {
  Object.findById(req.params.id).then(object => {
    res.json(object)
  })
})

const port = process.env.PORT || 3001
app.listen(port)
console.log(`port ${port}`)
