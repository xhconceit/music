
const router = require('./backend/router.js')

const express = require('express')
const app = express()

function createServe (prot = 4000) {
  app.use(express.static('dist'))
  router(app)
  app.listen(prot, () => {
    console.log(`http://localhost:${prot}/`)
  })
}

module.exports = createServe
