import React from "react";
import { Link } from "react-router-dom";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import data from "./../assets/data";
import firebase from "./../config/firebase";
import NewVersionBanner from "../components/NewVersionBanner";

function Home() {
  const [showModal, setShowModal] = React.useState(true);

  React.useEffect(() => {
    firebase.analytics().logEvent("home");
  }, []);

  return (
    <>
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-md modal-dialog-centered container ">
            <div className="modal-content p-4">
              <NewVersionBanner />

              <p className="mt-4 mb-2 small">Ou você pode continuar nessa versão:</p>

              <button type="button" class="btn btn-dark" onClick={() => setShowModal(false)}>
                Usar Versão Antiga
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mb-5">
        <div className="tab-content text-white">
          <h1 style={{ fontSize: 1, opacity: 0 }}>Rank Professores UFRN</h1>
          <p className="text-primary h2 text-center mt-5 font-weight-light">
            Avaliação Semestral de Professores Compilada
          </p>

          <div className="tab-pane fade show active mb-5" id="geral">
            <div className="container mt-5 p-3 rounded">
              <div className="text-center d-none">Sem resultados para a busca</div>
              <small>
                <p className="text-warning text-center">Avisos:</p>
                <p className="text-muted ">
                  As informações presentes neste relatório são compiladas do Sigaa com os dados
                  fornecidos pela Avaliação Semestral e por esse motivo não expressam nenhuma
                  opinião pessoal do desenvolvedor para com os professores.
                </p>
                <p className="text-muted ">
                  Atualmente os dados compilados são de 2017.1 à 2019.2. Devido a pandemia a
                  avaliação ficou comprometida. Acredito que consigo colocar os dados atualizados
                  somente em 2021.1
                </p>
              </small>

              <NewVersionBanner />

              <hr className="with-border" />

              <p className="text-primary text-center small">Escolha um departamento:</p>

              {data.map((center, index) => (
                <div key={index}>
                  {index > 0 && <br />}
                  <small className="text-center text-muted">{center.centerName}</small>
                  <br />
                  <br />

                  {center.departments.map((department) => (
                    <Link
                      key={department.departmentAbreviation}
                      className="btn btn-outline-primary m-1"
                      to={{
                        pathname: "/departamento/" + department.departmentAbreviation,
                        state: { department },
                      }}
                    >
                      {department.departmentName}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* <Contact /> */}

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
