import knex from 'knex';
import fs from 'fs';

let initialProducts =await fs.promises.readFile('./src/public/data/data3.json','utf-8');

export class SqlClient {
    constructor(config, items) {
        this.knex = knex(config)
        this.items = items
      }
    
      createTable = async() => {
        try {
            let exist= await this.knex.schema.hasTable(this.items)

            if (!exist){
                if (this.items === 'characters') {
                await this.knex.schema.createTable(this.items, (table) => {
                table.increments('id').primary()
                table.string('title', 200).notNullable()
                table.float('price').notNullable()
                table.string('thumbnail', 4000)
              })          
            } 
            else {
                await this.knex.schema.createTable(this.items, (table) => {
                table.increments('id').primary()
                table.string('user', 100).notNullable()
                table.string('date', 50).notNullable()
                table.string('message', 4000).notNullable()
              })
            }
            }
        } catch (error) {
          console.log({Method:'createTable()',Server: error})
        }
      }


      save= async(object) =>{
        try {
          return this.knex(this.items).insert(object)
                  .then(()=> console.log({Method:'save= async(object) ',Description:`Table ${this.items} insert successfully`}))
                  .catch(error => console.log({Method:'save= async(object) ',Server: error}))
                  .finally(()=> this.knex.destroy());        
        } catch (error) {
          console.log({Method:'save= async(object) ',Server: error})
        }
      }

      getAll= async()=> {
        try {
          return this.knex(this.items).select('*')
                  .then((result)=> {
                      console.log({Method:'getAll()',Description:`Table ${this.items} select successfully`})
                      return result
                  })
                  .catch(error => {
                    console.log({Method:'getAll()',Server: error})
                    return []
                  })
                  .finally(()=> this.knex.destroy());
        } catch (error) {
          console.log({Method:'getAll()',Server: error})
        }
      }

      createInitialProducts = async() => {
        try {
            console.log('hasta aqui todo bien')
            console.log(this.items)
            console.log(initialProducts)
            await this.knex(this.items).insert(initialProducts)
            console.log('aqui ya no')
                    .then(()=> console.log({Method:'createinitialproducts= async(object) ',Description:`Table ${this.items} insert successfully`}))
                    .catch(error => console.log({Method:'createinitialproducts= async(object) ',Server: error}))
                    .finally(()=> this.knex.destroy());        
          } catch (error) {
            console.log({Method:'createinitialproducts= async(object) ',Server: error})
          }
      }
 1
      close() {
        this.knex.destroy()
          .then(()=> console.log({Method:'close()',Description:`destroy() connection for Table ${this.items} successfully`}))
      }



  }

export default SqlClient;