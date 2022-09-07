const fs = require('fs');
txtnuevo='./data.txt';
let compribacion=0;

    const getCharacters = async ()=>{
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character`)
            const data = await response.json();
            await fs.promises.writeFile('data.txt',JSON.stringify(data,null,'\t'))
            console.log(data.results[0].name); 
            setTimeout(()=>{
                Edition()
            },500)

        } catch (error) {
            console.log(error)
            console.log('El No se ha podido descargar el archivo desde la API, se procedera a leer los datos desde el TXT de respaldo')
            getCharacters2()
            
        }
    }


    let getCharacters2 = async ()=>{
        try {
            const response =  await fs.promises.readFile('./data.txt','utf-8');
            let data=JSON.parse(response)
            setTimeout(()=>{
                Edition()
            },500)
        } catch (error) {
            console.log(error)
            console.log('El No se ha podido leer los archivos, intente mas tarde o notifiquenos')
        }
    }

setTimeout(()=>{
    getCharacters()
},500)


function Edition(){
    //Caracter que se agregara de forma automatica
    let NewCharacter = {
        nombre: 'Evil Morty',
        especie: 'Evil Human',
        estado: 'Alive',

    }

    let modifycharacters= new Characters()
    setTimeout(()=>{
        modifycharacters.getAll()
    },10)

    setTimeout(()=>{
        modifycharacters.SaveCharacter(NewCharacter)
    },1000)
    setTimeout(()=>{
        modifycharacters.getById(333)
        modifycharacters.getById(6)
    },2000)
    setTimeout(()=>{
        modifycharacters.deleteById(5)
    },3000)
    setTimeout(()=>{
        modifycharacters.deleteAll()
    },5000)

}
class Characters{ 
    getAll =async()=>{
        const response =  await fs.promises.readFile('./data.txt','utf-8');
        let data=JSON.parse(response)
        let datospersonajes=[]
        for(let i=0; i<data.results.length;i++){
            datospersonajes[i]={
                id:data.results[i].id,
                nombre:data.results[i].name,
                estado:data.results[i].status,
                especie: data.results[i].species
            }
        }
        await fs.promises.writeFile('data2.txt', JSON.stringify(datospersonajes, null, '\t'))
        console.log(datospersonajes)

    }
    
    SaveCharacter = async(NewCharacter) =>{
        try {
            const response =  await fs.promises.readFile('./data2.txt','utf-8');
            let data=JSON.parse(response)

            if(data.length === 0){
                NewCharacter.id=1;
                data.push(NewCharacter);
                await fs.promises.writeFile('data3.txt', JSON.stringify(data, null, '\t'))
            }else{
                NewCharacter.id = data[data.length-1].id+1;
                data.push(NewCharacter);
                await fs.promises.writeFile('data3.txt', JSON.stringify(data, null, '\t'))
                console.log(`${NewCharacter.nombre} Fue registrado Exitosamente con el ID: ${NewCharacter.id}`)
            }
        } catch (error) {
            console.log('No se pudo escribir: ' + error)
        }
    }

    getById =async(id)=>{
        try {
            const response =  await fs.promises.readFile('./data3.txt','utf-8');
            let data=JSON.parse(response)
            console.log(data)
                if(data[id-1]!= null||data[id-1]!= undefined){ 
                    console.log(`El personaje ${id} es ${data[id-1].nombre}`)
                }else{
                    console.log(`No se encontro al personaje ${id}`)
                }
            
        } catch (error) {
            console.log('No se pudo buscar: ' + error)
        }
    }

    deleteById = async(id) =>{
        try{
            const response =  await fs.promises.readFile('./data3.txt','utf-8');
            let data=JSON.parse(response) 
            data.splice(id-1,1)
            await fs.promises.writeFile('data4.txt', JSON.stringify(data[id], null, '\t'))
            console.log(`El personaje ${id} fue eliminado correctamente`)
            console.log(data)
        }catch(error){
            console.log('No se puedo eliminar: ', error)
        }
    }

    deleteAll = async() =>{
        try{
            const response =  await fs.promises.readFile('./data3.txt','utf-8');
            let data=JSON.parse(response) 
            data.splice(0,data.length)
            await fs.promises.writeFile('data4.txt', JSON.stringify(data, null, '\t'))
            console.log(`Todos los personajes fueron eliminados (en el ultimo archivo)`)
            console.log(data)
            // setTimeout(()=>{
            //     fs.unlink('./data3.txt',error =>{
            //         if (error){
            //             console.log('hubo un error')
            //         }else{
            //             console.log('Eliminado')
            //         }
            //     })
            // },1000)
            // setTimeout(()=>{
            //     fs.unlink('./data2.txt',error =>{
            //         if (error){
            //             console.log('hubo un error')
            //         }else{
            //             console.log('Eliminado')
            //         }
            //     })
            // },1000)
            // setTimeout(()=>{
            //     fs.unlink('./data4.txt',error =>{
            //         if (error){
            //             console.log('hubo un error')
            //         }else{
            //             console.log('Eliminado')
            //         }
            //     })
            // },1000)
        }catch(error){
            console.log('No se puedo eliminar: ', error)
        }
    }
}
