const express           = require('express')
const trainingCtrl     = require('../controllers/trainingController')
const progressCtrl     = require('../controllers/progressController')
const authCtrl         = require('../controllers/authController')
const profileCtrl      = require('../controllers/profileController')
const calendarCtrl     = require('../controllers/calendarController')

const router = express.Router()

// Middleware, чтобы открывать /trainings, /progress и т.д. только для залогиненых
function ensureAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/login')
  next()
}

// AUTH
router.get('/register', authCtrl.showRegister)
router.post('/register', authCtrl.register)
router.get('/login',    authCtrl.showLogin)
router.post('/login',   authCtrl.login)
router.get('/logout',   authCtrl.logout)

// MAIN
router.get('/', (req, res) => res.redirect('/trainings'))

// TRAININGS
router.get('/trainings',           ensureAuth, trainingCtrl.list)
router.get('/trainings/new',       ensureAuth, trainingCtrl.showForm)
router.post('/trainings',          ensureAuth, trainingCtrl.create)
router.get('/trainings/:id/edit',  ensureAuth, trainingCtrl.editForm)
router.get('/trainings/:id',       ensureAuth, trainingCtrl.detail)
router.post('/trainings/:id',      ensureAuth, trainingCtrl.update)
router.post('/trainings/:id/delete', ensureAuth, trainingCtrl.remove)

// PROGRESS — вот этот маршрут
router.get('/progress', ensureAuth, progressCtrl.overview)

// PROFILE & CALENDAR
router.get('/profile',  ensureAuth, profileCtrl.showProfile)
router.post('/profile', ensureAuth, profileCtrl.updateProfile)

router.get('/calendar', ensureAuth, calendarCtrl.overviewCalendar)

module.exports = router
