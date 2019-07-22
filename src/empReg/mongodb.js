//CRUD Operation 
// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient
// const ObjectID=mongodb.ObjectID
const {MongoClient,ObjectID}=require('mongodb')

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

const id=new ObjectID();
console.log(id.id.length);
console.log(id.getTimestamp())
console.log(id.toHexString().length)

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable TO CONNECT Database')
    }
    console.log('Connected Successfully!')
    const db=client.db(databaseName)

    // db.collection('users').insertOne({
    //     Name:'Akshay',
    //     Age:22
    // },(error,result)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to Insert')
    //     }
    //     console.log(result.ops)
    // })
//     db.collection('users').insertMany([{
//         Name:'Akshay',
//         Age:29
//     },
// {
//     Naame:'Akshay',
//     Age:27
// }],(error,result)=>{
//     if(error){
//         return console.log('Unable to Insert')
//     }
//     console.log(result.ops)
// })

// db.collection('users').findOne({Name:'Harshal',Age:88},(error,user)=>{
//     if(error){
//         console.log('Unable to Fetch');
//     }
//     console.log(user)
// })

// db.collection('users').find({Name:'Akshay'}).toArray((error,users)=>{
//     console.log('users')
// })

})