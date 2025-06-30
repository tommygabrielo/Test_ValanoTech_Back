const { Avis } = require('../models');
const { Op, Sequelize } = require('sequelize');

exports.getAvisByProduit = async (req, res) => {
  const produitId = req.params.id;
  const { sort, search } = req.query;

  const where = { id_produit: produitId };

  if (search) {
    where.commentaire = { [Op.iLike]: `%${search}%` };
  }

  let order = [['date_avis', 'DESC']];
  if (sort === 'note') {
    order = [['note', 'DESC']];
  }

  try {
    const avis = await Avis.findAll({ where, order });
    res.json(avis);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des avis' });
  }
};

exports.addAvis = async (req, res) => {
  const { note, commentaire, id_user, id_produit } = req.body;

  try {
    const newAvis = await Avis.create({
      note,
      commentaire,
      date_avis: new Date(),
      id_user,
      id_produit,
    });
    res.status(201).json(newAvis);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l’ajout de l’avis' });
  }
};

exports.getDistributionAvis = async (req, res) => {
  try {
    const result = await Avis.findAll({
      attributes: [
        'note',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      group: ['note'],
      order: [['note', 'ASC']],
    });

    const distribution = result.map(item => ({
      note: item.note,
      count: parseInt(item.dataValues.count),
    }));

    res.json(distribution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la distribution des avis' });
  }
};

exports.getMoyenneByProduit = async (req, res) => {
  const produitId = req.params.id;

  try {
    const result = await Avis.findOne({
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('note')), 'average']
      ],
      where: { id_produit: produitId }
    });

    const average = result.dataValues.average ? parseFloat(result.dataValues.average).toFixed(2) : null;

    res.json({ moyenne: average });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du calcul de la moyenne des notes' });
  }
};
