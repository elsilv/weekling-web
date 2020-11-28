const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const fs = require('fs')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

/** Ngrok yhdistäminen */
const ngrok = require('ngrok');
(async function () {
  const url = await ngrok.connect({
    addr: 3001,
    authtoken: '1k2t4vN3JnQjoMWnCh6JIDWtONS_7XK8qM9Sfr3mN1gBzCECa'
  })
  console.log('connected to ngrok ' + url)
  fs.writeFile('ngrokosoite.txt', url, (error) => {
    if (error) throw err
  })
})
  ().catch((error) => {
    console.log('error connecting to ngrok ', error.message)
  })

/** MongoDB yhdistäminen */
const url = `mongodb+srv://week:kissa123@cluster0.zw76f.mongodb.net/weekling?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB ', error.message)
  })

const objectSchema = new mongoose.Schema({
  event_name: String,
  times: [
    { date: [Date] }
  ]
})

const Object = mongoose.model('Object', objectSchema)

objectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/** Lisätään ajat haluttuun tapahtumaan id:n perusteella */
app.put('/', (req, res) => {
  console.log("id: " + req.body.id);
  Object.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: {
        times: {
          date: req.body.times
        }
      }
    },
    { upsert: true },
    function (error, success) {
      console.log(req.body.times)
      if (error) {
        console.log('error adding to new time, probably there is something wrong with id', error.message)
      } else {
        console.log('New time added!' + success)
      }
    })
})

const port = process.env.PORT || 3001
app.listen(port)
console.log(`port ${port}`)
