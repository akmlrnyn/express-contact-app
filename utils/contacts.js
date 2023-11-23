const fs = require('fs');
const readline = require('readline');

//membuat direktori folder jika belum ada
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
fs.mkdirSync(dirPath);
}

//membuat file jika belum ada
const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const findContact = (nama) => {
    const contacts = loadContact();
    const result = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return result
}

module.exports = { loadContact, findContact }