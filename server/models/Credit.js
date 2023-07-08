import mongoose from "mongoose";

const creditSchema = new mongoose.Schema({
  ref_demande: {
    type: String,
    required: true,
  },
  clidig: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  ncp: {
    type: String,
    required: true,
  },
  duree: {
    type: Number,
    required: true,
  },
  revenu: {
    type: Number,
    required: true,
  },
  autre_revenu: {
    type: Number,
    required: true,
  },
  nom_prenom_client: {
    type: String,
    required: true,
  },
  etat_demande: {
    type: String,
    enum: ['In Progress', 'Pending', 'Validated', 'Cancelled', 'Missing Information'],
    required: true,
  },
  motif_rej: {
    type: String,
    required: false,
  },
  comp_info: {
    type: String,
    required: false,
  },
  mat_ver: {
    type: String,
    required: false,
  },
  date_ver: {
    type: Date,
    required: false,
  },
  montant_demande: {
    type: Number,
    required: true,
  },
  etape_demande: {
    type: String,
    required: true,
  },
  NAT_CREDIT: {
    type: String,
    required: true,
  },
  dgnom: {
    type: String,
    required: true,
  },
},
{ timestamps: true}
);

const Credit = mongoose.model('Credit', creditSchema);

export default Credit;
