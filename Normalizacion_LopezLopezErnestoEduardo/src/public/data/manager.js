import fs from 'fs';



export class Characters{ 

        getAll =async()=>{
            const response =  await fs.promises.readFile('./src/public/data/data3.json','utf-8');
            return JSON.parse(response)
        }    

        SaveCharacter = async(newObject) =>{
            try {
                const response =  await fs.promises.readFile('./src/public/data/data3.json','utf-8');
                let data=JSON.parse(response)  
                if(data.length === 0){
                    newObject.id=1;
                    data.push(newObject);
                    await fs.promises.writeFile('./src/public/data/data3.json', JSON.stringify(data, null, '\t'))
                }else{
                    newObject.id = data[data.length-1].id+1;
                    data.push(newObject);
                    await fs.promises.writeFile('./src/public/data/data3.json', JSON.stringify(data, null, '\t'))
                    console.log(`${newObject.nombre} Fue registrado Exitosamente con el ID: ${newObject.id}`) 
                }
            } catch (error) {
                console.log('No se pudo escribir: ' + error)
            }
        }

}

import KnexContainer from '../../options/myknex/My_knex.js';
import config1 from '../../options/sqlLite3.js'
let database1=new KnexContainer(config1,'messages')


export class Messages{


    SaveMessage = async(newObject1) =>{

            const response =  await fs.promises.readFile('./src/public/data/data2.json','utf-8');
            let data=JSON.parse(response)  
          
                data.push(newObject1);
                await fs.promises.writeFile('./src/public/data/data2.json', JSON.stringify(data, null, '\t'))
            
        
    }

    createMessagesTable= async () => {
        try {
          database1 = new KnexContainer(config1, 'messages') 
          await database1.createTable()
        } catch (error) {
          console.log({Server: error})
        }
      }

      getAllMessages= async () => {
        try {
          database1 = new KnexContainer(config1, 'messages') 
          const allMessages = await database1.getAll()
          return allMessages
        } catch (error) {
          console.log({Server: error})
        }
      }

      addNewMessage= async (message) => {
        try {
          database1 = new KnexContainer(config1, 'messages') 
          const prevMessages = await database1.getAll()
          const currentDate = new Date().toLocaleString()
    
          const newMessage = {
            user: message.user,
            date: currentDate,
            message: message.message,
          }
          database1 = new KnexContainer(config1, 'messages')     
          await database1.save(newMessage)
        } catch (error) {
          console.log({Server: error})
        }
      }


}

