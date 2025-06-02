import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands:false
        }

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`,opts).then(mongoose =>{
            return mongoose;
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB


//quickcart
//Ale@mongodb01
//mongodb+srv://quickcart:Ale@mongodb01@cluster0.qdp8vqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0