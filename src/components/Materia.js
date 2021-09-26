import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";

function Materia({ materiaInfo, materiaName, search, parametros, profData }) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const [popoverOpenDis, setPopoverOpenDis] = React.useState(false);
  const toggleDis = () => setPopoverOpenDis(!popoverOpenDis);

  const avalNota = (infoAval) => {
    try {
      if (
        infoAval.MediaDeNotas >= parametros.notaVer &&
        infoAval.MediaDeDesvios <= parametros.desvioVer
      ) {
        return "text-success";
      } else if (
        infoAval.MediaDeNotas >= parametros.notaAma &&
        infoAval.MediaDeDesvios <= parametros.desvioAma
      ) {
        return "text-warning";
      }
      return "text-danger";
    } catch (error) {
      return "";
    }
  };

  const handleSearchShow = () => {
    if (search !== "") {
      if (materiaName.toUpperCase().includes(search.toUpperCase())) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  React.useEffect(() => {}, []);

  return (
    <tr className={handleSearchShow() ? "" : "d-none"}>
      <th scope="row">
        <button
          id={"pointpopover-" + materiaName.replace(/[^a-zA-Z0-9]/g, "_")}
          className="btn-transparent"
          onClick={(e) => e.currentTarget.focus()}
        >
          <i className={"fas fa-circle " + avalNota(materiaInfo)}></i>
        </button>
        <UncontrolledPopover
          trigger="focus"
          placement="top"
          isOpen={popoverOpen}
          target={"pointpopover-" + materiaName.replace(/[^a-zA-Z0-9]/g, "_")}
          toggle={toggle}
        >
          <PopoverHeader>Pontuação</PopoverHeader>
          <PopoverBody>
            <b>
              <i className="fas fa-chart-bar" /> {materiaInfo.MediaDeNotas.toFixed(2)}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i className="fab fa-deviantart" /> {materiaInfo.MediaDeDesvios.toFixed(2)}
            </b>
          </PopoverBody>
        </UncontrolledPopover>
      </th>
      <td>{materiaName}</td>
      <td>
        <button
          id={"dispopover-" + materiaName.replace(/[^a-zA-Z0-9]/g, "_")}
          className="btn-transparent"
          onClick={(e) => e.currentTarget.focus()}
        >
          <i className="fas fa-chalkboard-teacher"></i>
        </button>
        <UncontrolledPopover
          trigger="focus"
          placement="top"
          isOpen={popoverOpenDis}
          target={"dispopover-" + materiaName.replace(/[^a-zA-Z0-9]/g, "_")}
          toggle={toggleDis}
        >
          <PopoverHeader>Professores</PopoverHeader>
          <PopoverBody>
            {materiaInfo.Docentes.map((docenteName) => (
              <React.Fragment key={docenteName}>
                <small>
                  <i className={"fas fa-circle " + avalNota(profData[docenteName])}></i>{" "}
                  {docenteName}
                </small>
                <hr className="my-1" />
              </React.Fragment>
            ))}
          </PopoverBody>
        </UncontrolledPopover>
      </td>
    </tr>
  );
}

export default Materia;
