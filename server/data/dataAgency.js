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
    refVirement: 'VRM00001',
    clidig: 'CL001',
    agence: 'AG001',
    ncp: 'NC001',
    age: 'AG002',
    ncpBeneficiaire: 'NCB001',
    dad: '2023-07-15',
    dpe: '2023-09-04',
    etat: 'En cours',
    montant: 1000,
    motifVirement: 'Remboursement prêt',
  },
  {
    refVirement: 'VRM00002',
    clidig: 'CL002',
    agence: 'AG003',
    ncp: 'NC002',
    age: 'AG004',
    ncpBeneficiaire: 'NCB002',
    dad: '2023-07-16',
    dpe: '2023-07-17',
    etat: 'Validé',
    montant: 500,
    motifVirement: 'Aide familiale',
  },
  {
    refVirement: 'VRM00003',
    clidig: 'CL003',
    agence: 'AG005',
    ncp: 'NC003',
    age: 'AG006',
    ncpBeneficiaire: 'NCB003',
    dad: '2023-07-18',
    dpe: '2023-09-04',
    etat: 'En attente',
    montant: 2000,
    motifVirement: 'Frais de voyage',
  },
  {
    refVirement: 'VRM00004',
    clidig: 'CL004',
    agence: 'AG007',
    ncp: 'NC004',
    age: 'AG008',
    ncpBeneficiaire: 'NCB004',
    dad: '2023-07-19',
    dpe: '2023-07-20',
    etat: 'Annulé',
    montant: 800,
    motifVirement: 'Achat matériel',
  },
  {
    refVirement: 'VRM00005',
    clidig: 'CL005',
    agence: 'AG009',
    ncp: 'NC005',
    age: 'AG010',
    ncpBeneficiaire: 'NCB005',
    dad: '2023-07-21',
    dpe: '2023-09-04',
    etat: 'En cours',
    montant: 1500,
    motifVirement: 'Paiement facture',
  },
  {
    refVirement: 'VRM00006',
    clidig: 'CL006',
    agence: 'AG011',
    ncp: 'NC006',
    age: 'AG012',
    ncpBeneficiaire: 'NCB006',
    dad: '2023-07-22',
    dpe: '2023-07-23',
    etat: 'Validé',
    montant: 300,
    motifVirement: 'Cadeau anniversaire',
  },
  {
    refVirement: 'VRM00007',
    clidig: 'CL007',
    agence: 'AG013',
    ncp: 'NC007',
    age: 'AG014',
    ncpBeneficiaire: 'NCB007',
    dad: '2023-07-24',
    dpe: '2023-09-04',
    etat: 'En attente',
    montant: 1200,
    motifVirement: 'Frais médicaux',
  },
  {
    refVirement: 'VRM00008',
    clidig: 'CL008',
    agence: 'AG015',
    ncp: 'NC008',
    age: 'AG016',
    ncpBeneficiaire: 'NCB008',
    dad: '2023-07-25',
    dpe: '2023-07-26',
    etat: 'Annulé',
    montant: 200,
    motifVirement: 'Courses alimentaires',
  },
  {
    refVirement: 'VRM00009',
    clidig: 'CL009',
    agence: 'AG017',
    ncp: 'NC009',
    age: 'AG018',
    ncpBeneficiaire: 'NCB009',
    dad: '2023-07-27',
    dpe: '2023-09-04',
    etat: 'En cours',
    montant: 700,
    motifVirement: 'Factures impayées',
  },
  {
    refVirement: 'VRM00010',
    clidig: 'CL010',
    agence: 'AG019',
    ncp: 'NC010',
    age: 'AG020',
    ncpBeneficiaire: 'NCB010',
    dad: '2023-07-28',
    dpe: '2023-07-29',
    etat: 'Validé',
    montant: 1000,
    motifVirement: 'Aide étudiante',
  },
  {
    refVirement: 'VRM00011',
    clidig: 'CL011',
    agence: 'AG021',
    ncp: 'NC011',
    age: 'AG022',
    ncpBeneficiaire: 'NCB011',
    dad: '2023-07-30',
    dpe: '2023-09-04',
    etat: 'En attente',
    montant: 900,
    motifVirement: 'Achat vêtements',
  },
  {
    refVirement: 'VRM00012',
    clidig: 'CL012',
    agence: 'AG023',
    ncp: 'NC012',
    age: 'AG024',
    ncpBeneficiaire: 'NCB012',
    dad: '2023-07-31',
    dpe: '2023-08-01',
    etat: 'Annulé',
    montant: 1800,
    motifVirement: 'Rénovation maison',
  },
  {
    refVirement: 'VRM00013',
    clidig: 'CL013',
    agence: 'AG025',
    ncp: 'NC013',
    age: 'AG026',
    ncpBeneficiaire: 'NCB013',
    dad: '2023-08-02',
    dpe: '2023-09-04',
    etat: 'En cours',
    montant: 600,
    motifVirement: 'Achat livre',
  },
  {
    refVirement: 'VRM00014',
    clidig: 'CL014',
    agence: 'AG027',
    ncp: 'NC014',
    age: 'AG028',
    ncpBeneficiaire: 'NCB014',
    dad: '2023-08-03',
    dpe: '2023-08-04',
    etat: 'Validé',
    montant: 400,
    motifVirement: 'Cadeau mariage',
  },
  {
    refVirement: 'VRM00015',
    clidig: 'CL015',
    agence: 'AG029',
    ncp: 'NC015',
    age: 'AG030',
    ncpBeneficiaire: 'NCB015',
    dad: '2023-08-05',
    dpe: '2023-01-07',
    etat: 'En attente',
    montant: 2500,
    motifVirement: 'Voyage vacances',
  },
  {
    refVirement: 'VRM00016',
    clidig: 'CL016',
    agence: 'AG031',
    ncp: 'NC016',
    age: 'AG032',
    ncpBeneficiaire: 'NCB016',
    dad: '2023-01-10',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 800,
    motifVirement: 'Paiement loyer',
  },
  {
    refVirement: 'VRM00016',
    clidig: 'CL016',
    agence: 'AG031',
    ncp: 'NC016',
    age: 'AG032',
    ncpBeneficiaire: 'NCB016',
    dad: '2023-01-10',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 800,
    motifVirement: 'Paiement loyer',
  },
  {
    refVirement: 'VRM00016',
    clidig: 'CL016',
    agence: 'AG031',
    ncp: 'NC016',
    age: 'AG032',
    ncpBeneficiaire: 'NCB016',
    dad: '2023-01-10',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 800,
    motifVirement: 'Paiement loyer',
  },
  {
    refVirement: 'VRM00016',
    clidig: 'CL016',
    agence: 'AG031',
    ncp: 'NC016',
    age: 'AG032',
    ncpBeneficiaire: 'NCB016',
    dad: '2023-01-10',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 800,
    motifVirement: 'Paiement loyer',
  },
  {
    refVirement: 'VRM00016',
    clidig: 'CL016',
    agence: 'AG031',
    ncp: 'NC016',
    age: 'AG032',
    ncpBeneficiaire: 'NCB016',
    dad: '2023-01-10',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 800,
    motifVirement: 'Paiement loyer',
  },
  {
    refVirement: 'VRM00016',
    clidig: 'CL016',
    agence: 'AG031',
    ncp: 'NC016',
    age: 'AG032',
    ncpBeneficiaire: 'NCB016',
    dad: '2023-01-10',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 800,
    motifVirement: 'Paiement loyer',
  },
  {
    refVirement: 'VRM00016',
    clidig: 'CL016',
    agence: 'AG031',
    ncp: 'NC016',
    age: 'AG032',
    ncpBeneficiaire: 'NCB016',
    dad: '2023-01-10',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 800,
    motifVirement: 'Paiement loyer',
  },
  {
    refVirement: 'VRM00017',
    clidig: 'CL017',
    agence: 'AG033',
    ncp: 'NC017',
    age: 'AG034',
    ncpBeneficiaire: 'NCB017',
    dad: '2023-02-22',
    dpe: '2023-02-23',
    etat: 'Validé',
    montant: 1500,
    motifVirement: 'Achat électroménager',
  },
  {
    refVirement: 'VRM00017',
    clidig: 'CL017',
    agence: 'AG033',
    ncp: 'NC017',
    age: 'AG034',
    ncpBeneficiaire: 'NCB017',
    dad: '2023-02-22',
    dpe: '2023-02-23',
    etat: 'Validé',
    montant: 1500,
    motifVirement: 'Achat électroménager',
  },
  {
    refVirement: 'VRM00017',
    clidig: 'CL017',
    agence: 'AG033',
    ncp: 'NC017',
    age: 'AG034',
    ncpBeneficiaire: 'NCB017',
    dad: '2023-02-22',
    dpe: '2023-02-23',
    etat: 'Validé',
    montant: 1500,
    motifVirement: 'Achat électroménager',
  },
  {
    refVirement: 'VRM00017',
    clidig: 'CL017',
    agence: 'AG033',
    ncp: 'NC017',
    age: 'AG034',
    ncpBeneficiaire: 'NCB017',
    dad: '2023-02-22',
    dpe: '2023-02-23',
    etat: 'Validé',
    montant: 1500,
    motifVirement: 'Achat électroménager',
  },
  {
    refVirement: 'VRM00017',
    clidig: 'CL017',
    agence: 'AG033',
    ncp: 'NC017',
    age: 'AG034',
    ncpBeneficiaire: 'NCB017',
    dad: '2023-02-22',
    dpe: '2023-02-23',
    etat: 'Validé',
    montant: 1500,
    motifVirement: 'Achat électroménager',
  },
  {
    refVirement: 'VRM00017',
    clidig: 'CL017',
    agence: 'AG033',
    ncp: 'NC017',
    age: 'AG034',
    ncpBeneficiaire: 'NCB017',
    dad: '2023-02-22',
    dpe: '2023-02-23',
    etat: 'Validé',
    montant: 1500,
    motifVirement: 'Achat électroménager',
  },
  {
    refVirement: 'VRM00018',
    clidig: 'CL018',
    agence: 'AG035',
    ncp: 'NC018',
    age: 'AG036',
    ncpBeneficiaire: 'NCB018',
    dad: '2023-03-15',
    dpe: '2023-01-07',
    etat: 'En attente',
    montant: 2500,
    motifVirement: 'Frais scolaires',
  },
  {
    refVirement: 'VRM00018',
    clidig: 'CL018',
    agence: 'AG035',
    ncp: 'NC018',
    age: 'AG036',
    ncpBeneficiaire: 'NCB018',
    dad: '2023-03-15',
    dpe: '2023-01-07',
    etat: 'En attente',
    montant: 2500,
    motifVirement: 'Frais scolaires',
  },
  {
    refVirement: 'VRM00018',
    clidig: 'CL018',
    agence: 'AG035',
    ncp: 'NC018',
    age: 'AG036',
    ncpBeneficiaire: 'NCB018',
    dad: '2023-03-15',
    dpe: '2023-01-07',
    etat: 'En attente',
    montant: 2500,
    motifVirement: 'Frais scolaires',
  },
  {
    refVirement: 'VRM00018',
    clidig: 'CL018',
    agence: 'AG035',
    ncp: 'NC018',
    age: 'AG036',
    ncpBeneficiaire: 'NCB018',
    dad: '2023-03-15',
    dpe: '2023-01-07',
    etat: 'En attente',
    montant: 2500,
    motifVirement: 'Frais scolaires',
  },
  {
    refVirement: 'VRM00019',
    clidig: 'CL019',
    agence: 'AG037',
    ncp: 'NC019',
    age: 'AG038',
    ncpBeneficiaire: 'NCB019',
    dad: '2023-04-05',
    dpe: '2023-04-06',
    etat: 'Annulé',
    montant: 500,
    motifVirement: 'Aide parentale',
  },
  {
    refVirement: 'VRM00020',
    clidig: 'CL020',
    agence: 'AG039',
    ncp: 'NC020',
    age: 'AG040',
    ncpBeneficiaire: 'NCB020',
    dad: '2023-05-12',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 1200,
    motifVirement: 'Frais dentaires',
  },
  {
    refVirement: 'VRM00020',
    clidig: 'CL020',
    agence: 'AG039',
    ncp: 'NC020',
    age: 'AG040',
    ncpBeneficiaire: 'NCB020',
    dad: '2023-05-12',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 1200,
    motifVirement: 'Frais dentaires',
  },
  {
    refVirement: 'VRM00020',
    clidig: 'CL020',
    agence: 'AG039',
    ncp: 'NC020',
    age: 'AG040',
    ncpBeneficiaire: 'NCB020',
    dad: '2023-05-12',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 1200,
    motifVirement: 'Frais dentaires',
  },
  {
    refVirement: 'VRM00020',
    clidig: 'CL020',
    agence: 'AG039',
    ncp: 'NC020',
    age: 'AG040',
    ncpBeneficiaire: 'NCB020',
    dad: '2023-05-12',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 1200,
    motifVirement: 'Frais dentaires',
  },
  {
    refVirement: 'VRM00020',
    clidig: 'CL020',
    agence: 'AG039',
    ncp: 'NC020',
    age: 'AG040',
    ncpBeneficiaire: 'NCB020',
    dad: '2023-05-12',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 1200,
    motifVirement: 'Frais dentaires',
  },
  {
    refVirement: 'VRM00020',
    clidig: 'CL020',
    agence: 'AG039',
    ncp: 'NC020',
    age: 'AG040',
    ncpBeneficiaire: 'NCB020',
    dad: '2023-05-12',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 1200,
    motifVirement: 'Frais dentaires',
  },
  {
    refVirement: 'VRM00020',
    clidig: 'CL020',
    agence: 'AG039',
    ncp: 'NC020',
    age: 'AG040',
    ncpBeneficiaire: 'NCB020',
    dad: '2023-05-12',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 1200,
    motifVirement: 'Frais dentaires',
  },
  {
    refVirement: 'VRM00020',
    clidig: 'CL020',
    agence: 'AG039',
    ncp: 'NC020',
    age: 'AG040',
    ncpBeneficiaire: 'NCB020',
    dad: '2023-05-12',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 1200,
    motifVirement: 'Frais dentaires',
  },
  {
    refVirement: 'VRM00020',
    clidig: 'CL020',
    agence: 'AG039',
    ncp: 'NC020',
    age: 'AG040',
    ncpBeneficiaire: 'NCB020',
    dad: '2023-05-12',
    dpe: '2023-01-07',
    etat: 'En cours',
    montant: 1200,
    motifVirement: 'Frais dentaires',
  },
  {
    refVirement: 'VRM00021',
    clidig: 'CL021',
    agence: 'AG041',
    ncp: 'NC021',
    age: 'AG042',
    ncpBeneficiaire: 'NCB021',
    dad: '2023-06-20',
    dpe: '2023-06-21',
    etat: 'Validé',
    montant: 1800,
    motifVirement: 'Achat vélo',
  },
  {
    refVirement: 'VRM00021',
    clidig: 'CL021',
    agence: 'AG041',
    ncp: 'NC021',
    age: 'AG042',
    ncpBeneficiaire: 'NCB021',
    dad: '2023-06-20',
    dpe: '2023-06-21',
    etat: 'Validé',
    montant: 1800,
    motifVirement: 'Achat vélo',
  },
  {
    refVirement: 'VRM00021',
    clidig: 'CL021',
    agence: 'AG041',
    ncp: 'NC021',
    age: 'AG042',
    ncpBeneficiaire: 'NCB021',
    dad: '2023-06-20',
    dpe: '2023-06-21',
    etat: 'Validé',
    montant: 1800,
    motifVirement: 'Achat vélo',
  },
  {
    refVirement: 'VRM00021',
    clidig: 'CL021',
    agence: 'AG041',
    ncp: 'NC021',
    age: 'AG042',
    ncpBeneficiaire: 'NCB021',
    dad: '2023-06-20',
    dpe: '2023-06-21',
    etat: 'Validé',
    montant: 1800,
    motifVirement: 'Achat vélo',
  },{
    refVirement: 'VRM00021',
    clidig: 'CL021',
    agence: 'AG041',
    ncp: 'NC021',
    age: 'AG042',
    ncpBeneficiaire: 'NCB021',
    dad: '2023-06-20',
    dpe: '2023-06-21',
    etat: 'Validé',
    montant: 1800,
    motifVirement: 'Achat vélo',
  },
];


