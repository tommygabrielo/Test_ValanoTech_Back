const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const user = await Utilisateur.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const passwordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!passwordValid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      nom: user.nom,
      role: user.role,
      id: user.id,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
