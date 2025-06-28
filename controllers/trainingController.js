const { Training } = require('../models');

exports.list = async (req, res) => {
  try {
    const userId = req.session.user.id;
    console.log('📝 [TRAINING.LIST] userId =', userId);

    const trainings = await Training.findAll({
      where: { user_id: userId },
      order: [['date', 'DESC']]
    });
    console.log('📝 [TRAINING.LIST] rows =', trainings.map(t => t.get({ plain: true })));

    res.render('trainings/list', { trainings });
  } catch (err) {
    console.error('❌ [TRAINING.LIST ERROR]', err);
    res.status(500).send('Błąd przy pobieraniu listy treningów');
  }
};

exports.detail = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const training = await Training.findOne({
      where: { id: req.params.id, user_id: userId }
    });
    if (!training) return res.redirect('/trainings');

    res.render('trainings/detail', { training });
  } catch (err) {
    console.error('❌ [TRAINING.DETAIL ERROR]', err);
    res.status(500).send('Błąd przy pobieraniu szczegółów treningu');
  }
};

exports.showForm = (req, res) => {
  res.render('trainings/form', { training: {} });
};

exports.create = async (req, res) => {
  try {
    const userId = req.session.user.id;
    console.log('📝 [TRAINING.CREATE] req.body =', req.body);
    console.log('📝 [TRAINING.CREATE] userId =', userId);

    await Training.create({
      ...req.body,
      user_id: userId
    });

    res.redirect('/trainings');
  } catch (err) {
    console.error('❌ [TRAINING.CREATE ERROR]', err);
    res.status(500).send('Błąd przy zapisywaniu treningu');
  }
};

exports.editForm = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const training = await Training.findOne({
      where: { id: req.params.id, user_id: userId }
    });
    if (!training) return res.redirect('/trainings');

    res.render('trainings/form', { training });
  } catch (err) {
    console.error('❌ [TRAINING.EDITFORM ERROR]', err);
    res.status(500).send('Błąd przy wczytywaniu formularza edycji');
  }
};

exports.update = async (req, res) => {
  try {
    const userId = req.session.user.id;
    console.log('📝 [TRAINING.UPDATE] id =', req.params.id, 'body =', req.body);

    await Training.update(
      { ...req.body },
      { where: { id: req.params.id, user_id: userId } }
    );

    res.redirect('/trainings');
  } catch (err) {
    console.error('❌ [TRAINING.UPDATE ERROR]', err);
    res.status(500).send('Błąd przy aktualizacji treningu');
  }
};

exports.remove = async (req, res) => {
  try {
    const userId = req.session.user.id;
    console.log('📝 [TRAINING.REMOVE] id =', req.params.id);

    await Training.destroy({
      where: { id: req.params.id, user_id: userId }
    });

    res.redirect('/trainings');
  } catch (err) {
    console.error('❌ [TRAINING.REMOVE ERROR]', err);
    res.status(500).send('Błąd przy usuwaniu treningu');
  }
};
