class Professor {

  static lista = {}

  constructor(nome, componentes, nota, desvio, desvio_nota) {

    this.nome = nome
    this.componentes = componentes
    this.nota = nota
    this.desvio = desvio
    this.desvio_nota = desvio_nota

    this.aval = {}

    this.entities = {}
    this.template = {}

    Professor.lista[nome] = componentes

    this.init()
  }

  init() {
    this.avaliacao();
    this.build_template();
    this.on_click();
  }

  on_click() {
    this.template.geral.dblclick((e) => {
      e.preventDefault();
      if ($(".tab-pane.active").attr("id") == "professores") {
        $(this.template.geral[0]).animate({ opacity: "0" }, 150).animate({ opacity: "1" }, 150);
        ComparaProf.adiciona(this.nome, this.nota, this.desvio, this.aval.nota)
      }
    });
  }

  _aval_nota() {
    if (this.nota >= 9.2 && this.desvio <= 1.9) {
      return "text-success"
    } else if (this.nota >= 8.7 && this.desvio <= 2.2) {
      return "text-warning"
    }
    return "text-danger"
  }

  _aval_alert() {
    let dados = {
      cor: "",
      icone: "",
      titulo: "",
      mensagem: ""
    }
    if (this.nota >= 9.2 && this.desvio <= 1.9) {
      dados.cor = "text-success"
      dados.icone = "heart"
      dados.titulo = "Um amorzinho"
      dados.mensagem = "Só vai, que é sucesso 😊"
    } else if (this.nota >= 8.7 && this.desvio <= 2.2) {
      dados.cor = "text-warning"
      dados.icone = "exclamation-circle"
      dados.titulo = "Tenha cuidado"
      dados.mensagem = "Talvez seja melhor procurar outro professor 😐"
    } else {
      dados.cor = "text-danger"
      dados.icone = "radiation"
      dados.titulo = "Vixi"
      dados.mensagem = "Sua única opção? Meus pêsames 😥"
    }
    // if (this.desvio > 2.2) {
    //   dados.mensagem += "<hr class='m-2'/>Esse professor(a) varia o 'humor' de semestre para semestre<hr class='m-2'/>"
    // }
    return dados
  }

  _aval_disc() {

    let dados = "";
    $.each(this.componentes, (i, v) => {
      let str = "<small>"
      if (v["MediaDeNotas"] >= 9.2 && v["MediaDeDesvios"] <= 1.9) {
        str += "<i class='fas fa-circle text-success'></i> "
      } else if (v["MediaDeNotas"] >= 8.7 && v["MediaDeDesvios"] <= 2.2) {
        str += "<i class='fas fa-circle text-warning'></i> "
      } else {
        str += "<i class='fas fa-circle text-danger'></i> "
      }
      str += i + "</small><hr class='my-1'/>";
      dados += str
    });
    return dados
  }

  avaliacao() {
    this.aval.nota = this._aval_nota()
    this.aval.alert = this._aval_alert()
    this.aval.disc = this._aval_disc()
  }

  build_template() {
    let rankTd = $("<td>", { dataset: { toggle: "tooltip", placement: "top" }, title: "3° Lugar" })
    let rankI = $("<i>", { class: "fas fa-weight-hanging" })

    let scopeTh = $("<th>", { scope: "row" })
    let scopeButton = $("<button>", {
      class: "btn-transparent", title: "Pontuação",
      "data-toggle": "popover",
      "data-trigger": "focus",
      "data-placement": "top",
      "data-content": `<b><i class='fas fa-chart-bar'/> ${this.nota.toFixed(2)} &nbsp&nbsp <i class='fab fa-deviantart'/> ${this.desvio.toFixed(2)}</b>`
    })
    let scopeI = $("<i>", { class: `fas fa-circle ${this.aval.nota}` })

    let nomeTd = $("<td>", { text: this.nome })

    let discTd = $("<td>")
    let discButton = $("<button>", {
      class: "btn-transparent", title: "Disciplinas",
      "data-toggle": "popover",
      "data-trigger": "focus",
      "data-placement": "top",
      "data-content": this.aval.disc
    })
    let discI = $("<i>", { class: "fas fa-chalkboard-teacher" })

    let alertTd = $("<td>")
    let alertButton = $("<button>", {
      class: "btn-transparent", title: this.aval.alert.titulo,
      "data-toggle": "popover",
      "data-trigger": "focus",
      "data-placement": "top",
      "data-content": this.aval.alert.mensagem
    })
    let alertI = $("<i>", { class: `fas fa-${this.aval.alert.icone} ${this.aval.alert.cor}` })

    this.entities = {
      rank: rankTd.append(rankI),
      scope: scopeTh.append(scopeButton.append(scopeI)),
      nome: nomeTd,
      disc: discTd.append(discButton.append(discI)),
      alert: alertTd.append(alertButton.append(alertI)),
    }

    this.template = {
      geral: $("<tr>").append(this.entities.scope, this.entities.nome, this.entities.disc, this.entities.alert)
    }

  }


}
