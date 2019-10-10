// {
//   "Docente": "ZULMARA VIRGINIA DE CARVALHO",
//   "Componente Curricular": "ECT2512 - FUNDAMENTOS DE PROPRIEDADE INTELECTUAL E TRANSFERÊNCIA DE TECNOLOGIA",
//   "Turma": "1",
//   "Horário": "46M56 (13/02/2017 - 01/07/2017)",
//   "Discentes": 21,
//   "Média Geral": 9.84,
//   "Desvio Padrão Geral": 0.83
// }
function desvioPadrao(lista) {
  let media = lista.reduce((total, valor) => total + valor / lista.length, 0);
  let variancia = lista.reduce((total, valor) => total + Math.pow(media - valor, 2) / lista.length, 0);
  let desvioPadrao = Math.sqrt(variancia);
  return desvioPadrao
}

const fs = require('fs');

const jsonRaw = require('./2019-2017.json');

var jsonCluster = {};
var jsonClusterClasses = {};

jsonRaw.forEach(element => {

  if (jsonCluster[element['Docente']]) {

    jsonCluster[element['Docente']]['Notas'].push(element['Média Geral'])
    jsonCluster[element['Docente']]['Desvios'].push(element['Desvio Padrão Geral'])

  } else {

    jsonCluster[element['Docente']] = { 'Notas': [], 'Desvios': {} };

    jsonCluster[element['Docente']]['Notas'] = [element['Média Geral']]
    jsonCluster[element['Docente']]['Desvios'] = [element['Desvio Padrão Geral']]

  }


  if (jsonCluster[element['Componente Curricular']]) {

    jsonCluster[element['Componente Curricular']]['Notas'].push(element['Média Geral'])
    jsonCluster[element['Componente Curricular']]['Desvios'].push(element['Desvio Padrão Geral'])

  } else {

    jsonCluster[element['Componente Curricular']] = { 'Notas': [], 'Desvios': {} };

    jsonCluster[element['Componente Curricular']]['Notas'] = [element['Média Geral']]
    jsonCluster[element['Componente Curricular']]['Desvios'] = [element['Desvio Padrão Geral']]

  }

});

var maioresDesviosDeNota = 0;
var maioresDesviosDeNotaArray = [];

for (k in jsonCluster) {
  let desvioDeNotas = desvioPadrao(jsonCluster[k]['Notas']);
  let mediaDeNotas = jsonCluster[k]['Notas'].reduce((total, number) => { return total + number }, 0) / jsonCluster[k]['Notas'].length;
  jsonCluster[k]['DesvioDeNotas'] = desvioDeNotas;
  jsonCluster[k]['MediaDeNotas'] = mediaDeNotas;

  // Sort intArray must be "(a, b) => { a - b }", but floatArray only sort(); WTF?
  var notasOrdenadas = jsonCluster[k]['Notas'].sort();
  var notaMediana = notasOrdenadas[Math.round((jsonCluster[k]['Notas'].length - 1) / 2)];
  jsonCluster[k]['NotaMediana'] = notaMediana;

  if (desvioDeNotas > maioresDesviosDeNota) {
    maioresDesviosDeNota = desvioDeNotas;
    maioresDesviosDeNotaArray.push({ "Docente": k, "Desvio Por Semestre": maioresDesviosDeNota });
    console.log(maioresDesviosDeNota, ` : ${k}`);
  }
}

async function refineNotasAndDesvios(dataCluster) {

  dataClusterString = await JSON.stringify(dataCluster, null, 2);

  fs.writeFile('2019-2017-refined.json', dataClusterString, function (err) {
    if (err) throw err;
    console.log('Saved Refined!');
  });

  let usefullData = await JSON.stringify(maioresDesviosDeNotaArray, null, 2);

  fs.writeFile('usefullData.json', usefullData, function (err) {
    if (err) throw err;
    console.log('Saved Usefull!');
  });

}

refineNotasAndDesvios(jsonCluster);