export const sampleChequiers = [
  
  {
    refDemande: 'RD001',
    clidig: '64a427e9fd1cf4c0c6d7db88',  // John doe
    age: '64a427e9fd1cf4c0c6d7db89',  // Jane Smith
    ncp: '1234567890',
    etatDemande: 'en cours',
    dpe: '2023-09-04'
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
    dpe: '2023-09-04'
  },
  {
    refDemande: 'RD004',
    clidig: '64a427e9fd1cf4c0c6d7db8e',  // Meera Reed
    age: '64a427e9fd1cf4c0c6d7db90',  // Kelsey Smith
    ncp: '4567890123',
    etatDemande: 'en cours',
    dpe: '2023-09-04'
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
    dpe: '2023-09-04'
  },
  {
    refDemande: 'RD007',
    clidig: '5a9427648b0beebeb6957c7c',  // Christian Williams
    age: '64a427e9fd1cf4c0c6d7db94',  // Yolanda Owen
    ncp: '7890123456',
    etatDemande: 'en cours',
    dpe: '2023-09-04'
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
    dpe: '2023-09-04'
  },
  {
    refDemande: 'RD010',
    clidig: '64a427e9fd1cf4c0c6d7db95',  // Doreah
    age: '64a427e9fd1cf4c0c6d7db97',  // Christopher Robinson
    ncp: '0123456789',
    etatDemande: 'validé',
    dpe: new Date('2022-09-12')
  },
  {
    refDemande: 'RD011',
    clidig: '64a427e9fd1cf4c0c6d7db98',  // John Doe
    age: '64a427e9fd1cf4c0c6d7db99',  // Jane Smith
    ncp: '1234567890',
    etatDemande: 'validé',
    dpe: new Date('2023-01-05'),
  },
  {
    refDemande: 'RD012',
    clidig: '64a427e9fd1cf4c0c6d7db9a',  // Michael Johnson
    age: '64a427e9fd1cf4c0c6d7db9b',  // Emily Davis
    ncp: '2345678901',
    etatDemande: 'en cours',
    dpe: new Date('2023-01-12'),
  },
  {
    refDemande: 'RD013',
    clidig: '64a427e9fd1cf4c0c6d7db8c',  // Gregor Clegane
    age: '64a427e9fd1cf4c0c6d7db8d',  // Doreah
    ncp: '3456789012',
    etatDemande: 'validé',
    dpe: new Date('2023-01-20'),
  },
  {
    refDemande: 'RD014',
    clidig: '64a427e9fd1cf4c0c6d7db8e',  // Meera Reed
    age: '64a427e9fd1cf4c0c6d7db90',  // Kelsey Smith
    ncp: '4567890123',
    etatDemande: 'en cours',
    dpe: new Date('2023-01-25'),
  },
  {
    refDemande: 'RD015',
    clidig: '64a427e9fd1cf4c0c6d7db91',  // Sansa Stark
    age: '5a9427648b0beebeb6957be1',  // Olly
    ncp: '5678901234',
    etatDemande: 'validé',
    dpe: new Date('2023-01-28'),
  },
  {
    refDemande: 'RD016',
    clidig: '64a427e9fd1cf4c0c6d7dba1',  // Daenerys Targaryen
    age: '5a9427648b0beebeb6957a88',  // Thomas Morris
    ncp: '6789012345',
    etatDemande: 'en cours',
    dpe: new Date('2023-02-10'),
  },
  {
    refDemande: 'RD017',
    clidig: '5a9427648b0beebeb6957c7c',  // Christian Williams
    age: '64a427e9fd1cf4c0c6d7dba3',  // Yolanda Owen
    ncp: '7890123456',
    etatDemande: 'validé',
    dpe: new Date('2023-02-15'),
  },
  {
    refDemande: 'RD018',
    clidig: '64a427e9fd1cf4c0c6d7dba2',  // Joffrey Baratheon
    age: '64a427e9fd1cf4c0c6d7dba3',  // Stannis Baratheon
    ncp: '8901234567',
    etatDemande: 'en cours',
    dpe: new Date('2023-02-22'),
  },
  {
    refDemande: 'RD019',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Olenna Tyrell
    age: '64a427e9fd1cf4c0c6d7dba5',  // Podrick Payne
    ncp: '9012345678',
    etatDemande: 'validé',
    dpe: new Date('2023-02-28'),
  },
  {
    refDemande: 'RD020',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Doreah
    age: '64a427e9fd1cf4c0c6d7dba6',  // Christopher Robinson
    ncp: '0123456789',
    etatDemande: 'en cours',
    dpe: new Date('2023-02-28'),
  },
  // March
  {
    refDemande: 'RD021',
    clidig: '64a427e9fd1cf4c0c6d7db98',  // John Doe
    age: '64a427e9fd1cf4c0c6d7db99',  // Jane Smith
    ncp: '1234567890',
    etatDemande: 'validé',
    dpe: new Date('2023-03-10'),
  },
  {
    refDemande: 'RD022',
    clidig: '64a427e9fd1cf4c0c6d7db9a',  // Michael Johnson
    age: '64a427e9fd1cf4c0c6d7db9b',  // Emily Davis
    ncp: '2345678901',
    etatDemande: 'en cours',
    dpe: new Date('2023-03-12'),
  },
  // ... (More entries for March)

  // April
  {
    refDemande: 'RD023',
    clidig: '64a427e9fd1cf4c0c6d7db8c',  // Gregor Clegane
    age: '64a427e9fd1cf4c0c6d7db8d',  // Doreah
    ncp: '3456789012',
    etatDemande: 'validé',
    dpe: new Date('2023-04-05'),
  },
  {
    refDemande: 'RD024',
    clidig: '64a427e9fd1cf4c0c6d7db8e',  // Meera Reed
    age: '64a427e9fd1cf4c0c6d7db90',  // Kelsey Smith
    ncp: '4567890123',
    etatDemande: 'en cours',
    dpe: new Date('2023-04-08'),
  },
  // ... (More entries for April)

  // May
  {
    refDemande: 'RD025',
    clidig: '64a427e9fd1cf4c0c6d7db91',  // Sansa Stark
    age: '5a9427648b0beebeb6957be1',  // Olly
    ncp: '5678901234',
    etatDemande: 'validé',
    dpe: new Date('2023-05-02'),
  },
  {
    refDemande: 'RD026',
    clidig: '64a427e9fd1cf4c0c6d7dba1',  // Daenerys Targaryen
    age: '5a9427648b0beebeb6957a88',  // Thomas Morris
    ncp: '6789012345',
    etatDemande: 'en cours',
    dpe: new Date('2023-05-10'),
  },
  // ... (More entries for May)

  // June
  {
    refDemande: 'RD027',
    clidig: '5a9427648b0beebeb6957c7c',  // Christian Williams
    age: '64a427e9fd1cf4c0c6d7dba3',  // Yolanda Owen
    ncp: '7890123456',
    etatDemande: 'validé',
    dpe: new Date('2023-06-05'),
  },
  {
    refDemande: 'RD028',
    clidig: '64a427e9fd1cf4c0c6d7dba2',  // Joffrey Baratheon
    age: '64a427e9fd1cf4c0c6d7dba3',  // Stannis Baratheon
    ncp: '8901234567',
    etatDemande: 'en cours',
    dpe: new Date('2023-06-12'),
  },
  // ... (More entries for June)

  // July
  {
    refDemande: 'RD029',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Olenna Tyrell
    age: '64a427e9fd1cf4c0c6d7dba5',  // Podrick Payne
    ncp: '9012345678',
    etatDemande: 'validé',
    dpe: new Date('2023-07-05'),
  },
  {
    refDemande: 'RD030',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Doreah
    age: '64a427e9fd1cf4c0c6d7dba6',  // Christopher Robinson
    ncp: '0123456789',
    etatDemande: 'en cours',
    dpe: new Date('2023-07-10'),
  },
  // ... (More entries for July)

  // August
  {
    refDemande: 'RD031',
    clidig: '64a427e9fd1cf4c0c6d7db98',  // John Doe
    age: '64a427e9fd1cf4c0c6d7db99',  // Jane Smith
    ncp: '1234567890',
    etatDemande: 'validé',
    dpe: new Date('2023-08-05'),
  },
  {
    refDemande: 'RD032',
    clidig: '64a427e9fd1cf4c0c6d7db9a',  // Michael Johnson
    age: '64a427e9fd1cf4c0c6d7db9b',  // Emily Davis
    ncp: '2345678901',
    etatDemande: 'en cours',
    dpe: new Date('2023-08-12'),
  },
  // ... (More entries for August)

  // September
  {
    refDemande: 'RD033',
    clidig: '64a427e9fd1cf4c0c6d7db8c',  // Gregor Clegane
    age: '64a427e9fd1cf4c0c6d7db8d',  // Doreah
    ncp: '3456789012',
    etatDemande: 'validé',
    dpe: new Date('2023-09-05'),
  },
  {
    refDemande: 'RD034',
    clidig: '64a427e9fd1cf4c0c6d7db8e',  // Meera Reed
    age: '64a427e9fd1cf4c0c6d7db90',  // Kelsey Smith
    ncp: '4567890123',
    etatDemande: 'en cours',
    dpe: new Date('2023-09-12'),
  },
  // ... (More entries for September)

  // October
  {
    refDemande: 'RD035',
    clidig: '64a427e9fd1cf4c0c6d7db91',  // Sansa Stark
    age: '5a9427648b0beebeb6957be1',  // Olly
    ncp: '5678901234',
    etatDemande: 'validé',
    dpe: new Date('2023-10-05'),
  },
  {
    refDemande: 'RD036',
    clidig: '64a427e9fd1cf4c0c6d7dba1',  // Daenerys Targaryen
    age: '5a9427648b0beebeb6957a88',  // Thomas Morris
    ncp: '6789012345',
    etatDemande: 'en cours',
    dpe: new Date('2023-10-10'),
  },
  // ... (More entries for October)

  // November
  {
    refDemande: 'RD037',
    clidig: '5a9427648b0beebeb6957c7c',  // Christian Williams
    age: '64a427e9fd1cf4c0c6d7dba3',  // Yolanda Owen
    ncp: '7890123456',
    etatDemande: 'validé',
    dpe: new Date('2023-11-05'),
  },
  {
    refDemande: 'RD038',
    clidig: '64a427e9fd1cf4c0c6d7dba2',  // Joffrey Baratheon
    age: '64a427e9fd1cf4c0c6d7dba3',  // Stannis Baratheon
    ncp: '8901234567',
    etatDemande: 'en cours',
    dpe: new Date('2023-11-12'),
  },
  // ... (More entries for November)

  // December
  {
    refDemande: 'RD039',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Olenna Tyrell
    age: '64a427e9fd1cf4c0c6d7dba5',  // Podrick Payne
    ncp: '9012345678',
    etatDemande: 'validé',
    dpe: new Date('2023-12-05'),
  },
  {
    refDemande: 'RD040',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Doreah
    age: '64a427e9fd1cf4c0c6d7dba6',  // Christopher Robinson
    ncp: '0123456789',
    etatDemande: 'en cours',
    dpe: new Date('2023-12-10'),
  },
  // January
  {
    refDemande: 'RD041',
    clidig: '64a427e9fd1cf4c0c6d7db98',  // John Doe
    age: '64a427e9fd1cf4c0c6d7db99',  // Jane Smith
    ncp: '1234567890',
    etatDemande: 'validé',
    dpe: new Date('2024-01-05'),
  },
  {
    refDemande: 'RD042',
    clidig: '64a427e9fd1cf4c0c6d7db9a',  // Michael Johnson
    age: '64a427e9fd1cf4c0c6d7db9b',  // Emily Davis
    ncp: '2345678901',
    etatDemande: 'en cours',
    dpe: new Date('2024-01-12'),
  },
  // ... (More entries for January)

  // February
  {
    refDemande: 'RD043',
    clidig: '64a427e9fd1cf4c0c6d7db8c',  // Gregor Clegane
    age: '64a427e9fd1cf4c0c6d7db8d',  // Doreah
    ncp: '3456789012',
    etatDemande: 'validé',
    dpe: new Date('2024-02-05'),
  },
  {
    refDemande: 'RD044',
    clidig: '64a427e9fd1cf4c0c6d7db8e',  // Meera Reed
    age: '64a427e9fd1cf4c0c6d7db90',  // Kelsey Smith
    ncp: '4567890123',
    etatDemande: 'en cours',
    dpe: new Date('2024-02-12'),
  },
  // ... (More entries for February)

  // April
  {
    refDemande: 'RD045',
    clidig: '64a427e9fd1cf4c0c6d7db91',  // Sansa Stark
    age: '5a9427648b0beebeb6957be1',  // Olly
    ncp: '5678901234',
    etatDemande: 'validé',
    dpe: new Date('2024-04-05'),
  },
  {
    refDemande: 'RD046',
    clidig: '64a427e9fd1cf4c0c6d7dba1',  // Daenerys Targaryen
    age: '5a9427648b0beebeb6957a88',  // Thomas Morris
    ncp: '6789012345',
    etatDemande: 'en cours',
    dpe: new Date('2024-04-12'),
  },
  // ... (More entries for April)

  // May
  {
    refDemande: 'RD047',
    clidig: '5a9427648b0beebeb6957c7c',  // Christian Williams
    age: '64a427e9fd1cf4c0c6d7dba3',  // Yolanda Owen
    ncp: '7890123456',
    etatDemande: 'validé',
    dpe: new Date('2024-05-05'),
  },
  {
    refDemande: 'RD048',
    clidig: '64a427e9fd1cf4c0c6d7dba2',  // Joffrey Baratheon
    age: '64a427e9fd1cf4c0c6d7dba3',  // Stannis Baratheon
    ncp: '8901234567',
    etatDemande: 'en cours',
    dpe: new Date('2024-05-12'),
  },
  // ... (More entries for May)

  // July
  {
    refDemande: 'RD049',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Olenna Tyrell
    age: '64a427e9fd1cf4c0c6d7dba5',  // Podrick Payne
    ncp: '9012345678',
    etatDemande: 'validé',
    dpe: new Date('2024-07-05'),
  },
  {
    refDemande: 'RD050',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Doreah
    age: '64a427e9fd1cf4c0c6d7dba6',  // Christopher Robinson
    ncp: '0123456789',
    etatDemande: 'en cours',
    dpe: new Date('2024-07-12'),
  },
  // ... (More entries for July)

  // August
  {
    refDemande: 'RD051',
    clidig: '64a427e9fd1cf4c0c6d7db98',  // John Doe
    age: '64a427e9fd1cf4c0c6d7db99',  // Jane Smith
    ncp: '1234567890',
    etatDemande: 'validé',
    dpe: new Date('2024-08-05'),
  },
  {
    refDemande: 'RD052',
    clidig: '64a427e9fd1cf4c0c6d7db9a',  // Michael Johnson
    age: '64a427e9fd1cf4c0c6d7db9b',  // Emily Davis
    ncp: '2345678901',
    etatDemande: 'en cours',
    dpe: new Date('2024-08-12'),
  },
  // ... (More entries for August)

  // September
  {
    refDemande: 'RD053',
    clidig: '64a427e9fd1cf4c0c6d7db8c',  // Gregor Clegane
    age: '64a427e9fd1cf4c0c6d7db8d',  // Doreah
    ncp: '3456789012',
    etatDemande: 'validé',
    dpe: new Date('2024-09-05'),
  },
  {
    refDemande: 'RD054',
    clidig: '64a427e9fd1cf4c0c6d7db8e',  // Meera Reed
    age: '64a427e9fd1cf4c0c6d7db90',  // Kelsey Smith
    ncp: '4567890123',
    etatDemande: 'en cours',
    dpe: new Date('2024-09-12'),
  },
  // ... (More entries for September)

  // October
  {
    refDemande: 'RD055',
    clidig: '64a427e9fd1cf4c0c6d7db91',  // Sansa Stark
    age: '5a9427648b0beebeb6957be1',  // Olly
    ncp: '5678901234',
    etatDemande: 'validé',
    dpe: new Date('2024-10-05'),
  },
  {
    refDemande: 'RD056',
    clidig: '64a427e9fd1cf4c0c6d7dba1',  // Daenerys Targaryen
    age: '5a9427648b0beebeb6957a88',  // Thomas Morris
    ncp: '6789012345',
    etatDemande: 'en cours',
    dpe: new Date('2024-10-12'),
  },
  // ... (More entries for October)

  // November
  {
    refDemande: 'RD057',
    clidig: '5a9427648b0beebeb6957c7c',  // Christian Williams
    age: '64a427e9fd1cf4c0c6d7dba3',  // Yolanda Owen
    ncp: '7890123456',
    etatDemande: 'validé',
    dpe: new Date('2024-11-05'),
  },
  {
    refDemande: 'RD058',
    clidig: '64a427e9fd1cf4c0c6d7dba2',  // Joffrey Baratheon
    age: '64a427e9fd1cf4c0c6d7dba3',  // Stannis Baratheon
    ncp: '8901234567',
    etatDemande: 'en cours',
    dpe: new Date('2024-11-12'),
  },
  // ... (More entries for November)

  // December
  {
    refDemande: 'RD059',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Olenna Tyrell
    age: '64a427e9fd1cf4c0c6d7dba5',  // Podrick Payne
    ncp: '9012345678',
    etatDemande: 'validé',
    dpe: new Date('2024-12-05'),
  },
  {
    refDemande: 'RD060',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Doreah
    age: '64a427e9fd1cf4c0c6d7dba6',  // Christopher Robinson
    ncp: '0123456789',
    etatDemande: 'en cours',
    dpe: new Date('2024-12-12'),
  },
  // ... (More entries for December)
];

