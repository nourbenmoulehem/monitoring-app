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
    etatVirement: 'Generated' // Generated (in progress)
  },
  {
    refVirement: 'VR002',
    clidig: '6123456789abcdef1234568',
    agence: '7123456789abcdef1234567',
    ncp: '2345678901',
    age: 'Jane Smith',
    ncpBeneficiaire: '8765432109',
    motifVirement: 'Rent payment',
    etatVirement: 'Executed' // Executed
  },
  {
    refVirement: 'VR003',
    clidig: '6123456789abcdef1234569',
    agence: '8123456789abcdef1234567',
    ncp: '3456789012',
    age: 'Mike Johnson',
    ncpBeneficiaire: '7654321098',
    motifVirement: 'Utility bill',
    etatVirement: 'Rejected' // Rejected
  },
  {
    refVirement: 'VR004',
    clidig: '6123456789abcdef1234570',
    agence: '8123456789abcdef1234567',
    ncp: '4567890123',
    age: 'Emily Davis',
    ncpBeneficiaire: '6543210987',
    motifVirement: 'Loan repayment',
    etatVirement: 'Generated' // Generated (in progress)
  },
  {
    refVirement: 'VR005',
    clidig: '7123456789abcdef1234571',
    agence: '9123456789abcdef1234567',
    ncp: '5678901234',
    age: 'David Wilson',
    ncpBeneficiaire: '5432109876',
    motifVirement: 'Salary deposit',
    etatVirement: 'Generated' // Generated (in progress)
  },
  {
    refVirement: 'VR006',
    clidig: '7123456789abcdef1234572',
    agence: '9123456789abcdef1234567',
    ncp: '6789012345',
    age: 'Sarah Thompson',
    ncpBeneficiaire: '4321098765',
    motifVirement: 'Insurance premium',
    etatVirement: 'Generated' // Generated (in progress)
  },
  {
    refVirement: 'VR007',
    clidig: '8123456789abcdef1234573',
    agence: '7123456789abcdef1234567',
    ncp: '7890123456',
    age: 'Michael Brown',
    ncpBeneficiaire: '3210987654',
    motifVirement: 'Investment fund',
    etatVirement: 'Generated' // Generated (in progress)
  },
  {
    refVirement: 'VR008',
    clidig: '8123456789abcdef1234574',
    agence: '6123456789abcdef1234567',
    ncp: '8901234567',
    age: 'Jessica Lee',
    ncpBeneficiaire: '2109876543',
    motifVirement: 'Credit card payment',
    etatVirement: 'Generated' // Generated (in progress)
  },
  {
    refVirement: 'VR009',
    clidig: '9123456789abcdef1234575',
    agence: '7123456789abcdef1234567',
    ncp: '9012345678',
    age: 'Daniel Miller',
    ncpBeneficiaire: '1098765432',
    motifVirement: 'Charity donation',
    etatVirement: 'Generated' // Generated (in progress)
  },
  {
    refVirement: 'VR010',
    clidig: '9123456789abcdef1234576',
    agence: '9123456789abcdef1234567',
    ncp: '0123456789',
    age: 'Olivia Taylor',
    ncpBeneficiaire: '0987654321',
    motifVirement: 'Travel expenses',
    etatVirement: 'Generated' // Generated (in progress)
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

export const dataCredits = [
  {
    ref_demande: "REF001",
    clidig: "CL001",
    age: "AGE001",
    ncp: "NCP001",
    duree: 12,
    revenu: 5000,
    autre_revenu: 1000,
    nom_prenom_client: "John Doe",
    etat_demande: "In Progress",
    motif_rej: null,
    comp_info: null,
    mat_ver: null,
    date_ver: null,
    montant_demande: 10000,
    etape_demande: "Step 1",
    NAT_CREDIT: "Type A",
    dgnom: "Code A"
  },
  {
    ref_demande: "REF002",
    clidig: "CL002",
    age: "AGE002",
    ncp: "NCP002",
    duree: 24,
    revenu: 8000,
    autre_revenu: 2000,
    nom_prenom_client: "Jane Smith",
    etat_demande: "Pending",
    motif_rej: null,
    comp_info: null,
    mat_ver: null,
    date_ver: null,
    montant_demande: 20000,
    etape_demande: "Step 2",
    NAT_CREDIT: "Type B",
    dgnom: "Code B"
  },
  {
    ref_demande: "REF003",
    clidig: "CL003",
    age: "AGE003",
    ncp: "NCP003",
    duree: 36,
    revenu: 6000,
    autre_revenu: 1500,
    nom_prenom_client: "Michael Johnson",
    etat_demande: "Validated",
    motif_rej: null,
    comp_info: null,
    mat_ver: "MAT001",
    date_ver: "2023-06-15",
    montant_demande: 15000,
    etape_demande: "Step 3",
    NAT_CREDIT: "Type A",
    dgnom: "Code A"
  },
  {
    ref_demande: "REF004",
    clidig: "CL004",
    age: "AGE004",
    ncp: "NCP004",
    duree: 18,
    revenu: 4500,
    autre_revenu: 800,
    nom_prenom_client: "Emily Wilson",
    etat_demande: "Cancelled",
    motif_rej: null,
    comp_info: null,
    mat_ver: null,
    date_ver: null,
    montant_demande: 12000,
    etape_demande: "Step 1",
    NAT_CREDIT: "Type B",
    dgnom: "Code B"
  },
  {
    ref_demande: "REF005",
    clidig: "CL005",
    age: "AGE005",
    ncp: "NCP005",
    duree: 24,
    revenu: 7000,
    autre_revenu: 1200,
    nom_prenom_client: "David Brown",
    etat_demande: "Missing Information",
    motif_rej: null,
    comp_info: null,
    mat_ver: null,
    date_ver: null,
    montant_demande: 18000,
    etape_demande: "Step 2",
    NAT_CREDIT: "Type C",
    dgnom: "Code C"
  },
  {
    ref_demande: "REF006",
    clidig: "CL006",
    age: "AGE006",
    ncp: "NCP006",
    duree: 12,
    revenu: 5500,
    autre_revenu: 1000,
    nom_prenom_client: "Sophia Davis",
    etat_demande: "In Progress",
    motif_rej: null,
    comp_info: null,
    mat_ver: null,
    date_ver: null,
    montant_demande: 10000,
    etape_demande: "Step 1",
    NAT_CREDIT: "Type A",
    dgnom: "Code A"
  },
  {
    ref_demande: "REF007",
    clidig: "CL007",
    age: "AGE007",
    ncp: "NCP007",
    duree: 36,
    revenu: 9000,
    autre_revenu: 2500,
    nom_prenom_client: "Oliver Taylor",
    etat_demande: "Pending",
    motif_rej: null,
    comp_info: null,
    mat_ver: null,
    date_ver: null,
    montant_demande: 25000,
    etape_demande: "Step 3",
    NAT_CREDIT: "Type B",
    dgnom: "Code B"
  },
  {
    ref_demande: "REF008",
    clidig: "CL008",
    age: "AGE008",
    ncp: "NCP008",
    duree: 18,
    revenu: 5000,
    autre_revenu: 1000,
    nom_prenom_client: "Emma Johnson",
    etat_demande: "Validated",
    motif_rej: null,
    comp_info: null,
    mat_ver: "MAT002",
    date_ver: "2023-06-18",
    montant_demande: 14000,
    etape_demande: "Step 2",
    NAT_CREDIT: "Type C",
    dgnom: "Code C"
  },
  {
    ref_demande: "REF009",
    clidig: "CL009",
    age: "AGE009",
    ncp: "NCP009",
    duree: 24,
    revenu: 6500,
    autre_revenu: 1100,
    nom_prenom_client: "Noah Anderson",
    etat_demande: "Cancelled",
    motif_rej: null,
    comp_info: null,
    mat_ver: null,
    date_ver: null,
    montant_demande: 16000,
    etape_demande: "Step 1",
    NAT_CREDIT: "Type A",
    dgnom: "Code A"
  },
  {
    ref_demande: "REF010",
    clidig: "CL010",
    age: "AGE010",
    ncp: "NCP010",
    duree: 12,
    revenu: 4000,
    autre_revenu: 800,
    nom_prenom_client: "Isabella Martinez",
    etat_demande: "Missing Information",
    motif_rej: null,
    comp_info: null,
    mat_ver: null,
    date_ver: null,
    montant_demande: 9000,
    etape_demande: "Step 3",
    NAT_CREDIT: "Type B",
    dgnom: "Code B"
  }
]