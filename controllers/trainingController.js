const { Training } = require('../models')

exports.list = async (req, res) => {
  const trainings = await Training.findAll({ order: [['date', 'DESC']] })
  res.render('trainings/list', { trainings })
}

exports.detail = async (req, res) => {
  const training = await Training.findByPk(req.params.id)
  if (!training) {
    return res.redirect('/trainings')
  }
  res.render('trainings/detail', { training })
}

exports.showForm = (req, res) => {
  res.render('trainings/form', { training: {} })
}

exports.create = async (req, res) => {
  await Training.create(req.body)
  res.redirect('/trainings')
}

exports.editForm = async (req, res) => {
  const training = await Training.findByPk(req.params.id)
  if (!training) {
    return res.redirect('/trainings')
  }
  res.render('trainings/form', { training })
}

exports.update = async (req, res) => {
  await Training.update(req.body, { where: { id: req.params.id } })
  res.redirect('/trainings')
}

exports.remove = async (req, res) => {
  await Training.destroy({ where: { id: req.params.id } })
  res.redirect('/trainings')
}
