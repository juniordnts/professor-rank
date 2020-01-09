class ComparaProf {

  // static lista = []
  // static listener

  static template(nome, nota, desvio, cor, i) {
    return `
    <tr data-toggle="tooltip" data-comp-prof="${nome}" data-placement="top" title="${i}° Lugar">
      <td><i class="fas fa-${ i == 1 ? 'trophy' : (ComparaProf.lista.length == i ? 'bomb' : 'medal')}"></i></td>
      <td>
        <button class="btn-transparent" data-toggle="popover" title="Pontuação" data-trigger="focus"
          data-placement="top"
          data-content="<b><i class='fas fa-chart-bar'/> ${nota} &nbsp&nbsp <i class='fab fa-deviantart'/> ${desvio}</b>">
          <i class="fas fa-circle ${cor}"></i>
        </button>
      </td>
      <td>${nome}</td>
    </tr>`
  }

  static adiciona(nome, nota, desvio, cor) {

    ComparaProf.lista ? NaN : ComparaProf.lista = []

    let geral = (nota - desvio).toFixed(3);
    let pushed = false;


    if (ComparaProf.lista.length) {
      if (ComparaProf.lista.filter((fv, fi) => nome == fv.nome).length) {
        return
      }
      for (let i in ComparaProf.lista) {
        // console.log("GERAIS: ", geral, ComparaProf.lista[i].geral, geral > ComparaProf.lista[i].geral);
        if (geral > ComparaProf.lista[i].geral) {
          // console.log("SPLICE");
          ComparaProf.lista.splice(i, 0, {
            nome: nome, nota: nota, desvio: desvio, cor: cor, geral: geral
          })
          pushed = true
          break;
        }
      }
      if (!pushed) {
        ComparaProf.lista.push({
          nome: nome, nota: nota, desvio: desvio, cor: cor, geral: geral
        })
      }
    } else {
      ComparaProf.lista.push({
        nome: nome, nota: nota, desvio: desvio, cor: cor, geral: geral
      })
    }
    ComparaProf.gera_quadro()
  }

  static remove(nome) {
    for (let i in ComparaProf.lista) {
      if (ComparaProf.lista[i].nome == nome) {
        ComparaProf.lista.splice(i, 1);
      }
    }
  }

  static gera_quadro() {
    $("#table-comparacao").html("")
    ComparaProf.lista.forEach((e, i) => {
      let template = ComparaProf.template(e.nome, e.nota.toFixed(2), e.desvio.toFixed(2), e.cor, i + 1)
      $("#table-comparacao").append(template)
    });
    setup_assets();
    ComparaProf.setListener()
  }

  static setListener() {
    $("[data-comp-prof]").off();
    $("[data-comp-prof]").dblclick(function (e) {
      ComparaProf.remove($(this)[0].dataset.compProf)
      $(this).remove()
    });
  }

}