import mongoose from "mongoose";

const creditSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['Mon mariage', 'Des vacances', 'véhicule neuf', 'Naissance', 'Aménagement', 'Acheter de l\'électronique', 'Déménager', 'véhicule d\'occasion', 'appareil d\'occasion'],
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
