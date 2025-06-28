const { Training } = require('../models');
const { Op, Sequelize } = require('sequelize');

exports.overviewCalendar = async (req, res) => {
  try {
    const now = new Date();
    let year  = parseInt(req.query.year, 10);
    let month = parseInt(req.query.month, 10) - 1;
    if (isNaN(year) || isNaN(month)) {
      year  = now.getFullYear();
      month = now.getMonth();
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const mm          = String(month + 1).padStart(2, '0');
    const startDate   = `${year}-${mm}-01`;
    const endDate     = `${year}-${mm}-${String(daysInMonth).padStart(2,'0')}`;

    console.log('Calendar – date range:', startDate, '…', endDate);

    const rows = await Training.findAll({
      where: {
        user_id: req.session.user.id,
        date:    { [Op.between]: [startDate, endDate] }
      },
      attributes: [
        'date',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['date']
    });
    console.log('Calendar – raw counts rows:', rows.map(r => r.get({ plain: true })));

    const countsMap = {};
    rows.forEach(r => {
      const d = r.get('date');                 
      countsMap[d] = parseInt(r.get('count'), 10);
    });
    console.log('Calendar – countsMap:', countsMap);

    const trainingsList = await Training.findAll({
      where: {
        user_id: req.session.user.id,
        date:    { [Op.between]: [startDate, endDate] }
      },
      order: [['date','ASC'], ['id','ASC']]
    });
    console.log('Calendar – trainingsList:', trainingsList.map(t => t.get({ plain: true })));

    res.render('calendar/overview', {
      year,
      month,
      daysInMonth,
      firstWeekday: new Date(year, month, 1).getDay(),
      countsMap,
      trainingsList,
      prevYear:  new Date(year, month - 1, 1).getFullYear(),
      prevMonth: new Date(year, month - 1, 1).getMonth() + 1,
      nextYear:  new Date(year, month + 1, 1).getFullYear(),
      nextMonth: new Date(year, month + 1, 1).getMonth() + 1
    });
  } catch (err) {
    console.error('Error in overviewCalendar:', err);
    res.status(500).send('Wystąpił błąd. Sprawdź konsolę serwera.');
  }
};
