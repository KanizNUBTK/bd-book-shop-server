const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors=require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wvpgl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//function
async function run(){
    try{
        await client.connect();
        console.log('database connected');
        const database = client.db('onlineBookShop');
        const bookCollection = database.collection('books');
        const clientCollection = database.collection('client');

        //console.log(book);
         //GET product API
         app.get('/books',async(req,res)=>{
         // console.log(req.query);
          const cursor = bookCollection.find({});
          const books = await cursor.toArray(); 
          //console.log(books); 
          res.send(books);
      });

      //use post to get data by keys
      app.post('books/byKeys',async (req,res)=>{
          //console.log(req.body);
          const keys = req.body;
          const query = {key:{$in:keys}};
          const users = await productCollection.find(query).toArray();
          res.send(products);

      });

      //ADD orders API
      app.post('/orders', async (req,res)=>{
          const order = req.body;
          const result = await clientCollection.insertOne(order);
          //console.log('order',order);
          res.json(result);
      })
    }
    finally{
        //await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello bd book delivery shop..');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})