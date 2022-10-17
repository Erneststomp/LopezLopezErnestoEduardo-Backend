import fs from 'fs';

export class Carts{ 

        getAll =async()=>{
            const response =  await fs.promises.readFile('./src/public/data/cart.json','utf-8');
            return JSON.parse(response)
        }    

        SaveCharacter1 = async(allCharacters) =>{
            try {
                let data=allCharacters

                    await fs.promises.writeFile('./src/public/data/cart.json', JSON.stringify(data, null, '\t'))
                    console.log(`Fue registrado Exitosamente  `)
                
            } catch (error) {
                console.log('No se pudo escribir: ' + error)
            }
        }

        
}

