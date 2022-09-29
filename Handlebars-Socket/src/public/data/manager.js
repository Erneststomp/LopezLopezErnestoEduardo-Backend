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

export class Messages{

    getAllmessages =async()=>{
        const response =  await fs.promises.readFile('./src/public/data/data2.json','utf-8');
        return JSON.parse(response)
    }    

    SaveMessage = async(newObject1) =>{

            const response =  await fs.promises.readFile('./src/public/data/data2.json','utf-8');
            let data=JSON.parse(response)  
          
                data.push(newObject1);
                await fs.promises.writeFile('./src/public/data/data2.json', JSON.stringify(data, null, '\t'))
            
        
    }
}

