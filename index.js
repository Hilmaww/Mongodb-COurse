const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations.js')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {

    //assert.equal(err, null);

    console.log('Connceted to the server');

    const db = client.db(dbname);
    
    dboper.insertDocument(db, {name:"Vadonut", description:"test"}, 'dishes')
        .then((result)=>{
        console.log('Inserted Document: \n', result.ops);

        return dboper.findDocuments(db, 'dishes')
        })
        .then((docs)=>{
            console.log("found the document\n", docs)

            return dboper.updateDocument(db, {"name" : "Vadonut"}, {"description": "updated Testt!"}, 'dishes')
        })
        .then((result)=>{
            console.log('Updated Document:\n', result.result);

            return dboper.findDocuments(db, 'dishes')
        })
        .then((docs)=> {
            console.log("found the updated document\n", docs)
                    
            return db.dropCollection('dishes')
         })
        .then((result)=>{
            console.log('Dropped collection: ', result);

            client.close();
        })
        .catch((err)=> console.log(err));
}).catch((err)=> console.log(err));