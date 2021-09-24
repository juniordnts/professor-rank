import React from "react";
import { Link } from "react-router-dom";
import { PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";

function ParamsForm({ setParametros }) {
  const [popoverVer, setPopoverVer] = React.useState(false);
  const toggleVer = () => setPopoverVer(!popoverVer);

  const [popoverAma, setPopoverAma] = React.useState(false);
  const toggleAma = () => setPopoverAma(!popoverAma);

  const [notaVer, setNotaVer] = React.useState(9.2);
  const [desvioVer, setDesvioVer] = React.useState(1.9);
  const [notaAma, setNotaAma] = React.useState(8.7);
  const [desvioAma, setDesvioAma] = React.useState(2.2);

  React.useEffect(() => {}, []);

  return (
    <div className="row bg-transparent mt-3">
      <div className="col-md-6 bg-transparent">
        <div class="form-group bg-transparent">
          <label className="text-muted">
            <button
              id={"pointpopover-notaVer"}
              className="btn-transparent"
              onClick={(e) => e.currentTarget.focus()}
            >
              <i className={"fas fa-info-circle"}></i>
            </button>
            Nota Verde [<span>{notaVer}</span>]
          </label>
          <input
            step={0.1}
            value={notaVer}
            max={10}
            min={0}
            type="range"
            class="form-control-range"
            onChange={(e) => setNotaVer(parseFloat(e.target.value))}
          />
        </div>
        <UncontrolledPopover
          trigger="focus"
          placement="top"
          isOpen={popoverVer}
          target={"pointpopover-notaVer"}
          toggle={toggleVer}
        >
          <PopoverHeader>Bolinha Verde</PopoverHeader>
          <PopoverBody>
            <p className="mb-1">
              Juntamente com o Desvio Padrão Verde, define se a bolinha ficará verde.
            </p>
            <p className="mb-0">
              Ex. Caso o valor da nota seja maior ou igual e o desvio menor ou igual ao valores
              escolhidos, a bolinha será verder
            </p>
          </PopoverBody>
        </UncontrolledPopover>
      </div>
      <div className="col-md-6">
        <div class="form-group bg-transparent">
          <label className="text-muted">
            Desvio Padrão Verde [<span>{desvioVer}</span>]
          </label>
          <input
            step={0.1}
            value={desvioVer}
            max={10}
            min={0}
            type="range"
            class="form-control-range"
            onChange={(e) => setDesvioVer(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="col-md-12 bg-transparent d-md-none">
        <hr className="with-border" />
        <p className={"d-none"}></p>
      </div>

      <div className="col-md-6 bg-transparent">
        <div class="form-group bg-transparent">
          <label className="text-muted">
            <button
              id={"pointpopover-notaAma"}
              className="btn-transparent"
              onClick={(e) => e.currentTarget.focus()}
            >
              <i className={"fas fa-info-circle"}></i>
            </button>
            Nota Amarelo [<span>{notaAma}</span>]
          </label>
          <input
            step={0.1}
            value={notaAma}
            max={10}
            min={0}
            type="range"
            class="form-control-range"
            onChange={(e) => setNotaAma(parseFloat(e.target.value))}
          />
        </div>
        <UncontrolledPopover
          trigger="focus"
          placement="top"
          isOpen={popoverAma}
          target={"pointpopover-notaAma"}
          toggle={toggleAma}
        >
          <PopoverHeader>Bolinha Amarelo</PopoverHeader>
          <PopoverBody>
            <p className="mb-1">
              Juntamente com o Desvio Padrão Amarelo, define se a bolinha ficará amarelo.
            </p>
            <p className="mb-0">
              Ex. Caso o valor da nota seja maior ou igual e o desvio menor ou igual ao valores
              escolhidos, a bolinha será amarelo. Caso contrário será vermelho
            </p>
          </PopoverBody>
        </UncontrolledPopover>
      </div>
      <div className="col-md-6">
        <div class="form-group bg-transparent">
          <label className="text-muted">
            Desvio Padrão Amarelo [<span>{desvioAma}</span>]
          </label>
          <input
            step={0.1}
            value={desvioAma}
            max={10}
            min={0}
            type="range"
            class="form-control-range"
            onChange={(e) => setDesvioAma(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="col-12 text-right">
        <button
          class="py-1 mx-1 btn btn-outline-secondary"
          onClick={() => {
            setNotaVer(9.2);
            setDesvioVer(1.9);
            setNotaAma(8.7);
            setDesvioAma(2.2);
            setParametros({
              notaVer: 9.2,
              desvioVer: 1.9,
              notaAma: 8.7,
              desvioAma: 2.2,
            });
          }}
        >
          Resetar
        </button>
        <button
          class="py-1 mx-1 btn btn-outline-primary"
          onClick={() => {
            setParametros({
              notaVer,
              desvioVer,
              notaAma,
              desvioAma,
            });
          }}
        >
          Aplicar Parâmetros
        </button>
      </div>
    </div>
  );
}

export default ParamsForm;
