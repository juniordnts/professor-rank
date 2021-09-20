import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

function Professor({ professorInfo, professorName, search }) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const [popoverOpenDis, setPopoverOpenDis] = React.useState(false);
  const toggleDis = () => setPopoverOpenDis(!popoverOpenDis);

  const avalNota = (infoAval) => {
    if (infoAval.MediaDeNotas >= 9.2 && infoAval.MediaDeDesvios <= 1.9) {
      return "text-success";
    } else if (infoAval.MediaDeNotas >= 8.7 && infoAval.MediaDeDesvios <= 2.2) {
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

  React.useEffect(() => {}, []);

  return (
    <tr className={handleSearchShow() ? "" : "d-none"}>
      <th scope="row">
        <button
          id={"pointpopover-" + professorName.replace(/[^a-zA-Z0-9]/g, "_")}
          className="btn-transparent"
        >
          <i className={"fas fa-circle " + avalNota(professorInfo)}></i>
        </button>
        <Popover
          placement="top"
          isOpen={popoverOpen}
          target={"pointpopover-" + professorName.replace(/[^a-zA-Z0-9]/g, "_")}
          toggle={toggle}
        >
          <PopoverHeader>Pontuação</PopoverHeader>
          <PopoverBody>
            <b>
              <i className="fas fa-chart-bar" /> 8.54 &nbsp;&nbsp;&nbsp;&nbsp;
              <i className="fab fa-deviantart" /> 2.17
            </b>
          </PopoverBody>
        </Popover>
      </th>
      <td>{professorName}</td>
      <td>
        <button
          id={"dispopover-" + professorName.replace(/[^a-zA-Z0-9]/g, "_")}
          className="btn-transparent"
        >
          <i className="fas fa-chalkboard-teacher"></i>
        </button>
        <Popover
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
        </Popover>
      </td>
    </tr>
  );
}

export default Professor;
