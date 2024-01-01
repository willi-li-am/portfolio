const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Backend is now running on port ${port}!`)
})