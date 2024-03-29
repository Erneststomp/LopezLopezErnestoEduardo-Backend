//----------* IMPORTS *----------//
import admin from 'firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'
import serviceAccount from '../../firestore.json'assert{type:'json'}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://backend-segundaentrega-2a65d.firebaseio.com'
})
const db = admin.firestore()
console.log('Firestore is connected!')

class FirebaseContainer {
    constructor(collectionName) {
    this.query = db.collection(collectionName)
}

async getAll() {
try {
    const querySnapshot = await this.query.get()
    const docs = querySnapshot.docs
    console.log(docs)
    return docs
} catch (error) {
    throw new Error(`Error getting all items: ${error}`)
}
}

async getById(id) {
try {
    const doc = this.query.doc(id.toString())
    const docFound = await doc.get()
    const docData = docFound.data()
    return docData
} catch (error) {
    throw new Error(`Error getting item: ${error}`)
}
}

async addItem(object) {
try {
    const { id, ...remainingObject } = object
    let doc = this.query.doc(id.toString())
    await doc.create({object})
} catch (error) {
    throw new Error(`Error adding item: ${error}`)
}
}

async editById(object, id) {
try {
    console.log('object')
    console.log(object)
    console.log('id')
    console.log(id)
    const doc = this.query.doc(id.toString())
    console.log('doc')
    console.log(doc)
    await doc.update(object)
} catch (error) {
    throw new Error(`Error editing item: ${error}`)
}
}

async deleteById(id) {
try {
    const doc = this.query.doc(id.toString())
    const docFound = await doc.get()
    const docData = docFound.data()
    if (docData) {
    await doc.delete()
    return true
    } else {
    return false
    }
} catch (error) {
    throw new Error(`Error deleting item: ${error}`)
}
}

async deleteAll() {
try {
    const docs = await this.getAll()
    const ids = docs.map((doc) => doc.id)
    const promises = ids.map((id) => this.deleteById(id))
    const results = await Promise.allSettled(promises)
    const errors = results.filter((result) => result.status == 'rejected')
    if (errors.length > 0) {
    throw new Error('Removal was not complete. Try again.')
    }
} catch (error) {
    throw new Error(`Error deleting all items: ${error}`)
}
}

async addItemInto(containerId, object) {
try {
    await this.query
    .doc(containerId.toString())
    .update('productos', FieldValue.arrayUnion(object), { merge: true })
} catch (error) {
    throw new Error(`Error adding item into: ${error}`)
}
}

async removeItemFrom(containerId, objectId) {
try {
    await this.query
    .doc(containerId.toString())
    .update('productos', FieldValue.arrayRemove(objectId.toString()))
} catch (error) {
    throw new Error(`Error removing item from: ${error}`)
}
}

async emptyContainer(containerId) {
try {
    this.query.get(containerId).then((res) => {
    res.forEach((element) => {
        element.ref.delete()
    })
    })
} catch (error) {
    throw new Error(`Error removing all items from: ${error}`)
}
}

async disconnect() {}
}

//----------* EXPORTS CLASS *----------//
export default FirebaseContainer
