// encapsulate all database opertions 

const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document, (err, result)=>{
        assert.equal(err, null); //globally handle all the errors

        console.log("Inserted " + result.result.n + " documents into the collection" + collection);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) =>{
        assert.equal(err,null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result)=>{
        assert.equal(err, null);

        console.log("removed a document ", document);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {$set: update}, null, (err, result)=>{
        assert.equal(err,null);
        console.log("updated the document with ", update);
        callback(result);
    });

};