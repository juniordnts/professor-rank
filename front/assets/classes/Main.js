
var folder = window.location.search.split("=")[1].split("&")[0]
var depName = decodeURI(window.location.search.split("=")[2])

depName != "undefined" ? $("#dep-name").text(depName) : NaN

var data = $.getJSON("../dados/" + folder + "/2019-2017-refined.json")

data.then((res) => {

  $("#loader").remove()
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
