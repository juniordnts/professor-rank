const departmentList = [
  {
    centerAbreviation: "CT",
    centerName: "Centro de Tecnologia",
    departments: [
      {
        departmentAbreviation: "ect",
        departmentName: "ECT",
      },
      {
        departmentAbreviation: "imd",
        departmentName: "IMD",
      },
      {
        departmentAbreviation: "ctciv",
        departmentName: "Dep. Eng. Civil",
      },
      {
        departmentAbreviation: "ctdeq",
        departmentName: "Dep. Eng. Química",
      },
      {
        departmentAbreviation: "ctdca",
        departmentName: "Dep. Eng. Computação",
      },
      {
        departmentAbreviation: "ctele",
        departmentName: "Dep. Eng. Elétrica",
      },
      {
        departmentAbreviation: "ctmec",
        departmentName: "Dep. Eng. Mecânica",
      },
      {
        departmentAbreviation: "ctpro",
        departmentName: "Dep. Eng. Produção",
      },
      {
        departmentAbreviation: "ctmtr",
        departmentName: "Dep. Eng. Materiais",
      },
      {
        departmentAbreviation: "ctdeb",
        departmentName: "Dep. Eng. Biomédica",
      },
      {
        departmentAbreviation: "ctarq",
        departmentName: "Dep. Arquitetura",
      },
      {
        departmentAbreviation: "ctdet",
        departmentName: "Dep. Eng. Têxtil",
      },
    ],
  },
  {
    centerAbreviation: "CCET",
    centerName: "Centro de Ciências Exatas e da Terra",
    departments: [
      {
        departmentAbreviation: "ccetmat",
        departmentName: "Dep. Matemática",
      },
      {
        departmentAbreviation: "ccetest",
        departmentName: "Dep. Estatística",
      },
      {
        departmentAbreviation: "ccetdim",
        departmentName: "Dep. Info. e Mat. Aplicada",
      },
      {
        departmentAbreviation: "ccetfis",
        departmentName: "Dep. Física Teórica e Exp.",
      },
      {
        departmentAbreviation: "ccetqui",
        departmentName: "Instituto de Química",
      },
      {
        departmentAbreviation: "ccetgeo",
        departmentName: "Dep. Geologia",
      },
      {
        departmentAbreviation: "ccetcac",
        departmentName: "Dep. Ciências Atmosféricas e Cli.",
      },
      {
        departmentAbreviation: "ccetdda",
        departmentName: "Dep. Demografia e Ciên. Atuariaia",
      },
      {
        departmentAbreviation: "ccetgef",
        departmentName: "Dep. Geofísica",
      },
    ],
  },
  {
    centerAbreviation: "CCSA",
    centerName: "Centro De Ciências Sociais Aplicadas",
    departments: [
      {
        departmentAbreviation: "ccsadir",
        departmentName: "Dep. Direito",
      },
      {
        departmentAbreviation: "ccsadtu",
        departmentName: "Dep. Turismo",
      },
      {
        departmentAbreviation: "ccsaadm",
        departmentName: "Dep. Ciências Administrativas",
      },
      {
        departmentAbreviation: "ccsasso",
        departmentName: "Dep. Serviço Social",
      },
      {
        departmentAbreviation: "ccsacon",
        departmentName: "Dep. Ciências Contábeis",
      },
      {
        departmentAbreviation: "ccsaeco",
        departmentName: "Dep. Economia",
      },
    ],
  },
  {
    centerAbreviation: "CB",
    centerName: "Centro de Biociências",
    departments: [
      {
        departmentAbreviation: "cbdbf",
        departmentName: "Dep. Biofísica e Farmacologia",
      },
      {
        departmentAbreviation: "cbdbg",
        departmentName: "Dep. Biologia Celular e Genética",
      },
      {
        departmentAbreviation: "cbdbq",
        departmentName: "Dep. Bioquimica",
      },
      {
        departmentAbreviation: "cbecl",
        departmentName: "Dep. Ecologia",
      },
      {
        departmentAbreviation: "cbbez",
        departmentName: "Dep. Botânica e Zoologia",
      },
      {
        departmentAbreviation: "cbdfs",
        departmentName: "Dep. Fisiologia e Comportamento",
      },
      {
        departmentAbreviation: "cbdmp",
        departmentName: "Dep. Microbiologia e Parasitologia",
      },
      {
        departmentAbreviation: "cbmor",
        departmentName: "Dep. Morfologia",
      },
      {
        departmentAbreviation: "cbdol",
        departmentName: "Dep. Oceanografia e Limnologia",
      },
    ],
  },
  {
    centerAbreviation: "CCHLA",
    centerName: "Centro de Ciências Humanas, Letras e Artes",
    departments: [
      {
        departmentAbreviation: "cchlacom",
        departmentName: "Dep. Comunicação Social",
      },
      {
        departmentAbreviation: "cchlahis",
        departmentName: "Dep. História",
      },
      {
        departmentAbreviation: "cchladpp",
        departmentName: "Dep. Políticas Públicas",
      },
      {
        departmentAbreviation: "cchlalet",
        departmentName: "Dep. Letras",
      },
      {
        departmentAbreviation: "cchladcs",
        departmentName: "Dep. Ciências Sociais",
      },
      {
        departmentAbreviation: "cchlaart",
        departmentName: "Dep. Artes",
      },
      {
        departmentAbreviation: "cchlapsi",
        departmentName: "Dep. Psicologia",
      },
      {
        departmentAbreviation: "cchlafil",
        departmentName: "Dep. Filosofia",
      },
      {
        departmentAbreviation: "cchladge",
        departmentName: "Dep. Geografia",
      },
      {
        departmentAbreviation: "cchlalem",
        departmentName: "Dep. Líguas Estrangeiras e Modernas",
      },
      {
        departmentAbreviation: "cchladan",
        departmentName: "Dep. Antropologia",
      },
    ],
  },
  {
    centerAbreviation: "CE",
    centerName: "Centro de Educação",
    departments: [
      {
        departmentAbreviation: "cefpe",
        departmentName: "Dep. Fundamentos e Políticas da Edu.",
      },
      {
        departmentAbreviation: "cepec",
        departmentName: "Dep. Práticas Edu. e Currículo",
      },
    ],
  },
  {
    centerAbreviation: "CCS",
    centerName: "Centro de Ciências da Saúde",
    departments: [
      {
        departmentAbreviation: "ccsenf",
        departmentName: "Dep. Enfermagem",
      },
      {
        departmentAbreviation: "ccsfon",
        departmentName: "Dep. Fonoaudiologia",
      },
      {
        departmentAbreviation: "ccsfar",
        departmentName: "Dep. Farmácia",
      },
      {
        departmentAbreviation: "ccsnut",
        departmentName: "Dep. Nutrição",
      },
      {
        departmentAbreviation: "ccsfst",
        departmentName: "Dep. Fisioterapia",
      },
      {
        departmentAbreviation: "ccsdef",
        departmentName: "Dep. Educação Física",
      },
      {
        departmentAbreviation: "ccsdod",
        departmentName: "Dep. Odontologia",
      },
      {
        departmentAbreviation: "ccsact",
        departmentName: "Dep. Análises Clínicas e Tox",
      },
      {
        departmentAbreviation: "ccsmcl",
        departmentName: "Dep. Medicina Clínica",
      },
      {
        departmentAbreviation: "ccsdmi",
        departmentName: "Dep. Medicina Integrada",
      },
      {
        departmentAbreviation: "ccsdsc",
        departmentName: "Dep. Saúde Coletiva",
      },
    ],
  },
  {
    centerAbreviation: "OUTROS",
    centerName: "Outros Departamentos",
    departments: [
      {
        departmentAbreviation: "mus",
        departmentName: "Escola de Música",
      },
      {
        departmentAbreviation: "eaj",
        departmentName: "Escola Agrícola Junidaí",
      },
      {
        departmentAbreviation: "ice",
        departmentName: "Instituto do Cérebro",
      },
      {
        departmentAbreviation: "mdm",
        departmentName: "Escola Multicampi de Ciên. Méd.",
      },
    ],
  },
];

export default departmentList;
