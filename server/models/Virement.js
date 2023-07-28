import mongoose from "mongoose";

const virementSchema = new mongoose.Schema({
  refVirement: String,
  clidig: {
    type: String
  },
  agence: {
    type: String
  },
  ncp: String,
  age: String,
  ncpBeneficiaire: String,
  dad: {
    type: Date,
    default: Date.now
  },
  dpe: {
    type: Date,
    default: null
  },
  etat: {
    type: String,
    enum: ['En cours', 'En attente', 'Validé', 'Annulé', 'Info manquantes'],
    default: 'En cours',
  },
  montant: {
    type: Number,
    required: true,
  },
  motifVirement: String,
  
});

const Virement = mongoose.model('Virement', virementSchema);

export default Virement;