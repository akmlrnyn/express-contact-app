const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const port = 3000;
const { loadContact, findContact } = require('./utils/contacts')

//gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayout);


app.get('/', (req, res) => {
    // res.sendFile('./index.html', { root: __dirname });
    const students = [
        {
            name: 'Akmal Faiq',
            email: 'akmalranyan@gmail.com',
        },
        {
            name: 'Faiq Akmal',
            email: 'faaiw@gmail.com',
        },
        {
            name: 'Ranyan',
            email: 'ranyan@gmail.com',
        }
    ]
    res.render('index', { layout: 'layouts/main-layout.ejs', students, nama: 'Akmal', header: 'ExpressJS' })
})

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    // res.sendFile('./contact.html', { root: __dirname });
    res.render('contact', { contacts , layout: 'layouts/main-layout.ejs', nama: 'Akmal', header: 'ExpressJS - Contact Page' })
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    // res.sendFile('./contact.html', { root: __dirname });
    res.render('detail', { contact , layout: 'layouts/main-layout.ejs', nama: 'Akmal', header: 'ExpressJS - Contact Page' });
    return contact
})

app.get('/about', (req, res) => {
    // res.sendFile('./about.html', { root: __dirname });
    res.render('about', { layout: 'layouts/main-layout.ejs', nama: 'Akmal', header: 'ExpressJS - About Page' })
})

app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
})