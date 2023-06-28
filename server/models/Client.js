import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    prenom: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    nom: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 100,
      unique: true
    },
    cin: {
      type: String,
      required: true,
      max: 100,
      unique: true
    },
    Birthday: {
      type: Date,
      required: true,
    },
    Adress: {
      type: String,
      required: true,
    },
    Gouvernment: {
      type: String,
      required: true,

    },
    ActivitySector: {
      type: String,
      required: true,
    },
    ActivityNature: {
      type: String,
      required: true,
    },
    Profession: {
      type: String,
      required: true,
      max: 100,
      unique: true
    },
    revenue: {
      type: String,
      required: true,
    },
    MembershipType: {
      type: String,
      required: true,
    },
    sexe: {
      type: String,
      required: true,
    },
    flagViso: {
      type: Boolean,
      required: true
    },
    flagSignature: {
      type: Boolean,
      required: true
    },
    flagDigitgoEmail: {
      type: Boolean,
      required: true
    },
    flagDigitgoSMS: {
      type: Boolean,
      required: true
    },
    flagCertificat: {
      type: Boolean,
      required: true
    },
    DAD: {
      type: Date,
      required: true,
      default: null

    },
    
    
  },
  { timestamps: true}
)

const Client = mongoose.model("Client", ClientSchema)
export default Client;