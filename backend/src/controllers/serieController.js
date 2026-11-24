const Serie = require('../models/Serie');

exports.listarSeries = async (req, res) => {
  try {
    const series = await Serie.find().sort({ createdAt: -1 });
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.criarSerie = async (req, res) => {
  try {
    const novaSerie = await Serie.create(req.body);
    res.status(201).json(novaSerie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.atualizarSerie = async (req, res) => {
  try {
    const serie = await Serie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!serie) return res.status(404).json({ message: 'Série não encontrada' });
    res.json(serie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.atualizarStatus = async (req, res) => {
  try {
    const serie = await Serie.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!serie) return res.status(404).json({ message: 'Série não encontrada' });
    res.json(serie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletarSerie = async (req, res) => {
  try {
    const serie = await Serie.findByIdAndDelete(req.params.id);
    if (!serie) return res.status(404).json({ message: 'Série não encontrada' });
    res.json({ message: 'Série removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};