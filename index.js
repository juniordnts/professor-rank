
function desvioPadrao(lista) {
  let media = lista.reduce((total, valor) => total + valor / lista.length, 0);
  let variancia = lista.reduce((total, valor) => total + Math.pow(media - valor, 2) / lista.length, 0);
  let desvioPadrao = Math.sqrt(variancia);
  return desvioPadrao
}

const fs = require('fs');

const jsonRaw = require('./dados/2019-2017.json');

var jsonCluster = {};
var jsonClusterClasses = {};

jsonRaw.forEach(element => {

  if (jsonCluster[element['Docente']]) {

    jsonCluster[element['Docente']]['Notas'].push(element['Média Geral'])
    jsonCluster[element['Docente']]['Desvios'].push(element['Desvio Padrão Geral'])

  } else {

    jsonCluster[element['Docente']] = { 'Notas': [], 'Desvios': [] };

    jsonCluster[element['Docente']]['Notas'] = [element['Média Geral']]
    jsonCluster[element['Docente']]['Desvios'] = [element['Desvio Padrão Geral']]
    jsonCluster[element['Docente']]['Componentes'] = {}

  }

  if (jsonCluster[element['Docente']]['Componentes'][element['Componente Curricular']]) {

    jsonCluster[element['Docente']]['Componentes'][element['Componente Curricular']]['Notas'].push(element['Média Geral'])
    jsonCluster[element['Docente']]['Componentes'][element['Componente Curricular']]['Desvios'].push(element['Desvio Padrão Geral'])

  } else {

    jsonCluster[element['Docente']]['Componentes'][element['Componente Curricular']] = { 'Notas': [], 'Desvios': [] };
    jsonCluster[element['Docente']]['Componentes'][element['Componente Curricular']]['Notas'] = [element['Média Geral']]
    jsonCluster[element['Docente']]['Componentes'][element['Componente Curricular']]['Desvios'] = [element['Desvio Padrão Geral']]

  }



  if (jsonClusterClasses[element['Componente Curricular']]) {

    jsonClusterClasses[element['Componente Curricular']]['Notas'].push(element['Média Geral'])
    jsonClusterClasses[element['Componente Curricular']]['Desvios'].push(element['Desvio Padrão Geral'])

    if (!jsonClusterClasses[element['Componente Curricular']]['Docentes'].includes(element['Docente'])) {
      jsonClusterClasses[element['Componente Curricular']]['Docentes'].push(element['Docente'])
    }

  } else {

    jsonClusterClasses[element['Componente Curricular']] = { 'Notas': [], 'Desvios': {}, 'Docentes': [] };


    jsonClusterClasses[element['Componente Curricular']]['Notas'] = [element['Média Geral']]
    jsonClusterClasses[element['Componente Curricular']]['Desvios'] = [element['Desvio Padrão Geral']]
    jsonClusterClasses[element['Componente Curricular']]['Docentes'] = [element['Docente']]

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

  // 0.3 é uma nota OK, acima de 0.4 já é ruim
  if (desvioDeNotas > 0.3) {
    console.log(desvioDeNotas, ` : ${k}`);
  }

  for (ki in jsonCluster[k]['Componentes']) {
    let desvioDeNotasComponente = desvioPadrao(jsonCluster[k]['Componentes'][ki]['Notas']);
    let mediaDeNotasComponente = jsonCluster[k]['Componentes'][ki]['Notas'].reduce((total, number) => { return total + number }, 0) / jsonCluster[k]['Componentes'][ki]['Notas'].length;
    jsonCluster[k]['Componentes'][ki]['DesvioDeNotas'] = desvioDeNotasComponente;
    jsonCluster[k]['Componentes'][ki]['MediaDeNotas'] = mediaDeNotasComponente;

    var notasOrdenadasComponente = jsonCluster[k]['Componentes'][ki]['Notas'].sort();
    var notaMedianaComponente = notasOrdenadasComponente[Math.round((jsonCluster[k]['Componentes'][ki]['Notas'].length - 1) / 2)];
    jsonCluster[k]['Componentes'][ki]['NotaMediana'] = notaMedianaComponente;
  }


  // Exibir recordes de desvio de Nota
  // if (desvioDeNotas > maioresDesviosDeNota) {
  //   maioresDesviosDeNota = desvioDeNotas;
  //   maioresDesviosDeNotaArray.push({ "Docente": k, "Desvio Por Semestre": maioresDesviosDeNota });
  //    console.log(maioresDesviosDeNota, ` : ${k}`);
  // }
}

for (k in jsonClusterClasses) {
  let desvioDeNotas = desvioPadrao(jsonClusterClasses[k]['Notas']);
  let mediaDeNotas = jsonClusterClasses[k]['Notas'].reduce((total, number) => { return total + number }, 0) / jsonClusterClasses[k]['Notas'].length;
  jsonClusterClasses[k]['DesvioDeNotas'] = desvioDeNotas;
  jsonClusterClasses[k]['MediaDeNotas'] = mediaDeNotas;

  var notasOrdenadas = jsonClusterClasses[k]['Notas'].sort();
  var notaMediana = notasOrdenadas[Math.round((jsonClusterClasses[k]['Notas'].length - 1) / 2)];
  jsonClusterClasses[k]['NotaMediana'] = notaMediana;

  if (desvioDeNotas > 0.4) {
    console.log(desvioDeNotas, ` : ${k}`);
  }
}

async function refineNotasAndDesvios(dataCluster) {

  dataClusterString = await JSON.stringify(dataCluster, null, 2);

  fs.writeFile('./dados/2019-2017-refined.json', dataClusterString, function (err) {
    if (err) throw err;
    console.log('Saved Refined!');
  });

  let dataClusterClassesString = await JSON.stringify(jsonClusterClasses, null, 2);

  fs.writeFile('./dados/2019-2017-refined-classes.json', dataClusterClassesString, function (err) {
    if (err) throw err;
    console.log('Saved Refined Classes!');
  });

  let usefullData = await JSON.stringify(maioresDesviosDeNotaArray, null, 2);

  fs.writeFile('./dados/usefullData.json', usefullData, function (err) {
    if (err) throw err;
    console.log('Saved Usefull!');
  });

}

refineNotasAndDesvios(jsonCluster);