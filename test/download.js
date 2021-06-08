// Gerar arquivos com os dado baixados da API. Evitando sempre fazer requisição.accent-1

var fetch = require("node-fetch");
var fs = require('fs').promises;

var limite = "20000000"

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


async function setToArrayId(array, campoId) {
  let arrayData = {}
  await array.forEach(element => {
    arrayData[element[campoId]] = element
  });
  return arrayData
}


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
  // urlDo = promData.result.records;

  prom = await fetch(urlUa);
  promData = await prom.json();
  urlUa = await setToArrayId(promData.result.records, 'id_unidade');
  // urlUa = promData.result.records;

  prom = await fetch(urlCc);
  promData = await prom.json();
  urlCc = await setToArrayId(promData.result.records, 'id_componente');
  // urlCc = promData.result.records;

  prom = await fetch(urlT192);
  promData = await prom.json();
  urlT192 = await setToArrayId(promData.result.records, "id_turma");
  // urlT192 = promData.result.records;

  prom = await fetch(urlT191);
  promData = await prom.json();
  urlT191 = await setToArrayId(promData.result.records, "id_turma");
  // urlT191 = promData.result.records;

  prom = await fetch(urlT182);
  promData = await prom.json();
  urlT182 = await setToArrayId(promData.result.records, "id_turma");
  // urlT182 = promData.result.records;

  prom = await fetch(urlT181);
  promData = await prom.json();
  urlT181 = await setToArrayId(promData.result.records, "id_turma");
  // urlT181 = promData.result.records;

  prom = await fetch(urlT172);
  promData = await prom.json();
  urlT172 = await setToArrayId(promData.result.records, "id_turma");
  // urlT172 = promData.result.records;


  console.log("Json Data downloaded");
  return true;
}

getJsonData().then(async (res) => {

  await fs.writeFile('./dados/_avaliacoes_de_docentes.json', JSON.stringify(urlAd, null, 2))
  console.log('Saved: avaliacoes_de_docentes');

  await fs.writeFile('./dados/_docentes.json', JSON.stringify(urlDo, null, 2))
  console.log('Saved: docentes');

  await fs.writeFile('./dados/_unidades_academicas.json', JSON.stringify(urlUa, null, 2))
  console.log('Saved: unidades_academicas');

  await fs.writeFile('./dados/_componentes_curriculares_presenciais.json', JSON.stringify(urlCc, null, 2))
  console.log('Saved: componentes_curriculares_presenciais');

  await fs.writeFile('./dados/_turma_19.2.json', JSON.stringify(urlT192, null, 2))
  console.log('Saved: turma_19.2');

  await fs.writeFile('./dados/_turma_19.1.json', JSON.stringify(urlT191, null, 2))
  console.log('Saved: turma_19.1');

  await fs.writeFile('./dados/_turma_18.2.json', JSON.stringify(urlT182, null, 2))
  console.log('Saved: turma_18.2');

  await fs.writeFile('./dados/_turma_18.1.json', JSON.stringify(urlT181, null, 2))
  console.log('Saved: turma_18.1');

  await fs.writeFile('./dados/_turma_17.2.json', JSON.stringify(urlT172, null, 2))
  console.log('Saved: turma_17.2');


})