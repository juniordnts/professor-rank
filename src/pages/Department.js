import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import data from "../assets/data";
import Professor from "../components/Professor";

import firebase from "../config/firebase";

function Department({}) {
  let history = useHistory();
  let { departmentKey } = useParams();

  const [jsonData, setJsonData] = React.useState({});
  const [loader, setLoader] = React.useState(true);
  const [name, setName] = React.useState("");

  const [search, setSeach] = React.useState("");

  const searchDepartmenteName = async () => {
    let departmentFind = "";
    for (const center of data) {
      let itemFound = center.departments.find(
        (department) => department.departmentAbreviation === departmentKey
      );
      if (itemFound?.departmentName) {
        departmentFind = itemFound?.departmentName;
        break;
      }
    }
    setName(departmentFind);
  };

  const handleSetName = () => {
    if (!history.location?.state?.department?.departmentName) searchDepartmenteName();
    else setName(history.location?.state?.department.departmentName);
  };

  const orderedObject = (itemObject) => {
    return Object.keys(itemObject)
      .sort()
      .reduce((obj, key) => {
        obj[key] = itemObject[key];
        return obj;
      }, {});
  };

  const getJsonData = async () => {
    const jsonFilePath = `/data/${departmentKey}/2019-2017-refined.json`;
    fetch(jsonFilePath)
      .then(async (res) => {
        let resData = await res.json();
        let ordered = orderedObject(resData);
        setJsonData(ordered);
      })
      .catch((err) => {
        alert("Erro ao carregar dados");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  React.useEffect(() => {
    firebase.analytics().logEvent("select_content", {
      department: departmentKey,
    });

    getJsonData();
    handleSetName();
  }, []);

  return (
    <div className="mb-5">
      <div className="container">
        <nav className="navbar navbar-light p-0 mt-3">
          <Link className="py-1 mx-1 nav-item nav-link btn btn-outline-primary" to="/" role="tab">
            <i className="fas fa-arrow-left mr-3"></i>Voltar
          </Link>
        </nav>
      </div>

      <div className="container">
        <div className="tab-content text-white">
          <div className="container text-center mt-4">
            <h5 id="dep-name" className="text-primary font-weight-light">
              {name}
            </h5>
          </div>

          {/* <!-- Ver Professores --> */}
          <div className="tab-pane fade show active" id="geral">
            <input
              type="text"
              className="form-control mt-4 buscar-professor w-100"
              placeholder="Buscar Professor"
              value={search}
              onChange={(e) => setSeach(e.target.value)}
            />
            <div className="container mt-5 p-2 rounded">
              <div className="text-center d-none">Sem resultados para a busca</div>
              <div className="p-3">
                <p className="mb-1">
                  <small className="text-muted"> A lista está em ordem alfabética. </small>
                </p>
                <p>
                  <small className="text-muted">
                    Você pode clicar em "<i className="fas fa-chalkboard-teacher"></i>" para ver a
                    avaliação desse professor nas turmas que ele lecionou. A nota final dele é um
                    média destas.
                  </small>
                </p>
              </div>

              {loader && (
                <h1 className="text-center h1" id="loader">
                  <i className="fas fa-spinner fa-spin text-primary"></i>
                </h1>
              )}

              <table className="table table-hover mb-0" style={{ tableLayout: "fixed" }}>
                <tbody id="table-geral">
                  {Object.keys(jsonData).map((professor) => (
                    <Professor
                      key={professor}
                      professorInfo={jsonData[professor]}
                      professorName={professor}
                      search={search}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* <!-- Comparar Professores --> */}
          <div className="tab-pane fade" id="professores">
            <input
              type="text"
              className="form-control mx-auto mt-5 buscar-professor"
              placeholder="Buscar Professor"
            />
            <div className="quadro-resultados rounded">
              <small>
                <div className="container mt-4 p-2 rounded">
                  <div className="text-center pb-2">
                    <span>QUADRO DE COMPARAÇÃO</span>
                    <button
                      className="btn-transparent ajuda"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Clique para ver ajuda"
                    >
                      <i className="fas fa-question-circle"></i>
                    </button>
                  </div>
                  <table
                    className="table table-hover mb-0 mx-auto"
                    style={{ tableLayout: "fixed" }}
                  >
                    <tbody id="table-comparacao" className="w-100"></tbody>
                  </table>
                </div>
              </small>
            </div>
            <br />
            <p>
              <small className="text-muted">Clique duas vezes para adicionar ou remover</small>
            </p>
            <div className="container p-2 rounded quadro-normal">
              <div className="text-center d-none">SEM RESULTADOS PARA A BUSCA</div>
              <table className="table table-hover mb-0" style={{ tableLayout: "fixed" }}>
                <tbody id="table-professores"></tbody>
              </table>
            </div>
          </div>

          {/* <!-- Comparar Disciplinas --> */}
          <div className="tab-pane fade" id="disciplinas">
            <input
              type="text"
              className="form-control mx-auto mt-5 buscar-professor"
              id="buscar-professor"
              placeholder="Buscar Disciplina"
            />

            <div className="quadro-resultados rounded">
              <small>
                <div className="container mt-4 p-3 rounded">
                  <div className="text-center pb-2">
                    <span>
                      <b>ECT2205 - PRÁTICAS DE LEITURA E ESCRITA II</b>
                    </span>
                  </div>
                  <div className="text-center pb-2">
                    <span>QUADRO DE COMPARAÇÃO</span>
                  </div>
                  <div className="text-center pb-2">
                    <span>ESCOLHA UMA DISCIPLINA</span>
                    <button
                      className="btn-transparent ajuda"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Clique para ver ajuda"
                    >
                      <i className="fas fa-question-circle"></i>
                    </button>
                  </div>
                  <table
                    className="table table-hover mb-0 mx-auto"
                    style={{ tableLayout: "fixed" }}
                  >
                    <tbody>
                      <tr>
                        <td data-toggle="tooltip" data-placement="top" title="1° Lugar">
                          <i className="fas fa-trophy"></i>
                        </td>
                        <th scope="row">
                          <button
                            className="btn-transparent"
                            data-toggle="popover"
                            title="Pontuação"
                            data-trigger="focus"
                            data-placement="top"
                            data-content="<b><i class='fas fa-chart-bar'/> 9.51 &nbsp&nbsp <i class='fab fa-deviantart'/> 1.38</b>"
                          >
                            <i className="fas fa-circle text-success"></i>
                          </button>
                        </th>
                        <td>ADA LIMA FERREIRA DE SOUSA</td>
                        <td>
                          <button
                            className="btn-transparent"
                            data-toggle="popover"
                            title="Disciplinas"
                            data-trigger="focus"
                            data-placement="top"
                            data-content="<i class='fas fa-circle text-success'></i> ECT2105 - PRÁTICAS DE LEITURA E ESCRITA I<hr /><i class='fas fa-circle text-success'></i> ECT2205 - PRÁTICAS DE LEITURA E ESCRITA II"
                          >
                            <i className="fas fa-chalkboard-teacher"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn-transparent"
                            data-toggle="popover"
                            title="Um amorzinho"
                            data-trigger="focus"
                            data-placement="top"
                            data-content="Não tem nem o que falar 😊"
                          >
                            <i className="fas fa-heart text-success"></i>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td data-toggle="tooltip" data-placement="top" title="2° Lugar">
                          <i className="fas fa-medal"></i>
                        </td>
                        <th scope="row">
                          <button
                            className="btn-transparent"
                            data-toggle="popover"
                            title="Pontuação"
                            data-trigger="focus"
                            data-placement="top"
                            data-content="<b><i class='fas fa-chart-bar'/> 9.32 &nbsp&nbsp <i class='fab fa-deviantart'/> 1.95</b>"
                          >
                            <i className="fas fa-circle text-warning"></i>
                          </button>
                        </th>
                        <td>ALEXANDRE MAGNUS FERNANDES</td>
                        <td>
                          <button
                            className="btn-transparent"
                            data-toggle="popover"
                            title="Disciplinas"
                            data-trigger="focus"
                            data-placement="top"
                            data-content="<i class='fas fa-circle text-success'></i> ECT2414 - ELETRICIDADE APLICADA"
                          >
                            <i className="fas fa-chalkboard-teacher"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn-transparent"
                            data-toggle="popover"
                            title="Tenha cuidado"
                            data-trigger="focus"
                            data-placement="top"
                            data-content="Talvez seja melhor procurar outro professor 😐"
                          >
                            <i className="fas fa-exclamation-circle text-warning"></i>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td data-toggle="tooltip" data-placement="top" title="3° Lugar">
                          <i className="fas fa-weight-hanging"></i>
                        </td>
                        <th scope="row">
                          <button
                            className="btn-transparent"
                            data-toggle="popover"
                            title="Pontuação"
                            data-trigger="focus"
                            data-placement="top"
                            data-content="<b><i class='fas fa-chart-bar'/> 8.95 &nbsp&nbsp <i class='fab fa-deviantart'/> 3.57</b>"
                          >
                            <i className="fas fa-circle text-danger"></i>
                          </button>
                        </th>
                        <td>ALEXSANDRO PEREIRA LIMA</td>
                        <td>
                          <button
                            className="btn-transparent"
                            data-toggle="popover"
                            title="Disciplinas"
                            data-trigger="focus"
                            data-placement="top"
                            data-content="<i class='fas fa-circle text-warning'></i> ECT2103 - CÁLCULO I<hr /><i class='fas fa-circle text-warning'></i> ECT2201 - CÁLCULO II<hr /><i class='fas fa-circle text-danger'></i> ECT2201 - CÁLCULO III"
                          >
                            <i className="fas fa-chalkboard-teacher"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn-transparent"
                            data-toggle="popover"
                            title="Vixi"
                            data-trigger="focus"
                            data-placement="top"
                            data-content="Se é sua unica opção, boa sorte 😥<hr class='m-2'/>Esse professor(a) varia o 'humor' de semestre para semestre"
                          >
                            <i className="fas fa-radiation text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </small>
            </div>

            <div className="container mt-4 p-2 rounded quadro-normal">
              <div className="text-center d-none">SEM RESULTADOS PARA A BUSCA</div>
              <table className="table table-hover mb-0" style={{ tableLayout: "fixed" }}>
                <tbody>
                  <tr>
                    <th scope="row">
                      <button
                        className="btn-transparent"
                        data-toggle="popover"
                        title="Pontuação"
                        data-trigger="focus"
                        data-placement="top"
                        data-content="<b><i class='fas fa-chart-bar'/> 9.51 &nbsp&nbsp <i class='fab fa-deviantart'/> 1.38</b>"
                      >
                        <i className="fas fa-circle text-success"></i>
                      </button>
                    </th>
                    <td>ECT2540 - PROGRAMAÇÃO ORIENTADA A OBJETOS</td>
                    <td>
                      <button
                        className="btn-transparent"
                        data-toggle="popover"
                        title="Um amorzinho"
                        data-trigger="focus"
                        data-placement="top"
                        data-content="Não tem nem o que falar 😊"
                      >
                        <i className="fas fa-heart text-success"></i>
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <button
                        className="btn-transparent"
                        data-toggle="popover"
                        title="Pontuação"
                        data-trigger="focus"
                        data-placement="top"
                        data-content="<b><i class='fas fa-chart-bar'/> 9.32 &nbsp&nbsp <i class='fab fa-deviantart'/> 1.95</b>"
                      >
                        <i className="fas fa-circle text-warning"></i>
                      </button>
                    </th>
                    <td>ECT2206 - GESTÃO E ECONOMIA DA CIÊNCIA</td>
                    <td>
                      <button
                        className="btn-transparent"
                        data-toggle="popover"
                        title="Tenha cuidado"
                        data-trigger="focus"
                        data-placement="top"
                        data-content="Talvez seja melhor procurar outro professor 😐"
                      >
                        <i className="fas fa-exclamation-circle text-warning"></i>
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <button
                        className="btn-transparent"
                        data-toggle="popover"
                        title="Pontuação"
                        data-trigger="focus"
                        data-placement="top"
                        data-content="<b><i class='fas fa-chart-bar'/> 8.95 &nbsp&nbsp <i class='fab fa-deviantart'/> 3.57</b>"
                      >
                        <i className="fas fa-circle text-danger"></i>
                      </button>
                    </th>
                    <td>ECT2105 - PRÁTICAS DE LEITURA E ESCRITA I</td>
                    <td>
                      <button
                        className="btn-transparent"
                        data-toggle="popover"
                        title="Vixi"
                        data-trigger="focus"
                        data-placement="top"
                        data-content="Se é sua unica opção, boa sorte 😥<hr class='m-2'/>Esse professor(a) varia o 'humor' de semestre para semestre"
                      >
                        <i className="fas fa-radiation text-danger"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;
