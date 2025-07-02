const { Utilisateur } = require('../models');

exports.createUser = async (req, res) => {
  const { nom, email, mot_de_passe, role } = req.body;

  if (!nom || !mot_de_passe || !email || !role) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  try {
    const newUser = await Utilisateur.create({
      nom,
      email,
      mot_de_passe,
      role,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur création utilisateur', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
