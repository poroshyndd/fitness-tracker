const { Training, sequelize } = require('../models');
const { Op } = require('sequelize');

function formatDate(d) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-');
}

exports.overview = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const period = req.query.period || 'week'; 

    let rows;
    let labels = [];
    let counts = [];
    let total = 0;

    if (period === 'all') {
      rows = await Training.findAll({
        where: { user_id: userId },
        attributes: [
          'date',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['date'],
        order: [['date', 'ASC']]
      });
      labels = rows.map(r => r.get('date')); 
      counts = rows.map(r => parseInt(r.get('count'), 10));
      total = counts.reduce((s, x) => s + x, 0);

    } else {
      const today = new Date();
      let startDateObj;
      if (period === 'month') {
        startDateObj = new Date(today);
        startDateObj.setMonth(today.getMonth() - 1);
      } else {
        startDateObj = new Date(today);
        startDateObj.setDate(today.getDate() - 6);
      }

      const endDateObj   = period === 'week' ? today : today; 
      const startDateStr = formatDate(startDateObj);
      const endDateStr   = formatDate(endDateObj);

      console.log(`Progress – date range (${period}):`, startDateStr, '…', endDateStr);

      rows = await Training.findAll({
        where: {
          user_id: userId,
          date: { [Op.between]: [startDateStr, endDateStr] }
        },
        attributes: [
          'date',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['date'],
        order: [['date', 'ASC']]
      });

      for (let d = new Date(startDateObj); d <= endDateObj; d.setDate(d.getDate() + 1)) {
        const ds = formatDate(d);
        labels.push(ds);
        counts.push(0);
      }
      rows.forEach(r => {
        const ds = r.get('date');
        const idx = labels.indexOf(ds);
        if (idx !== -1) counts[idx] = parseInt(r.get('count'), 10);
      });
      total = counts.reduce((s, x) => s + x, 0);
    }

    res.render('progress/overview', {
      labels,
      counts,
      total,
      period
    });
  } catch (err) {
    console.error('Error in overviewProgress:', err);
    res.status(500).send('Wystąpił błąd. Sprawdź konsolę serwera.');
  }
};
