export const agencies = [
  {
    name: "Uccursale du Siège",
    address: "24 Rue Hédi Karray, Centre Urbain Nord",
    city: "Tunis",
    country: "Tunisia",
    phone: "0123456789",
    fax: "9876543210",
    email: "uccursale@example.com",
    manager: "John Smith",
    openingHours: "9:00 AM - 5:00 PM",
    coordinates: {
      latitude: 36.8485,
      longitude: 10.1876,
    },
  },
  {
    name: "Agence Gabes",
    address: "AVENUE HABIB BOURGUIBA GABES 6000",
    city: "Gabes",
    country: "Tunisia",
    phone: "0123456789",
    fax: "9876543210",
    email: "agencegabes@example.com",
    manager: "Jane Johnson",
    openingHours: "8:00 AM - 4:00 PM",
    coordinates: {
      latitude: 33.8906,
      longitude: 10.0974,
    },
  },
  {
    name: "Agence Tataouine",
    address: "21, AVENUE FARHAT HACHED",
    city: "Tataouine",
    country: "Tunisia",
    phone: "0123456789",
    fax: "9876543210",
    email: "agencetataouine@example.com",
    manager: "Michael Davis",
    openingHours: "8:30 AM - 4:30 PM",
    coordinates: {
      latitude: 32.9317,
      longitude: 10.4515,
    },
  },
  {
    name: "Agence Tozeur",
    address: "AVENUE HABIB BOURGUIBA",
    city: "Tozeur",
    country: "Tunisia",
    phone: "0123456789",
    fax: "9876543210",
    email: "agencetozeur@example.com",
    manager: "Jessica Thompson",
    openingHours: "9:00 AM - 5:00 PM",
    coordinates: {
      latitude: 33.9249,
      longitude: 8.1339,
    },
  },
  {
    name: "Agence Sidi Bouzid",
    address: "AVENUE FARHAT HACHED",
    city: "Sidi Bouzid",
    country: "Tunisia",
    phone: "0123456789",
    fax: "9876543210",
    email: "agencesidibouzid@example.com",
    manager: "William Miller",
    openingHours: "8:00 AM - 4:00 PM",
    coordinates: {
      latitude: 35.0417,
      longitude: 9.4942,
    },
  },
  {
    name: "Agence Metlaoui",
    address: "6, PLACE 2 MARS 1934 METLAOUI",
    city: "Metlaoui",
    country: "Tunisia",
    phone: "0123456789",
    fax: "9876543210",
    email: "agencemetlaoui@example.com",
    manager: "Olivia Wilson",
    openingHours: "8:30 AM - 4:30 PM",
    coordinates: {
      latitude: 34.3329,
      longitude: 8.4049,
    },
  },
  {
    name: "Agence Mrezga",
    address: "Résidence INES route de Nabeul Hammamet MC 28 face à la clinique les violettes, Mrezga Hammamet",
    city: "Hammamet",
    country: "Tunisia",
    phone: "0123456789",
    fax: "9876543210",
    email: "agencemrezga@example.com",
    manager: "David Anderson",
    openingHours: "9:00 AM - 5:00 PM",
    coordinates: {
      latitude: 36.4021,
      longitude: 10.5911,
    },
  },
  // Add entries for the remaining agencies following the same pattern
  // ...
];