export const dataCredits = [
  {
    type: 'Prêt hypothécaire',
    montant: 150000,
    dateEmprunt: '2022-05-10',
    dateRemboursement: '2032-05-10',
    compteEmprunteur: 'ABC123456789',
    compteBeneficiaire: 'XYZ987654321',
    tauxInteret: 5.25,
    dureeMois: 120,
    etat: 'En cours',
  },
  {
    type: 'Prêt personnel',
    montant: 10000,
    dateEmprunt: '2023-01-15',
    dateRemboursement: '2025-01-15',
    compteEmprunteur: 'DEF456789123',
    compteBeneficiaire: 'LMN321654987',
    tauxInteret: 8.75,
    dureeMois: 24,
    etat: 'Validé',
  },
  {
    type: 'Prêt automobile',
    montant: 25000,
    dateEmprunt: '2021-11-02',
    dateRemboursement: '2024-11-02',
    compteEmprunteur: 'PQR789456123',
    tauxInteret: 6.5,
    dureeMois: 36,
    etat: 'En cours',
  },
  {
    type: 'Prêt étudiant',
    montant: 8000,
    dateEmprunt: '2023-03-20',
    dateRemboursement: '2030-03-20',
    compteEmprunteur: 'STU123456789',
    tauxInteret: 4.5,
    dureeMois: 84,
    etat: 'Validé',
  },
  {
    type: 'Ligne de crédit',
    montant: 30000,
    dateEmprunt: '2022-09-18',
    dateRemboursement: '2030-09-18',
    compteEmprunteur: 'VWX456789123',
    tauxInteret: 7.2,
    dureeMois: 96,
    etat: 'En cours',
  },
  {
    type: 'Crédit revolving',
    montant: 5000,
    dateEmprunt: '2023-06-25',
    dateRemboursement: '2024-12-25',
    compteEmprunteur: 'YZA789123456',
    compteBeneficiaire: 'BCD987654321',
    tauxInteret: 9.0,
    dureeMois: 18,
    etat: 'Validé',
  },
  {
    type: 'Crédit à la consommation',
    montant: 12000,
    dateEmprunt: '2022-07-08',
    dateRemboursement: '2024-07-08',
    compteEmprunteur: 'EFG123789456',
    tauxInteret: 6.0,
    dureeMois: 24,
    etat: 'En cours',
  },
  {
    type: 'Prêt aux entreprises',
    montant: 100000,
    dateEmprunt: '2021-12-12',
    dateRemboursement: '2031-12-12',
    compteEmprunteur: 'HIJ789456123',
    tauxInteret: 5.8,
    dureeMois: 120,
    etat: 'Validé',
  },
  {
    type: 'Crédit commercial',
    montant: 75000,
    dateEmprunt: '2023-04-30',
    dateRemboursement: '2030-04-30',
    compteEmprunteur: 'KLM456789123',
    tauxInteret: 6.7,
    dureeMois: 84,
    etat: 'En cours',
  },
  {
    type: 'Prêt personnel',
    montant: 15000,
    dateEmprunt: '2022-03-15',
    dateRemboursement: '2024-03-15',
    compteEmprunteur: 'NOP123456789',
    tauxInteret: 7.5,
    dureeMois: 24,
    etat: 'Validé',
  },
  {
    type: 'Prêt personnel',
    montant: 20000,
    dateEmprunt: '2023-07-05',
    dateRemboursement: '2025-07-05',
    compteEmprunteur: 'QWE789123456',
    tauxInteret: 7.0,
    dureeMois: 24,
    etat: 'En attente',
  },
  {
    type: 'Prêt automobile',
    montant: 18000,
    dateEmprunt: '2022-11-30',
    dateRemboursement: '2024-11-30',
    compteEmprunteur: 'ASD456789123',
    tauxInteret: 6.25,
    dureeMois: 24,
    etat: 'Info manquantes',
  },
  {
    type: 'Crédit commercial',
    montant: 50000,
    dateEmprunt: '2023-02-20',
    dateRemboursement: '2027-02-20',
    compteEmprunteur: 'ZXC789123456',
    tauxInteret: 6.9,
    dureeMois: 48,
    etat: 'Annulé',
  },
  {
    type: 'Prêt étudiant',
    montant: 12000,
    dateEmprunt: '2022-09-10',
    dateRemboursement: '2025-09-10',
    compteEmprunteur: 'UIO123456789',
    tauxInteret: 5.0,
    dureeMois: 36,
    etat: 'En attente',
  },
  {
    refDemande: 'RD041',
    clidig: '64a427e9fd1cf4c0c6d7db98',  // John Doe
    age: '64a427e9fd1cf4c0c6d7db99',  // Jane Smith
    ncp: '1234567890',
    etatDemande: 'validé',
    dpe: new Date('2024-01-05'),
  },
  {
    refDemande: 'RD042',
    clidig: '64a427e9fd1cf4c0c6d7db9a',  // Michael Johnson
    age: '64a427e9fd1cf4c0c6d7db9b',  // Emily Davis
    ncp: '2345678901',
    etatDemande: 'en cours',
    dpe: new Date('2024-01-12'),
  },
  // ... (More entries for January)

  // February
  {
    refDemande: 'RD043',
    clidig: '64a427e9fd1cf4c0c6d7db8c',  // Gregor Clegane
    age: '64a427e9fd1cf4c0c6d7db8d',  // Doreah
    ncp: '3456789012',
    etatDemande: 'validé',
    dpe: new Date('2024-02-05'),
  },
  {
    refDemande: 'RD044',
    clidig: '64a427e9fd1cf4c0c6d7db8e',  // Meera Reed
    age: '64a427e9fd1cf4c0c6d7db90',  // Kelsey Smith
    ncp: '4567890123',
    etatDemande: 'en cours',
    dpe: new Date('2024-02-12'),
  },
  // ... (More entries for February)

  // April
  {
    refDemande: 'RD045',
    clidig: '64a427e9fd1cf4c0c6d7db91',  // Sansa Stark
    age: '5a9427648b0beebeb6957be1',  // Olly
    ncp: '5678901234',
    etatDemande: 'validé',
    dpe: new Date('2024-04-05'),
  },
  {
    refDemande: 'RD046',
    clidig: '64a427e9fd1cf4c0c6d7dba1',  // Daenerys Targaryen
    age: '5a9427648b0beebeb6957a88',  // Thomas Morris
    ncp: '6789012345',
    etatDemande: 'en cours',
    dpe: new Date('2024-04-12'),
  },
  // ... (More entries for April)

  // May
  {
    refDemande: 'RD047',
    clidig: '5a9427648b0beebeb6957c7c',  // Christian Williams
    age: '64a427e9fd1cf4c0c6d7dba3',  // Yolanda Owen
    ncp: '7890123456',
    etatDemande: 'validé',
    dpe: new Date('2024-05-05'),
  },
  {
    refDemande: 'RD048',
    clidig: '64a427e9fd1cf4c0c6d7dba2',  // Joffrey Baratheon
    age: '64a427e9fd1cf4c0c6d7dba3',  // Stannis Baratheon
    ncp: '8901234567',
    etatDemande: 'en cours',
    dpe: new Date('2024-05-12'),
  },
  // ... (More entries for May)

  // July
  {
    refDemande: 'RD049',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Olenna Tyrell
    age: '64a427e9fd1cf4c0c6d7dba5',  // Podrick Payne
    ncp: '9012345678',
    etatDemande: 'validé',
    dpe: new Date('2024-07-05'),
  },
  {
    refDemande: 'RD050',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Doreah
    age: '64a427e9fd1cf4c0c6d7dba6',  // Christopher Robinson
    ncp: '0123456789',
    etatDemande: 'en cours',
    dpe: new Date('2024-07-12'),
  },
  // ... (More entries for July)

  // August
  {
    refDemande: 'RD051',
    clidig: '64a427e9fd1cf4c0c6d7db98',  // John Doe
    age: '64a427e9fd1cf4c0c6d7db99',  // Jane Smith
    ncp: '1234567890',
    etatDemande: 'validé',
    dpe: new Date('2024-08-05'),
  },
  {
    refDemande: 'RD052',
    clidig: '64a427e9fd1cf4c0c6d7db9a',  // Michael Johnson
    age: '64a427e9fd1cf4c0c6d7db9b',  // Emily Davis
    ncp: '2345678901',
    etatDemande: 'en cours',
    dpe: new Date('2024-08-12'),
  },
  // ... (More entries for August)

  // September
  {
    refDemande: 'RD053',
    clidig: '64a427e9fd1cf4c0c6d7db8c',  // Gregor Clegane
    age: '64a427e9fd1cf4c0c6d7db8d',  // Doreah
    ncp: '3456789012',
    etatDemande: 'validé',
    dpe: new Date('2024-09-05'),
  },
  {
    refDemande: 'RD054',
    clidig: '64a427e9fd1cf4c0c6d7db8e',  // Meera Reed
    age: '64a427e9fd1cf4c0c6d7db90',  // Kelsey Smith
    ncp: '4567890123',
    etatDemande: 'en cours',
    dpe: new Date('2024-09-12'),
  },
  // ... (More entries for September)

  // October
  {
    refDemande: 'RD055',
    clidig: '64a427e9fd1cf4c0c6d7db91',  // Sansa Stark
    age: '5a9427648b0beebeb6957be1',  // Olly
    ncp: '5678901234',
    etatDemande: 'validé',
    dpe: new Date('2024-10-05'),
  },
  {
    refDemande: 'RD056',
    clidig: '64a427e9fd1cf4c0c6d7dba1',  // Daenerys Targaryen
    age: '5a9427648b0beebeb6957a88',  // Thomas Morris
    ncp: '6789012345',
    etatDemande: 'en cours',
    dpe: new Date('2024-10-12'),
  },
  // ... (More entries for October)

  // November
  {
    refDemande: 'RD057',
    clidig: '5a9427648b0beebeb6957c7c',  // Christian Williams
    age: '64a427e9fd1cf4c0c6d7dba3',  // Yolanda Owen
    ncp: '7890123456',
    etatDemande: 'validé',
    dpe: new Date('2024-11-05'),
  },
  {
    refDemande: 'RD058',
    clidig: '64a427e9fd1cf4c0c6d7dba2',  // Joffrey Baratheon
    age: '64a427e9fd1cf4c0c6d7dba3',  // Stannis Baratheon
    ncp: '8901234567',
    etatDemande: 'en cours',
    dpe: new Date('2024-11-12'),
  },
  // ... (More entries for November)

  // December
  {
    refDemande: 'RD059',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Olenna Tyrell
    age: '64a427e9fd1cf4c0c6d7dba5',  // Podrick Payne
    ncp: '9012345678',
    etatDemande: 'validé',
    dpe: new Date('2024-12-05'),
  },
  {
    refDemande: 'RD060',
    clidig: '64a427e9fd1cf4c0c6d7dba4',  // Doreah
    age: '64a427e9fd1cf4c0c6d7dba6',  // Christopher Robinson
    ncp: '0123456789',
    etatDemande: 'en cours',
    dpe: new Date('2024-12-12'),
  },
  {
    type: 'Crédit revolving',
    montant: 7000,
    dateEmprunt: '2023-04-02',
    dateRemboursement: '2025-04-02',
    compteEmprunteur: 'JKL789456123',
    compteBeneficiaire: 'MNB987654321',
    tauxInteret: 10.5,
    dureeMois: 24,
    etat: 'Info manquantes',
  },
  {
    type: 'Ligne de crédit',
    montant: 35000,
    dateEmprunt: '2022-08-15',
    dateRemboursement: '2024-08-15',
    compteEmprunteur: 'POI456789123',
    tauxInteret: 8.2,
    dureeMois: 24,
    etat: 'En attente',
  },
];