import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    // prenom: {
    //   type: String,
    //   required: true,
    //   min: 2,
    //   max: 100,
    // },
    // nom: {
    //   type: String,
    //   required: true,
    //   min: 2,
    //   max: 100,
    // },
    name : {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    phoneNumber: String,
    email: {
      type: String,
      required: true,
      max: 100,
      unique: true
    },
    // cin: {
    //   type: String,
    //   required: true,
    //   max: 100,
    //   unique: true
    // },
    Birthday: {
      type: Date,
      required: true,
    },
    Adress: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
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
      type: String,
      required: true
    },
    flagSignature: {
      type: String,
      required: true
    },
    flagDigitgoEmail: {
      type: String,
      required: true
    },
    flagDigitgoSMS: {
      type: String,
      required: true
    },
    flagCertificat: {
      type: String,
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

const Client = mongoose.model("Client", ClientSchema);
export default Client;