export const sampleVirements = [
  {
    refVirement: 'VR001',
    clidig: '6123456789abcdef1234567', // ID of a client document in the "Client" collection
    agence: '7123456789abcdef1234567', // ID of an agency document in the "Agency" collection
    ncp: '1234567890',
    age: 'John Doe',
    ncpBeneficiaire: '9876543210',
    motifVirement: 'Payment for services',
    etatVirement: 'G' // Generated (in progress)
  },
  {
    refVirement: 'VR002',
    clidig: '6123456789abcdef1234568',
    agence: '7123456789abcdef1234567',
    ncp: '2345678901',
    age: 'Jane Smith',
    ncpBeneficiaire: '8765432109',
    motifVirement: 'Rent payment',
    etatVirement: 'E' // Executed
  },
  {
    refVirement: 'VR003',
    clidig: '6123456789abcdef1234569',
    agence: '8123456789abcdef1234567',
    ncp: '3456789012',
    age: 'Mike Johnson',
    ncpBeneficiaire: '7654321098',
    motifVirement: 'Utility bill',
    etatVirement: 'R' // Rejected
  },
  {
    refVirement: 'VR004',
    clidig: '6123456789abcdef1234570',
    agence: '8123456789abcdef1234567',
    ncp: '4567890123',
    age: 'Emily Davis',
    ncpBeneficiaire: '6543210987',
    motifVirement: 'Loan repayment',
    etatVirement: 'G' // Generated (in progress)
  },
  {
    refVirement: 'VR005',
    clidig: '7123456789abcdef1234571',
    agence: '9123456789abcdef1234567',
    ncp: '5678901234',
    age: 'David Wilson',
    ncpBeneficiaire: '5432109876',
    motifVirement: 'Salary deposit',
    etatVirement: 'G' // Generated (in progress)
  },
  {
    refVirement: 'VR006',
    clidig: '7123456789abcdef1234572',
    agence: '9123456789abcdef1234567',
    ncp: '6789012345',
    age: 'Sarah Thompson',
    ncpBeneficiaire: '4321098765',
    motifVirement: 'Insurance premium',
    etatVirement: 'G' // Generated (in progress)
  },
  {
    refVirement: 'VR007',
    clidig: '8123456789abcdef1234573',
    agence: '7123456789abcdef1234567',
    ncp: '7890123456',
    age: 'Michael Brown',
    ncpBeneficiaire: '3210987654',
    motifVirement: 'Investment fund',
    etatVirement: 'G' // Generated (in progress)
  },
  {
    refVirement: 'VR008',
    clidig: '8123456789abcdef1234574',
    agence: '6123456789abcdef1234567',
    ncp: '8901234567',
    age: 'Jessica Lee',
    ncpBeneficiaire: '2109876543',
    motifVirement: 'Credit card payment',
    etatVirement: 'G' // Generated (in progress)
  },
  {
    refVirement: 'VR009',
    clidig: '9123456789abcdef1234575',
    agence: '7123456789abcdef1234567',
    ncp: '9012345678',
    age: 'Daniel Miller',
    ncpBeneficiaire: '1098765432',
    motifVirement: 'Charity donation',
    etatVirement: 'G' // Generated (in progress)
  },
  {
    refVirement: 'VR010',
    clidig: '9123456789abcdef1234576',
    agence: '9123456789abcdef1234567',
    ncp: '0123456789',
    age: 'Olivia Taylor',
    ncpBeneficiaire: '0987654321',
    motifVirement: 'Travel expenses',
    etatVirement: 'G' // Generated (in progress)
  }
];

export const sampleChequiers = [
  {
    refDemande: 'RD001',
    clidig: '64a427e9fd1cf4c0c6d7db88',  // John doe
    age: '64a427e9fd1cf4c0c6d7db89',  // Jane Smith
    ncp: '1234567890',
    etatDemande: 'en cours',
    dpe: null
  },
  {
    refDemande: 'RD002',
    clidig: '64a427e9fd1cf4c0c6d7db8a',  // Michael Johnson
    age: '64a427e9fd1cf4c0c6d7db8b',  // Emily Davis
    ncp: '2345678901',
    etatDemande: 'validé',
    dpe: new Date('2022-01-15')
  },
  {
    refDemande: 'RD003',
    clidig: '64a427e9fd1cf4c0c6d7db8c',  // Gregor Clegane
    age: '64a427e9fd1cf4c0c6d7db8d',  // Doreah
    ncp: '3456789012',
    etatDemande: 'en cours',
    dpe: null
  },
  {
    refDemande: 'RD004',
    clidig: '64a427e9fd1cf4c0c6d7db8e',  // Meera Reed
    age: '64a427e9fd1cf4c0c6d7db90',  // Kelsey Smith
    ncp: '4567890123',
    etatDemande: 'en cours',
    dpe: null
  },
  {
    refDemande: 'RD005',
    clidig: '64a427e9fd1cf4c0c6d7db91',  // Sansa Stark
    age: '5a9427648b0beebeb6957be1',  // Olly
    ncp: '5678901234',
    etatDemande: 'validé',
    dpe: new Date('2022-03-21')
  },
  {
    refDemande: 'RD006',
    clidig: '64a427e9fd1cf4c0c6d7db92',  // Daenerys Targaryen
    age: '5a9427648b0beebeb6957a88',  // Thomas Morris
    ncp: '6789012345',
    etatDemande: 'en cours',
    dpe: null
  },
  {
    refDemande: 'RD007',
    clidig: '5a9427648b0beebeb6957c7c',  // Christian Williams
    age: '64a427e9fd1cf4c0c6d7db94',  // Yolanda Owen
    ncp: '7890123456',
    etatDemande: 'en cours',
    dpe: null
  },
  {
    refDemande: 'RD008',
    clidig: '64a427e9fd1cf4c0c6d7db93',  // Joffrey Baratheon
    age: '64a427e9fd1cf4c0c6d7db94',  // Stannis Baratheon
    ncp: '8901234567',
    etatDemande: 'validé',
    dpe: new Date('2022-06-15')
  },
  {
    refDemande: 'RD009',
    clidig: '64a427e9fd1cf4c0c6d7db95',  // Olenna Tyrell
    age: '64a427e9fd1cf4c0c6d7db96',  // Podrick Payne
    ncp: '9012345678',
    etatDemande: 'en cours',
    dpe: null
  },
  {
    refDemande: 'RD010',
    clidig: '64a427e9fd1cf4c0c6d7db95',  // Doreah
    age: '64a427e9fd1cf4c0c6d7db97',  // Christopher Robinson
    ncp: '0123456789',
    etatDemande: 'validé',
    dpe: new Date('2022-09-12')
  }
];