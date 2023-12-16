require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const db = require('../infrastructure/connection/db')
const router = require('./routes/routes')

const init = async () => {
 
  db.sequelize.sync({force: true})

  app.use(cors())
  app.use(express.json());
  app.use('/', router)

  console.log(process.env.APP_PORT)

  const server = app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on port http://localhost:${server.address().port}`);
  })
}

init()