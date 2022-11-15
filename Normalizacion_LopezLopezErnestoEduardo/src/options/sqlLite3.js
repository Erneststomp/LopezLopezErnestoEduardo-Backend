export const sqliteOptions ={
    client:'sqlite3',
    connection:{
        filename: './src/options/db/eCommerce.sqlite'
    },
    useNullAsDefault:true
}

export default sqliteOptions;
