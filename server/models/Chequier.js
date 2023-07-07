import mongoose from "mongoose";

const chequierSchema = new mongoose.Schema({
  refDemande: String,
  clidig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  age: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  ncp: String,
  dad: {
    type: Date,
    default: Date.now
  },
  etatDemande: {
    type: String,
    enum: ['en cours', 'validé'],
    default: 'en cours'
  },
  dpe: Date
});


const Chequier = mongoose.model("Chequier", chequierSchema);

export default Chequier;