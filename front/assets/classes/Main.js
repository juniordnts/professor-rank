

var data = $.getJSON("../dados/2019-2017-refined.json")

data.then((res) => {

  $.each(res, function (key, item) {
    let record = new Professor(key, item["Componentes"], item["MediaDeNotas"], item["MediaDeDesvios"], item["DesvioDeNotas"])
    $("#table-geral, #table-professores").append(record.template.geral)
    // $("#table-professores").append(record.template.geral)
  });

  setup_assets();

  $(".buscar-professor").on("keyup", function () {
    var parent = $(this).parent().attr("id")
    var value = $(this).val().toLowerCase();
    $(`#${parent} tbody:not(#table-comparacao) tr`).filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

})
