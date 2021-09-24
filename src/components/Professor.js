import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";

function Professor({ professorInfo, professorName, search, parametros }) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const [popoverOpenDis, setPopoverOpenDis] = React.useState(false);
  const toggleDis = () => setPopoverOpenDis(!popoverOpenDis);

  const avalNota = (infoAval) => {
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
  };

  const handleSearchShow = () => {
    if (search !== "") {
      if (professorName.toUpperCase().includes(search.toUpperCase())) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  React.useEffect(() => {}, [parametros]);

  return (
    <tr className={handleSearchShow() ? "" : "d-none"}>
      <th scope="row">
        <button
          id={"pointpopover-" + professorName.replace(/[^a-zA-Z0-9]/g, "_")}
          className="btn-transparent"
          onClick={(e) => e.currentTarget.focus()}
        >
          <i className={"fas fa-circle " + avalNota(professorInfo)}></i>
        </button>
        <UncontrolledPopover
          trigger="focus"
          placement="top"
          isOpen={popoverOpen}
          target={"pointpopover-" + professorName.replace(/[^a-zA-Z0-9]/g, "_")}
          toggle={toggle}
        >
          <PopoverHeader>Pontuação</PopoverHeader>
          <PopoverBody>
            <b>
              <i className="fas fa-chart-bar" /> {professorInfo.MediaDeNotas.toFixed(2)}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i className="fab fa-deviantart" /> {professorInfo.MediaDeDesvios.toFixed(2)}
            </b>
          </PopoverBody>
        </UncontrolledPopover>
      </th>
      <td>{professorName}</td>
      <td>
        <button
          id={"dispopover-" + professorName.replace(/[^a-zA-Z0-9]/g, "_")}
          className="btn-transparent"
          onClick={(e) => e.currentTarget.focus()}
        >
          <i className="fas fa-chalkboard-teacher"></i>
        </button>
        <UncontrolledPopover
          trigger="focus"
          placement="top"
          isOpen={popoverOpenDis}
          target={"dispopover-" + professorName.replace(/[^a-zA-Z0-9]/g, "_")}
          toggle={toggleDis}
        >
          <PopoverHeader>Disciplinas</PopoverHeader>
          <PopoverBody>
            {Object.keys(professorInfo.Componentes).map((componentName) => (
              <React.Fragment key={componentName}>
                <small>
                  <i
                    className={
                      "fas fa-circle " + avalNota(professorInfo.Componentes[componentName])
                    }
                  ></i>{" "}
                  {componentName}
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

export default Professor;
