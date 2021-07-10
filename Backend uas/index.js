const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const mongoURL = 'mongodb://localhost:27017/uas-pemograman'

mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('berhasil connect ke database')
}).catch(() => {
  console.log(e)
  console.log('gagal connect ke database')
})

app.use(cors())
const directory = path.join(__dirname, '/statics/')
app.use(express.static(directory))

app.use(bodyParser.json({
    extended: true,
    limit:'20mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit:'20mb'
}))

app.use('/user', require('./routes/User'))
app.use('/permainan', require('./routes/Game'))
app.use('/order', require('./routes/Order'))

app.listen(8000, () => {
    console.log('Server Mulai')
})