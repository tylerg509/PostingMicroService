const express = require('express')
const bodyParser = require('body-parser')
const cors = ('cors')

const app = express()
app.use(bodyParser.json)
app.use(cors())

app.get('/posts', (req, res) => {

})

app.posts('/posts', (req, res) => {
    
})

app.listen(4002, () => {
    console.log('Listening on 4002')
})