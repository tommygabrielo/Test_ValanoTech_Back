const express = require('express');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const router = express.Router();
const produitController = require('../controllers/produitController');
const avisController = require('../controllers/avisController');

router.get('/', produitController.getAllProduits);
router.get('/:id', produitController.getProduitById);
router.post('/',produitController.createProduit);
router.put('/:id', produitController.updateProduit);
router.delete('/:id', produitController.deleteProduit);
router.get('/produits/:id/avis', avisController.getAvisByProduit);
router.post('/avis', avisController.addAvis);
router.get('/avis/distribution', avisController.getDistributionAvis);
router.get('/produits/:id/moyenne', avisController.getMoyenneByProduit);

module.exports = router;
