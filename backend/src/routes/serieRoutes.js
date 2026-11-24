const express = require('express');
const router = express.Router();
const controller = require('../controllers/serieController');

router.get('/', controller.listarSeries);
router.post('/', controller.criarSerie);
router.put('/:id', controller.atualizarSerie);
router.patch('/:id/status', controller.atualizarStatus);
router.delete('/:id', controller.deletarSerie);

module.exports = router;