import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  React.useEffect(() => {}, []);

  return (
    <div className="container mt-4 p-3 rounded">
      <p className="text-muted">
        O departamento do <span className="text-primary">seu curso não aparece?</span> Envie uma
        mensagem que eu coloco assim que puder.
      </p>
      <p className="text-muted">
        Caso queira receber algum informe de quando for publicado,
        <span className="text-primary"> insira seu email</span> na mensagem.
      </p>

      <div className="input-group mb-3">
        <input type="text" className="form-control enviar-msg" placeholder="Sua mensagem e email" />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" id="send-message" type="button">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
