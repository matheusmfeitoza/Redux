// Variáveis
const COMPLETAR_AULA = "aula/COMPLETAR_AULA";
const COMPLETAR_CURSO = "aula/COMPLETAR_CURSO";
const RESETAR_CURSO = "aula/RESETAR_CURSO";

// Action Functions
export const completarAula = (payload) => ({ type: COMPLETAR_AULA, payload });
export const completarCurso = () => ({ type: COMPLETAR_CURSO });
export const resetarCurso = () => ({ type: RESETAR_CURSO });

// Default value da Store
const aulas = [
  {
    id: 1,
    nome: "Design",
    completa: true,
  },
  {
    id: 2,
    nome: "HTML",
    completa: false,
  },
  {
    id: 3,
    nome: "CSS",
    completa: false,
  },
  {
    id: 4,
    nome: "JavaScript",
    completa: false,
  },
];

// Reducer
const aulasReducer = immer.produce((state = aulas, action) => {
  switch (action.type) {
    case COMPLETAR_AULA:
      state.map((item) => {
        if (item.id === action.payload) return (item.completa = true);
      });
      break;
    case COMPLETAR_CURSO:
      state.forEach((item) => (item.completa = true));
      break;
    case RESETAR_CURSO:
      state.forEach((item) => (item.completa = false));
  }
}, aulas);

export default aulasReducer;
