import Agence from '../models/Agence.js'


export const getAllAgencies = async (req, res) =>{
  try {
    const agencies = await Agence.find();
    res.status(200).json(agencies);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  
  
}

export default getAllAgencies;