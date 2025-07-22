const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const {ObjectId} = require('mongodb');

const app = express()

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); 
app.use(bodyParser.urlencoded())

mongoose.connect('mongodb://localhost:27017/assignment-tracker')

const db = mongoose.connection;


app.get('/', async (req, res) => {
    
    const requestedSession = (req.query.session ?? "1");
    let assignments = [];

    try {
        // `SELECT * from assignments where session='${requestedSession}'`
        const output = await db.collection('assignments').find({
            session: requestedSession
        });
        assignments = await output.toArray();

        console.log(assignments[0]._id.toString());
    } catch (err) {
        console.log(err);
    }
    
    res.render('index', {
        assigments: assignments
    });
})


app.get('/form', function(req, res) {
    res.render('form');
})

app.post('/submit-form', async function(req, res) {

    const submittedData = req.body;

    const now = dayjs();
    const currentTime = now.format('YYYY-MM-DD HH:mm:ss');

     try {
        // INSERT INTO assignments (name, link, submitted_at, session)
        const output = await db.collection('assignments').insertOne({
            name: submittedData.name,
            link: submittedData.link,
            session: submittedData.session,
            submited_At: currentTime
        });
        // assignments = output[0];

        console.log(output);
    } catch (err) {
        console.log(err);
    }

    res.redirect('/')
})

app.delete('/delete-assignment', async function(req, res) {

    const assignmentId = (req.query.id);
    const output = await db.collection('assignments').deleteOne({_id: new ObjectId(assignmentId)});

    console.log({delete: output})

    res.redirect('/')

});


app.get('/update/:id', async (req, res) => {
    const assignment = await db.collection('assignments').findOne({_id: new ObjectId(req.params.id)});
    res.render('edit', { assignment });
});

app.post('/update/:id', async (req, res) => {
    const assignmentId = req.params.id;
    const updatedData = {
        name: req.body.name,
        link: req.body.link,
        session: req.body.session
    };

    await db.collection('assignments').updateOne(
        { _id: new ObjectId(assignmentId) },
        { $set: updatedData }
    );

    res.redirect('/');
});




app.listen(3000, function() {
    console.log('Server started at http://localhost:3000');
})