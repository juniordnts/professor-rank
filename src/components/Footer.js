import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  React.useEffect(() => {}, []);

  return (
    <footer className="text-muted">
      <hr className="featurette-divider" />
      {/* <p className="float-right">
          <a href="https://play.google.com/store/apps/details?id=com.circular.ufrn" target="_blank">
            <img src="./assets/css/white_icon.png" width="80" />
          </a>
        </p>
        <p>
          <span className="text-warning">Ei, você usa Circular?</span> Se usa, então baixa esse app
          aqui{" "}
          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.circular.ufrn">
            Circular UFRN (Link Play Store)
          </a>
          . Ele tem
          <span className="text-warning">cronograma de saída</span> e também mostra a{" "}
          <span className="text-warning">hora que os ônibus vão passar na sua parada</span>. Se usar
          o RU ele também mostra o <span className="text-warning">CARDÁPIO do RU</span>. Galado, tu
          tem que baixar isso. Se quiser pode pesquisar na Google Play por "
          <span className="text-warning">Circular UFRN</span>" que vai aparecer. Esse ai do lado é o
          ícone dele. Vê lá.
        </p> */}
      <p>
        Eu era de C&T, mudei pra TI. Só queria um diploma, não me falaram que eu tinha que sofrer
        tanto pra ter um...
      </p>
    </footer>
  );
}

export default Footer;
