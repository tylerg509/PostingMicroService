const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express();
app.use(bodyParser.json())

const events = []

app.post('/events', (req,res) => {
    console.log('event received', req.body.type);

    const event = req.body;

    events.push(event)

    axios.post('http://posts-clusterip-srv:4000/events', event).then(result => {}).catch(err => console.log(err)).finally(console.log('ran 4000'))
    // axios.post('http://localhost:4001/events', event).then(result => {}).catch(err => console.log(err)).finally(console.log('ran 4001'))
    // axios.post('http://localhost:4002/events', event).then(result => {}).catch(err => console.log(err)).finally(console.log('ran 4002'))
    // axios.post('http://localhost:4003/events', event).then(result => {}).catch(err => console.log(err)).finally(console.log('ran 4003'))

    res.send({ status: 'OK'});

})

// Method to get all events. In case service goes down or we start a new service we can use this to sync all services
app.get('/events', (req,res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Listening on 4005')
})