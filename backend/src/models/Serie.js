const mongoose = require('mongoose');

const serieSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  franquia: { type: String, required: true },
  tipo: { type: String, enum: ['Zerável', 'Inzerável'], default: 'Zerável' },
  status: { type: String, enum: ['Em Espera', 'Gravando', 'Finalizada'], default: 'Em Espera' },
  gravador: { type: String, required: true },
  coplayers: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Serie', serieSchema);