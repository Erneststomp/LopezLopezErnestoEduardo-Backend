import mongoose from 'mongoose'
import config from './config.js'

// //----------* MONGOOSE CONNECTION *----------//
export const initDb = () => {
    try{
        mongoose.set('strictQuery', false);
        return mongoose.connect(
            config.mongo.urlmongo
        )        
        
    }
    catch(error){
    }
}
