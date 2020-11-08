const express = require('express');
const bodyParser = require('body-parser')
const cors = require ('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors());

// here is where we store posts
// //ex
// posts === {
//     'laksjdf': {
//         id: 'laksjdf',
//         title: 'post title',
//         comments: [
//             {id: 'lkajsf', content: 'comment!!!'}
//         ]
//     }
// }

const posts = {};

const handleEvent = (type, data) => {
    if(type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] }
    }

    if(type === 'CommentCreated') {

        const { id, content, postId, status } = data;

        const post = posts[postId]

        post.comments.push({id, content, status})
    }

    if (type === 'CommentUpdated') {
        const {id, content, status, postId} = data;

        const post = posts[postId]

        const comment = post.comments.find(comment => {
            return comment.id === id;
        })

        comment.status = status
        comment.content = content
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    console.log('event received', req.body.type);

    const { type, data } = req.body;

    handleEvent(type, data)

    res.send({})
})

app.listen(4002, async () => {
    console.log('Listening on 4002')

    // in case the query service goes down, as we start the query service we reach out and get all events
    const res = await axios.get('http://localhost:4005/events')

    for (let event of res.data) {
        console.log('Processing event: ', event.type)

        handleEvent(event.type, event.data)
    }
})