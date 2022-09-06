// Variáveis
const INCREMENTAR_TEMPO = "aluno/INCREMENTAR_TEMPO";
const REDUZIR_TEMPO = "aluno/REDUZIR_TEMPO";
const MODIFICAR_EMAIL = "aluno/MODIFICAR_EMAIL";

// Action functions
export const incrementarTempo = () => ({ type: INCREMENTAR_TEMPO });
export const reduzirTempo = () => ({ type: REDUZIR_TEMPO });
export const modificarEmail = (payload) => ({ type: MODIFICAR_EMAIL, payload });

// Valor padrão da Store:

const aluno = {
  nome: "Matheus Marinho",
  email: "matheus@gmail.com",
  diasRestantes: 120,
};

// Reducer

const alunoReducer = immer.produce((state = aluno, action) => {
  switch (action.type) {
    case INCREMENTAR_TEMPO:
      state.diasRestantes = state.diasRestantes + 1;
      break;
    case REDUZIR_TEMPO:
      state.diasRestantes = state.diasRestantes - 1;
      break;
    case MODIFICAR_EMAIL:
      state.email = action.payload;
      break;
  }
}, aluno);

export default alunoReducer;
