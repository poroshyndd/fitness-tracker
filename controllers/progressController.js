const { Training, sequelize } = require('../models')
const { Op } = require('sequelize')

exports.overview = async (req, res) => {
  const userId = req.session.user.id
  const today = new Date()
  const weekAgo = new Date(); weekAgo.setDate(today.getDate() - 6)

  const rows = await Training.findAll({
    where: {
      user_id: userId,
      date: { [Op.between]: [weekAgo, today] }
    },
    attributes: [
      'date',
      [sequelize.fn('COUNT', sequelize.col('id')), 'count']
    ],
    group: ['date'],
    order: [['date', 'ASC']]
  })

  const labels = [], countsMap = {}
  for (let d = new Date(weekAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0,10)
    labels.push(key); countsMap[key] = 0
  }
  rows.forEach(r => {
    const key = r.date.toISOString().slice(0,10)
    countsMap[key] = parseInt(r.get('count'), 10)
  })
  const counts = labels.map(d => countsMap[d])
  const total  = counts.reduce((s, x) => s + x, 0)

  res.render('progress/overview', { labels, counts, total })
}
