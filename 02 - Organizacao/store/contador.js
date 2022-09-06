// Variáveis
const INCREMENTAR = "contador/INCREMENTAR";
const DECREMENTAR = "contador/DECREMENTAR";

// Action Functions
export const incrementar = () => ({ type: INCREMENTAR });
export const decrementar = () => ({ type: DECREMENTAR });

// State inicial
const inicialState = 0;
//Reducer
const contador = (state = inicialState, action) => {
  switch (action.type) {
    case INCREMENTAR:
      return state + 1;
    case DECREMENTAR:
      return state - 1;
    default:
      return state;
  }
};

export default contador;
