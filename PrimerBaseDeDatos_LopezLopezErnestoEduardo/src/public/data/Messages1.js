import KnexContainer from '../../options/myknex/My_knex.js';
import config from '../../options/sqlLite3.js'
let database=new KnexContainer(config,'messages')

const Messages ={

    createMessagesTable: async () => {
        try {
          database = new KnexContainer(config, 'messages') 
          await database.createTable()
        } catch (error) {
          console.log({Server: error})
        }
      }

      ,  
  getAllMessages: async () => {
    try {
      database = new KnexContainer(config, 'messages') 
      const allMessages = await database.getAll()
      return allMessages
    } catch (error) {
      console.log({Server: error})
    }
  },

  addNewMessage: async (message) => {
    try {
      database = new KnexContainer(config, 'messages') 
      const prevMessages = await database.getAll()
      const currentDate = new Date().toLocaleString()
      const newMessage = {
        user: message.user,
        date: currentDate,
        message: message.message,
      }
      database = new KnexContainer(config, 'messages')     
      await database.save(newMessage)
    } catch (error) {
      console.log({Server: error})
    }
  },


}
export default Messages

