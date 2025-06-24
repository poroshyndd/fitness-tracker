// controllers/calendarController.js
const { Training } = require('../models')
const { Op, Sequelize } = require('sequelize')

exports.overviewCalendar = async (req, res) => {
  // год/месяц из query или текущие
  const now = new Date()
  let year  = parseInt(req.query.year, 10)
  let month = parseInt(req.query.month, 10) - 1
  if (isNaN(year) || isNaN(month)) {
    year  = now.getFullYear()
    month = now.getMonth()
  }

  // для кнопок «предыдущий»/«следующий»
  const prev = new Date(year, month - 1, 1)
  const next = new Date(year, month + 1, 1)

  // границы фильтра
  const startDate = new Date(year, month, 1).toISOString().slice(0,10)
  const endDate   = new Date(year, month + 1, 0).toISOString().slice(0,10)

  // карта date→count
  const rows = await Training.findAll({
    where: {
      user_id: req.session.user.id,
      date: { [Op.between]: [startDate, endDate] }
    },
    attributes: [
      'date',
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
    ],
    group: ['date']
  })

  const countsMap = {}
  rows.forEach(r => {
    // r.date — JS Date, конвертим в YYYY-MM-DD
    const d = r.date.toISOString().slice(0,10)
    countsMap[d] = parseInt(r.get('count'), 10)
  })

  // список тренировок за месяц
  const trainingsList = await Training.findAll({
    where: {
      user_id: req.session.user.id,
      date: { [Op.between]: [startDate, endDate] }
    },
    order: [['date','ASC'], ['id','ASC']]
  })

  // параметры для рендера
  res.render('calendar/overview', {
    year, month, daysInMonth: new Date(year, month+1,0).getDate(),
    firstWeekday: new Date(year, month,1).getDay(),
    countsMap, trainingsList,
    prevYear: prev.getFullYear(), prevMonth: prev.getMonth()+1,
    nextYear: next.getFullYear(), nextMonth: next.getMonth()+1
  })
}
