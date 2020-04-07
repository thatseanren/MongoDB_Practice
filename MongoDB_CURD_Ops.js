/* mongod --dbpath=/Users/rensiyang/Documents/data/db */
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017'

const chalk = require('chalk')

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const dbName = 'MongoDB_1';

client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server")

    const db = client.db(dbName);
    console.log(chalk.red("Performing ") + "insertDocuments into " + chalk.blue(url + `${db}`))
    console.log(db)
    const collection = db.collection('myProgress')
    collection.insertOne({
        algorithm: {
             name: 'ThreeNumSum_', 
             question:'null'
        }, 
        back_end:{
             name: 'MongoDB',
             detail:'storeing Object into db',
             question: 'null',
        },
        project: {
             name: 'progress_logger',
             detail: 'complete plan of progress_logger architect',
             question: 'null' 
        } 
    }).then((result) => {
        console.log(`result returned by insertDocuments():${result}, ${chalk.italic('typeof result')} ${typeof result} \n`)
       client.close()
        
    })
})


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