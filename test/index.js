var request = require("request");
var fetch = require("node-fetch");
var fs = require('fs');

var resultData = {}

var limite = "200000000"

// AVALIAÇÕES DE DOCENTES
var urlAd = "http://dados.ufrn.br/api/action/datastore_search?resource_id=7accd1d2-2793-460e-b98d-87a0679b9155&limit=" + limite;
// DOCENTES
var urlDo = "http://dados.ufrn.br/api/action/datastore_search?resource_id=ff0a457e-76fa-4aca-ad99-48aebd7db070&limit=" + limite;
// UNIDADES ACADÊMICAS
var urlUa = "http://dados.ufrn.br/api/action/datastore_search?resource_id=a375d7c0-2961-4c24-b86d-b82f18e16da8&limit=" + limite;
// COMPONENTES CURRICULARES PRESENCIAIS
var urlCc = "http://dados.ufrn.br/api/action/datastore_search?resource_id=9a3521d2-4bc5-4fda-93f0-f701c8a20727&limit=" + limite;

// TURMA 19.2
var urlT192 = "http://dados.ufrn.br/api/action/datastore_search?resource_id=d9c2863e-d1b2-4afd-b7dd-09517d5ed17d&limit=" + limite;
// TURMA 19.1
var urlT191 = "http://dados.ufrn.br/api/action/datastore_search?resource_id=1e42cd66-69d6-48d5-a346-d46766fd2c9c&limit=" + limite;
// TURMA 18.2
var urlT182 = "http://dados.ufrn.br/api/action/datastore_search?resource_id=77fe7603-0e71-4e21-8cd4-cb823353023f&limit=" + limite;
// TURMA 18.1
var urlT181 = "http://dados.ufrn.br/api/action/datastore_search?resource_id=3ae16138-4214-4a30-ac2d-6cffd6237031&limit=" + limite;
// TURMA 17.2
var urlT172 = "http://dados.ufrn.br/api/action/datastore_search?resource_id=01fe7343-fdf0-4a67-b915-2386b7c2fecb&limit=" + limite;

// ---------------------------------------------------------------------------

async function setToArrayId(array, campoId) {
  let arrayData = []
  await array.forEach(element => {
    arrayData[element[campoId]] = element
  });
  return arrayData
}

// ---------------------------------------------------------------------------

async function getJsonData() {
  console.log("Downloading Json Data");

  let prom;
  let promData;

  prom = await fetch(urlAd);
  promData = await prom.json();
  urlAd = promData.result.records;
  prom = await fetch(urlDo);
  promData = await prom.json();
  urlDo = await setToArrayId(promData.result.records, '_id');
  prom = await fetch(urlUa);
  promData = await prom.json();
  urlUa = await setToArrayId(promData.result.records, 'id_unidade');
  prom = await fetch(urlCc);
  promData = await prom.json();
  urlCc = await setToArrayId(promData.result.records, 'id_componente');
  prom = await fetch(urlT192);
  promData = await prom.json();
  urlT192 = await setToArrayId(promData.result.records, "id_turma");
  prom = await fetch(urlT191);
  promData = await prom.json();
  urlT191 = await setToArrayId(promData.result.records, "id_turma");
  prom = await fetch(urlT182);
  promData = await prom.json();
  urlT182 = await setToArrayId(promData.result.records, "id_turma");
  prom = await fetch(urlT181);
  promData = await prom.json();
  urlT181 = await setToArrayId(promData.result.records, "id_turma");
  prom = await fetch(urlT172);
  promData = await prom.json();
  urlT172 = await setToArrayId(promData.result.records, "id_turma");

  console.log("Json Data downloaded");
  return true;
}

// ---------------------------------------------------------------------------

function getDepartament(id_turma, ano, periodo, id_docente) {
  console.log(id_turma, ano, periodo, id_docente);
  console.log("Searching department...");

  let turma
  if (ano == "2017" && periodo == "2") { turma = urlT172 }
  if (ano == "2018" && periodo == "1") { turma = urlT181 }
  if (ano == "2018" && periodo == "2") { turma = urlT182 }
  if (ano == "2019" && periodo == "1") { turma = urlT191 }
  if (ano == "2019" && periodo == "2") { turma = urlT192 }

  // console.log(turma[String(id_turma)]);

  if (turma[String(id_turma)]) {

    let _id_componente = turma[id_turma]['id_componente_curricular'];

    if (urlCc[_id_componente]) {

      let departamentoReponsavel = urlCc[_id_componente].id_componente;
      let nomeComponente = urlCc[_id_componente].nome;
      let codigoComponente = urlCc[_id_componente].codigo;

      console.log("Found Department: ", "'" + departamentoReponsavel + "'");
      return [departamentoReponsavel, nomeComponente, codigoComponente];

    } else {
      return [false, false, false];
    }
  } else {
    return [false, false, false];
  }


}

// ---------------------------------------------------------------------------

async function iterateAvaliacao() {

  await urlAd.forEach(element => {
    if (parseInt(element.ano) + parseInt(element.periodo) >= 2019) {

      var resposta = getDepartament(element.id_turma, element.ano, element.periodo, element.id_docente)
      var Departamento = resposta[0]
      var NomeComponente = resposta[1]
      var CodComponente = resposta[2]

      console.log(Departamento ? console.log(Departamento + " - TRUE") : console.log(Departamento + " - FALSE"));

      if (Departamento) {

        if (!resultData[Departamento]) {
          resultData[Departamento] = {}
        }

        ReprComponente = NomeComponente + " - " + CodComponente;

        if (!resultData[Departamento][String(element.id_docente)]) {
          resultData[Departamento][String(element.id_docente)] = {}
        }

        if (urlDo[element.id_docente]) {
          resultData[Departamento][String(element.id_docente)]["Dados"].professor = urlDo[element.id_docente].nome
          resultData[Departamento][String(element.id_docente)]["Dados"].departamento = urlDo[element.id_docente].lotacao
        }
        resultData[Departamento][String(element.id_docente)]["Componentes"][String(ReprComponente)] = []
        resultData[Departamento][String(element.id_docente)]["Componentes"][String(ReprComponente)].push(
          {
            nota: element['autoavaliacao_aluno_media'],
            desvio: element['autoavaliacao_aluno_DP']
          }
        )
      } else {

        console.log("No Department");

      }

    }
  });

  fs.writeFile('./dados/resultado.json', JSON.stringify(resultData, null, 2), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

}

// ---------------------------------------------------------------------------

getJsonData().then(res => {
  iterateAvaliacao();
});