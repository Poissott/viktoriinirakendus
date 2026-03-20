
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
]

export default questions;