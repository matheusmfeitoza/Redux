const li = Array.from(document.querySelectorAll("li"));

const simple = (key) => (el) => el.getAttribute(key);

const teste = li.map(simple("id"));
const teste2 = li.map((ex) => ex.getAttribute("data-slide"));
console.log(teste);
console.log(teste2);
