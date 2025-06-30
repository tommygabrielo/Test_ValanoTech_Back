const { Produit } = require('../models');

exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.findAll({
      order: [['id', 'DESC']],
    });;
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduit = async (req, res) => {
  console.log(req.body);
  try {
    const { titre, description, prix, image_url } = req.body;
    const newProduit = await Produit.create({
      titre,
      description,
      prix,
      image_url,
    });
    res.status(201).json(newProduit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduit = async (req, res) => {
  try {
    const { titre, description, prix, image_url } = req.body;
    const produit = await Produit.findByPk(req.params.id);

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    await produit.update({ titre, description, prix, image_url });
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id);

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    await produit.destroy();
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
