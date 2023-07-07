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
  motifVirement: String,
  etatVirement: {
    type: String,
    enum: ['I', 'G', 'E', 'R'],
    default: 'I'
  }
});

const Virement = mongoose.model('Virement', virementSchema);

export default Virement;