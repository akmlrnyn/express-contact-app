const fs = require('fs');

// membuat direktori folder jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const findContact = (nama) => {
  const contacts = loadContact();
  const result = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return result;
};

// menimpa file contact.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

// menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// menangkap data nama duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

// menghapus data kontak
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
};

// mengubah seluruh data kontak
const updateContacts = (contactBaru) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
};

module.exports = {
  loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts,
};
