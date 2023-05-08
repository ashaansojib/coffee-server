const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 9988;
const { MongoClient, ServerApiVersion } = require('mongodb');

// dhLr5bvmallvfxcp ashaduzzamansojib67
// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('the coffee server is running successfully..')
});


const uri = "mongodb+srv://ashaduzzamansojib67:dhLr5bvmallvfxcp@cluster0.ugrpd0k.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("coffeesDB").collection("coffees");
        app.post('/coffees', async(req, res) => {
            const coffees = req.body;
            const result = await database.insertOne(coffees);
            res.send(result)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log('the server port running on: ', port)
})