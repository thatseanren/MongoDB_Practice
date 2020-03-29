var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/db'

const chalk = require('chalk')

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const dbName = 'db';

client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server")

    const db = client.db(dbName);
    console.log( chalk.red("Performing ") + "insertDocuments into " + chalk.blue(url+'/collection'))
    insertDocuments(db, (result) => {
        console.log(`result returned by insertDocuments():${result}, ${chalk.italic('typeof result')} ${typeof result} \n`)
        updateDocuments(db,()=>{client.close()})
        
    })
})

function updateDocuments(db, cb) {
    const collection = db.collection('documents');

    collection.updateOne({ a: 2 }, { $set: { b: 1 } }, function (err, result) {
        assert.equal(null, err);
        assert.equal(0, result.result.n);
        console.log("Updated the documents with field {a:2} ")
        cb(result)
    })  
}
function insertDocuments (db, callback) {
    const collection = db.collection('documents')
    collection.insertMany([
        { a: 1 }, { b: 2 }, { c: 3 }
    ], function (err, result) {
        assert.equal(err, null)
        assert.equal(3, result.result.n)
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection")
        callback(result)
    })
}

{
    var Schema = mongoose.Schema;

    var hostSchema = new Schema({
        ip: String,
        key: String,
        create_date: { type: Date, default: Date.now },
        host_username: String
    });

    var host = mongoose.model('host', hostSchema)

    function add(data) {
        const host1 = new host(data);
        return host1.save()
    }

    add({
        "ip": "167.71.111.161",
        "key": "~/.ssh/EXPRESS_",
        "host_username": "root",
    })
}