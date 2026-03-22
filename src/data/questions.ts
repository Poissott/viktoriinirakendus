
interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Mis on Eesti pealinn?",
    options: [
      "Tallinn",
      "Tartu",
      "Narva"
    ],
    answer: "Tallinn"
  },
  {
    id: 2,
    question: "Mis on Eesti suuruselt teine linn?",
    options: [
      "Pärnu",
      "Tartu",
      "Narva",
      "Viljandi"
    ],
    answer: "Tartu"
  },
  {
    id: 3,
    question: "Mis on Eesti pikim jõgi?",
    options: [
      "Emajõgi",
      "Pärnu jõgi",
      "Võhandu jõgi",
      "Pirita jõgi"
    ],
    answer: "Võhandu jõgi"
  },
  {
    id: 4,
    question: "Mis on Eesti suurim saar?",
    options: [
      "Muhu",
      "Vormsi",
      "Saaremaa",
      "Hiiumaa",
      "Kihnu"
    ],
    answer: "Saaremaa"
  },
  {
    id: 5,
    question: "Millal toimus esimene üldlaulupidu?",
    options: [
      "1824",
      "1848",
      "1869",
      "1875",
      "1890",
      "1901"
    ],
    answer: "1869"
  },
  {
    id: 6,
    question: "Kust saab suurema osa Eestist oma joogivee?",
    options: [
      "põhjaveest",
      "järveveest",
      "mereveest",
    ],
    answer: "põhjaveest"
  },
  {
    id: 7,
    question: "Mis on rahvaarvult suurim Tartu linnaosa?",
    options: [
      "Ülejõe",
      "Ropka tööstusrajoon",
      "Veeriku",
      "Annelinn",
      "Jaamamõisa"
    ],
    answer: "Annelinn"
  },
]

export default questions;