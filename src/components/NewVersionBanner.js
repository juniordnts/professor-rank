import React from "react";
import { Link } from "react-router-dom";

function NewVersionBanner() {
  React.useEffect(() => {}, []);

  return (
    <div className="bg-primary rounded px-2 py-4 text-center">
      <p className="text-white h5">
        Uma nova versão com dados atualizado e uma interface melhor está disponível em:
      </p>

      <a
        href="https://circular-ufrn.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline-light mt-2"
      >
        Circular UFRN <i className={"fas fa-arrow-right ml-2"}></i>
      </a>
    </div>
  );
}

export default NewVersionBanner;
