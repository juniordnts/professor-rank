

var data = $.getJSON("../dados/2019-2017-refined.json")

data.then((res) => {

  // $("#table-geral").html("")

  $.each(res, function (key, item) {
    let record = new Professor(key, item["Componentes"], item["MediaDeNotas"], item["MediaDeDesvios"], item["DesvioDeNotas"])
    $("#table-geral").append(record.template.geral)
  });

  setup_assets();

  $("#buscar-professor").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#geral tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

})
