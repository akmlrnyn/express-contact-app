const express = require('express');

const app = express();
const expressLayout = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const port = 3000;
const {
  loadContact, findContact, addContact, cekDuplikat,
} = require('./utils/contacts');

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.urlencoded({ extended: true }));

// Konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
  cookie: { maxAge: 6000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

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
    },
  ];
  res.render('index', {
    layout: 'layouts/main-layout.ejs', students, nama: 'Akmal', header: 'ExpressJS',
  });
});

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  // res.sendFile('./contact.html', { root: __dirname });
  res.render('contact', {
    contacts, layout: 'layouts/main-layout.ejs', nama: 'Akmal', header: 'ExpressJS - Contact Page', msg: req.flash('msg'),
  });
});

// Tambah data kontak
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form tambah data',
    layout: 'layouts/main-layout',
  });
});

// Proses data kontak
app.post('/contact', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value);
    if (duplikat) {
      throw new Error('Nama sudah ada');
    }
    return true;
  }),
  check('email', 'Email tidak valid!').isEmail(),
  check('nohp', 'nohp tidak valid!').isMobilePhone('id-ID'),

], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // res.send({ errors: errors.ar ray() });
    res.render('add-contact', {
      title: 'Add Contacts',
      layout: 'layouts/main-layout',
      errors: errors.array(),
    });
  }
  addContact(req.body);
  // Kirimkan Flash Message
  req.flash('msg', 'Data berhasil ditambahkan!');
  res.redirect('/contact');
});

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {
    contact, layout: 'layouts/main-layout.ejs', nama: 'Akmal', header: 'ExpressJS - Contact Page',
  });
  return contact;
});

app.get('/about', (req, res) => {
  // res.sendFile('./about.html', { root: __dirname });
  res.render('about', { layout: 'layouts/main-layout.ejs', nama: 'Akmal', header: 'ExpressJS - About Page' });
});

app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
});
