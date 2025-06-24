const { User } = require('../models')

exports.showProfile = async (req, res) => {
  const user = await User.findByPk(req.session.user.id)
  res.render('profile/view', { user })
}

exports.updateProfile = async (req, res) => {
  const { name, weight, height, age, goal } = req.body
  await User.update(
    { name, weight, height, age, goal },
    { where: { id: req.session.user.id } }
  )
  res.redirect('/profile')
}
