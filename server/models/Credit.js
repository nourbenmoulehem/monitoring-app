import mongoose from "mongoose";

const creditSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['Prêt hypothécaire', 'Prêt personnel', 'Prêt automobile', 'Prêt étudiant', 'Prêt aux entreprises', 'Ligne de crédit', 'Crédit revolving', 'Crédit à la consommation', 'Crédit commercial'],
    },
    montant: {
      type: Number,
      required: true,
    },
    dateEmprunt: {
      type: Date,
      required: true,
    },
    dateRemboursement: {
      type: Date,
      required: true,
    },
    compteEmprunteur: {
      type: String,
      required: true,
    },
    compteBeneficiaire: {
      type: String,
    },
    tauxInteret: {
      type: Number,
    },
    dureeMois: {
      type: Number,
    },
    etat: {
      type: String,
      enum: ['En cours', 'En attente', 'Validé', 'Annulé', 'Info manquantes'],
      default: 'En cours',
    },
  },
  { timestamps: true}
);

const Credit = mongoose.model('Credit', creditSchema);

export default Credit;
