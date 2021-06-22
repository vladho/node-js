const { v4 } = require('uuid')
const { promises: fsPromises } = require('fs')
const path = require('path')

const contactsPath = path.join(__dirname, "db", "contacts.json");


async function listContacts() {
    try {
        const file = await fsPromises.readFile(contactsPath)
        const data = JSON.parse(file)
        console.table(data)
        return data
    } catch (error) {
        throw (error)
    }
}

async function getContactById(contactId) {
    try {
        const file = await fsPromises.readFile(contactsPath)
        const data = JSON.parse(file)
        const getContact = data.filter(el => el.id === contactId)
        console.log(getContact);
        return getContact
    } catch (error) {
        throw (error)
    }

}

async function removeContact(contactId) {
    try {
        const file = await fsPromises.readFile(contactsPath)
        const data = JSON.parse(file)
        const deleteContact = data.filter(el => el.id !== contactId)
        const dataString = JSON.stringify(deleteContact)
        fsPromises.writeFile(contactsPath, dataString)
        console.table(data);
    } catch (error) {
        throw (error)
    }
}

async function addContact(name, email, phone) {
    const file = await fsPromises.readFile(contactsPath)
    const data = JSON.parse(file)
    const newItem = { name, email, phone, id: v4() }
    data.push(newItem)
    const dataString = JSON.stringify(data)
    fsPromises.writeFile(contactsPath, dataString)
    console.table(data)
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}