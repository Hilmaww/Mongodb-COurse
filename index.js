const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations.js')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err,client) => {

    assert.equal(err,null);

    console.log('Connceted to the server');

    const db = client.db(dbname);
    
    dboper.insertDocument(db, {"name":"Vadonut", "description":"test"}, 'dishes', (result)=>{
        console.log('Inserted Document: \n'+ result.ops);

        dboper.findDocuments(db, 'dishes', (docs)=>{
            console.log("found the document\n", docs)

            dboper.updateDocument(db, {"name" : "Vadonut"}, {"description": "updated Testt!"}, 'dishes', (result)=>{
                console.log('Updated Document:\n', result.result);

                dboper.findDocuments(db, 'dishes', (docs)=>{
                    console.log("found the updated document\n", docs)
                    
                    db.dropCollection('dishes', (result)=>{
                        console.log('Dropped collection: ', result);

                        client.close();
                    });
                });    
            }); 
        });
    });
});