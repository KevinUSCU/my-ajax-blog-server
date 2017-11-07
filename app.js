const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.disable('x-powered-by')

const cors = require('cors')
var corsOptions = {
  origin: 'https://kevinuscu-my-ajax-blog-client.surge.sh',
  // origin: 'http://127.0.0.1:8080/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const morgan = require('morgan')
app.use(morgan('dev'))

const routes = require('./src/routes')
app.use('/posts', routes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err.error })
})

app.use((req, res, next) => {
  res.status(404).json({ error: 'Resource not found.' })
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app