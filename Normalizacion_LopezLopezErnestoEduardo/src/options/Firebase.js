import FirebaseContainer from './FirebaseContainer.js'

class ProductDAOFirebase extends FirebaseContainer {
    constructor() {
        super('messages')
    }
}

export default ProductDAOFirebase
