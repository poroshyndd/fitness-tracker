require('dotenv').config()
const express        = require('express')
const expressLayouts = require('express-ejs-layouts')
const path           = require('path')
const session        = require('express-session')
const { sequelize }  = require('./models')
const routes         = require('./routes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(expressLayouts)
app.set('layout', 'layouts/main')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: false
}))

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null
  next()
})

sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => console.log('Połączono z DB i zsynchronizowano modele'))
  .catch(err => console.error('Błąd DB:', err))

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Serwer działa na porcie ${port}`))
