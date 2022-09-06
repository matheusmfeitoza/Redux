# Redux

Curso Origamid sobre Redux

## Iniciando

Primeiro instalamos a biblioteca ou usamos o arquivo do *Dist Folder* para praticar : [Link da dist Folder](https://unpkg.com/redux/dist/)

Documentação para instalação via NPM, YARN e etc... [Documentação Redeux](https://redux.js.org/introduction/installation)

**Começando**:

Um passo relativamente simples, devemos criar a store, logo faremos o comando abaixo:

```javascript
    const store = Redux.createStore(reducer)
```
Ao criarmos a store, devemos passar um argumento no *createStore* podendo ter qualquer nome, mas geralmente é usado o reducer. Agora vamos montar a função reducer:

```javascript

    function reducer(state,action){
        return state
    }
```
Esta é a forma genérica de se criar o reducer, onde eu recebo um estado e as ações para modificar o estado.

## store

Agora que já criamos a store, conseguimos entender melhor seu uso:

Podemos dar um console.log() no store e teremos este retorno:

```bash
{dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ, @@observable: ƒ}
@@observable: ƒ E()
dispatch: ƒ v(r)
getState: ƒ b()
replaceReducer: ƒ O(r)
subscribe: ƒ h(r)
[[Prototype]]: Object
```
Temos as funções que usaremos, caso tenha passado algum valor para o state, já conseguimos obtê-lo através do comando `store.getState()`.

## action

Para alterar os valores do state, trabalhamos sempre com as Actions, mas antes de entrar a fundo, temos algumas convenções a serem seguidas:

1- Seguir um padrão para criação das variáveis, estas que serão usadas nos types.

2- Criar action functions, funções de ação que dispara um tipo e se tiver um payload.

Exemplos de como criar as variáveis:

```javascript

const SOMAR  = 'SOMAR'
```

Exemplo de como criar as action functions:

```javascript

function somar(payload){
    return {type: SOMAR, payload}
}
```

*Usando as actions*

Depois de termos entendido alguns conceitos, as actions são usadas no reducer e disparada com o auxilio da store.

Para disparar uma action usamos o seguinte comando `store.dispatch(ACTION_FUNCTION)`

Agora iremos criar um reducer utilizando as action functions e types e disparar um evento

```javascript

function reducer(state,action){
    if(action.type === SOMAR){
        return state = state + action.payload
    }
}

store.dispatch(somar(30))
const state = store.getState();
console.log(state);
```

## subscribe

Podemos ter a reatividade com Redux, podendo assim atualizar com componente e ele reativamente atualizar na tela.

Para isso usamos o *subscribe*

```javascript
function render(){
    const spn = document.getElementById('spn'); // Capturando o campo onde aparecerá o valor
    const state = store.getState() //Obtendo o valor da store e armazenando em state
    spn.innerText = state // Jogando na tela o valor armazenado no state
}
store.subscribe(render) // Ativando a reatividade, método que ficará observando as mudanças dentro da função passada.
render(); // Apenas para iniciar o span com um valor já em tela.

const button = document.getElementById('button');
button.addEventListener('click',() => store.dispatch(somar()));
```
Com o exemplo acima temos um "escutador" na função render, sempre que ela é ativada ocorre uma nova render, parecido com que vemos no React.

## Combine Reducers

Podemos ter vários reducers e combina-los para que seja enviado uma única função porém com vários reducers.

Seguindo nossa lógica de exemplos, posso ter um reducers para somar e um reducer para verificar se um modal estar aberto ou fechado. Vejamos abaixo como fazer:

```javascript

let initialState = 0
function somar(state = initialState, action) {
    switch (action.type) {
        case SOMAR:
            return state = state + action.payload
        default:
            return state
    
        default:
            break;
    }
}

function modal(state = false, action){
    switch(action.type) {
        case "ABRIR":
            return state = true;
        case "FECHAR":
            return state = false;
        default:
            return state;
    }
}

const reducer = Redux.combineReducers({somar,modal})
const store = Redux.createStore(reducer)
```

*Ainda sobre o reducer*...
No reducer devemos ter alguns cuidados...

 - Usar sempre pure functions ( Mais abaixo teremos exemplos), mas é nada mais nada menos que não realizar lógicas no reducers e sim na função de render.
 - Sempre passar o state iniciado.
 - Imutabilidade, devemos sempre nos ater em não modificar o estado diretamente e sim por outros meios. Veja o exemplo da Imutabilidade


**Pure Function**

É a maneira de deixar nosso reducer limpo de obrigações e apenas como um transportador de estados.

```html
<body>
    <div id="barra" style="background-color: blue; height: 90px"></div>

<body>
```
```javascript
const WIDTH_TYPE = "WIDTH_TYPE";

      function larguraWidth(payload) {
        return { type: WIDTH_TYPE, payload };
      }

      function reducer(state = 0, action) {
        switch (action.type) {
          case WIDTH_TYPE:
            return action.payload;
          default:
            return state;
        }
      }
      function render() {
        //Efeito colateral acontecendo no render
        const barra = document.getElementById("barra");
        const state = store.getState();
        barra.style.width = state + "px";
      }
      const store = Redux.createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      );
      store.subscribe(render);
      store.dispatch(larguraWidth(20));
      store.dispatch(larguraWidth(50));
```

**Imutabilidade**

Na Imutabilidade, devemos nos ater em nunca modificar o state no reducer, pois podemos causar um problema de render, tanto no redux puro ou quando formos usar com React. Para isso devemos sempre usar `destruct` do `estado` e informar apenas o que iremos alterar com o `Payload`.

```javascript
// Variável de type
      const NAME = "NAME";

      //Action Function
      function name(payload) {
        return {
          type: NAME,
          payload,
        };
      }

      //Estado inincial
      const initialState = {
        nome: "Matheus",
        idade: 27,
      };
      // Reducer
      function reducer(state = initialState, action) {
        switch (action.type) {
          case NAME:
            return { ...state, nome: action.payload };
          default:
            return state;
        }
      }
      //Criando a store
      const store = Redux.createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      );
      //Disparando evento
      store.dispatch(name("Maria"));
      store.dispatch(name("João"));
      console.log(store.getState());
```

Existe uma lib que facilita este processo chamada *IMMER* que é inclusa no *<span color='red'><strong>Redux Tool Kit</strong></span>* ferramenta que usaremos mais tarde...

Segue um exemplo usando ele:

```javascript
      // Variável de type
      const NAME = "NAME";
      const IDADE = "IDADE";
      //Action Function
      function name(payload) {
        return {
          type: NAME,
          payload,
        };
      }

      function idade(payload) {
        return { type: IDADE, payload };
      }

      //Estado inincial
      const initialState = {
        nome: "Matheus",
        sobre: {
          dados: {
            idade: 20,
          },
        },
      };
      // Reducer usando o immer
      const reducer = immer.produce((state, action) => {
        switch (action.type) {
          case NAME:
            state.nome = action.payload;
            break;
          case IDADE:
            state.sobre.dados.idade = action.payload;
        }
      }, initialState);
      //Criando a store
      const store = Redux.createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      );
      //Disparando evento
      store.dispatch(name("Maria"));
      store.dispatch(name("João"));
      store.dispatch(idade(30));
      console.log(store.getState());
```

## Organização

Na pasta 02 foi feito um exemplo de uso criando a store, os reducers em e o uso em um projeto, mantendo a organização e a manutenção mais limpa.

## Exercicio 

Na pasta 3 temos um desafio para testar todo o conhecimento obtido.

Segue o mesmo abaixo, tente ai:

```javascript
// Usando o Redux (pode usar Immer ou Não).
// Crie uma store contendo os estados iniciais abaixo
// Crie as seguintes ações:
// aluno/INCREMENTAR_TEMPO, adiciona 1 dia de acesso
// aluno/REDUZIR_TEMPO, reduz 1 dia de acesso
// aluno/MODIFICAR_EMAIL(email), modifica o email do usuário
// aulas/COMPLETAR_AULA(id), completa a aula com base no ID passado
// aulas/COMPLETAR_CURSO, completa todas as aulas
// aulas/RESETAR_CURSO, reseta todas as aulas completas
// Crie constantes e action creators para as ações.
// Crie um reducer para aluno e um para aulas.
// Renderize na tela o nome, email, tempo restante e o total de aulas completas
// Configure a DevTools 

```

## Middleware

Vamos ver agora a parte dos middlewares.

**Currying**

Uma função curried, permite que passamos um argumento por vez em funções, ao invés de todos de uma vez.

Exemplo:

```html
 <body>
    <ul>
      <li id="item1" data-slide="1">Item 1</li>
      <li id="item2" data-slide="2">Item 2</li>
      <li id="item3" data-slide="3">Item 3</li>
      <li id="item4" data-slide="4">Item 4</li>
    </ul>

    <script src="script.js"></script>
  </body>
```

```javascript
const li = Array.from(document.querySelectorAll("li"));

const simple = (key) => (el) => el.getAttribute(key);

const teste = li.map(simple("id"));
const teste2 = li.map((ex) => ex.getAttribute("data-slide"));
console.log(teste);
console.log(teste2);

```

**Redux Middleware** 

Os middlewares são funções que ocorrem depois da primeira montagem do componente e antes de qualquer dispatch;

Podemos ter vários middlewares para verificar vários efeitos colaterais.

Segue abaixo um exemplo de uso do middleware já configurando um componse.

```javascript
function reducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENTAR":
      return state + 1;     // Função reducer que iremos passar quando criamos a store
    case "REDUZIR":
      return state - 1;
    default:
      return state;
  }
}

const logger = (store) => (next) => (action) => {
  console.group(action);
  console.log("Prev State: ", store.getState());     //Middleware criado, aqui apenas observo e mostro quando ele ocorre. Por isto ativo o next() para ver a proxima mudança
  const result = next(action);
  console.log("State: ", store.getState());
  console.groupEnd;
  return result;
};

const { applyMiddleware, compose } = Redux;  // Abstraindo o applyMiddleware e o compose do Redux

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // Aqui eu uso o compose do próprio redux toolkit caso o usuário tenha instaldo, se não, uso o do Redux.


const enhancer = composeEnhancers(applyMiddleware(logger)); // Criando de fato e compondo o middleware

const store = Redux.createStore(reducer, enhancer); // Criando a store passando o reducer e o compose de middlewares

store.dispatch({ type: "INCREMENTAR" });
store.dispatch({ type: "REDUZIR" });        // Despachando actions 
store.dispatch({ type: "INCREMENTAR" });
```


## Desafio Middleware

```javascript
// Organize o código em diferentes arquivos com type module
// Crie 2 reducers, token e user
// Ações:
// token/FETCH_STARTED, token/FETCH_SUCCESS, token/FETCH_ERROR
// user/FETCH_STARTED, user/FETCH_SUCCESS, user/FETCH_ERROR
// Crie constantes e action creators para cada ação
// Crie middlewares: Thunk e localStorage
// Com a api do curso de React, puxe o token:
// o user pode ser { username: 'dog', password: 'dog' }
const response = await fetch(
  'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  },
);
const { token } = await response.json();

// Com a api do curso de React, puxe o usuário:
const response = await fetch('https://dogsapi.origamid.dev/json/api/user', {
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + token,
  },
});
const data = await response.json();

// A api deve ir dentro da action creator das funções assíncronas
// Verifique se o token existe, caso exista dispare imediatamente
// a função para puxar o usuário. Se não existir, dispare a
// função para puxar o token e em seguida para puxar o usuário

``` 
