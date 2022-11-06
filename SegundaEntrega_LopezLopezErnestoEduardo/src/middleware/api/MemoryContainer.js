import cartsJSONFile from '../../public/data/carts.json' assert {type:"json"}
import productsJSONFile from '../../public/data/products.json' assert {type:"json"}

export class MemoryContainer {
    constructor() {
        this.elements = []
    }

    getPopulate = async(JSONFileName) =>{
        switch (JSONFileName) {    
            case 'carts':
                this.elements = cartsJSONFile
                break;
            case 'products':
                this.elements = productsJSONFile
                break;   
        }             
    }
    
    getById = async (id) =>{
        try {
        const itemFound = this.elements.find((item) => item.id === Number(id))
        return itemFound

        } catch (error) {
            console.warn({class:`class MemoryContainer`, method:`getById= async(id)`,description:error})
            throw new Error(error);
        }
    }

    getAll = async()=> {
        try {
            return [...this.elements]
        } catch (error) {
            console.warn({class:`class MemoryContainer`, method:`getAll= async()`,description:error})
            throw new Error(error);
        }        
    }

    addItem = async(object) => {
        try {
            this.elements.push(object)
            return [...this.elements]
        } catch (error) {
            console.warn({class:`class MemoryContainer`, method:`addItem= async(object)`,description:error})
            throw new Error(error);
        }   
    }

    editById = async(object) => {
        try{
            this.elements = this.elements.map((item) => (item.id !== object.id ? item : object))
            return [...this.elements]
        } catch (error) {
            console.warn({class:`class MemoryContainer`, method:`editById= async(object) `,description:error})
            throw new Error(error);
        }  
        
    }

    deleteById = async(id) => {
        try{
            const filteredItemList = this.elements.filter((item) => item.id !== Number(id))
            if (JSON.stringify(this.elements) === JSON.stringify(filteredItemList)) {
            return false
            } else {
            this.elements = filteredItemList
            return true
        }
        } catch (error) {
            console.warn({class:`class MemoryContainer`, method:`deleteById= async(idNumber)`,description:error})
            throw new Error(error);
        }
    }

    deleteAll = async() => {
        try{        
            this.elements = []
        } catch (error) {
            console.warn({class:`class MemoryContainer`, method:`deleteAll= async()`,description:error})
            throw new Error(error);
        }
    }
}


export default MemoryContainer
