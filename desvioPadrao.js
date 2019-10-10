function desvioPadrao(lista) {
  let media = lista.reduce((total, valor) => total + valor / lista.length, 0);
  let variancia = lista.reduce((total, valor) => total + Math.pow(media - valor, 2) / lista.length, 0);
  let desvioPadrao = Math.sqrt(variancia);
  return desvioPadrao
};
