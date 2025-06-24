const bcrypt = require('bcrypt')
const { User } = require('../models')

exports.showRegister = (req, res) => {
  res.render('auth/register', { title: 'Rejestracja' })
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.redirect('/register')
  }
  const hash = await bcrypt.hash(password, 10)
  await User.create({ name, email, password: hash })
  res.redirect('/login')
}

exports.showLogin = (req, res) => {
  res.render('auth/login', { title: 'Logowanie' })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (!user) return res.redirect('/login')
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.redirect('/login')
  req.session.user = { id: user.id, name: user.name, email: user.email }
  res.redirect('/trainings')
}

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'))
}
