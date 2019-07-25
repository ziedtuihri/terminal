
function emploi_affiche(){
  $(document).ready(function() {

    id=$("#select_affichage").val();

    $("#select_des_emplois").empty();
    if(id=="1"){ ch="List des professeurs";}
    if(id=="2") {ch="List des Classes";}
    if(id=="3"){ ch="List des Salles";}
    if(id=="4"){ ch="List des étudiants";}
    var op = new Option(ch, "tyoe-emploi");
    $(op).html(ch,"tyoe-emploi");
    $("#select_des_emplois").append(op);

    $.ajax({

      url: 'List-emplois-ajax'+id+'.php',
      type: 'get',
      success: function(data){

        $.each(data, function(key, modelName){

          $.each(modelName, function(k2, val){

            var option = new Option(val, k2);

            $(option).html(val,k2);

            $("#select_des_emplois").append(option);
          });
        });
      }
    });
  });
}


function loadDoc() {

  id2=$('#select_des_emplois').val();
  var tab_list_affiche={
    "type_emploi": id ,
    "identif": id2
  };
  var t1=JSON.stringify(tab_list_affiche);


  var jsondata;
  var xhttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhttp.open("POST", "affiche_emploi_ajax.php", !0);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(t1);
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("ajaxid1").innerHTML = this.responseText;

    }
  };
//  xhttp.send();

  /* xhttp.open("GET" , "./test1.php",true);
  xhttp.send();*/
}

function click_popup(x){

jour=x.getAttribute("data-jour");
period=x.getAttribute("data-period");
idcreneaux=x.getAttribute("data-idcreneaux");
deb=x.getAttribute("data-deb");
heur=x.getAttribute("data-heur");
login=x.getAttribute("data-login");
cours=x.getAttribute("data-cours");
sql=x.getAttribute("data-sql");
var variable_emploi={
  "jour": jour ,
  "period": period ,
  "idcreneaux": idcreneaux ,
  "deb": deb,
  "heur" : heur,
  "login": login,
  "cours": cours,
  "sql": sql
};
var tab2=JSON.stringify(variable_emploi);
var xhttp;
if (window.XMLHttpRequest) {
  // code for modern browsers
  xhttp = new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xhttp.open("POST", "variable_popup.php", !0);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send(tab2);
xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    document.getElementById("send_popup").innerHTML = this.responseText;

  }
};
}
function update_emploi(x){

enseignant=$('#choix_enseignant').val();
jour=$('#choix_jour').val();
period=$('#choix_period').val();
commence_cour=$('#choix_debutc').val();
heur=$('#choix_heur').val();
semaine=$('#choix_semaine').val();
salle=$('#choix_salle').val();
annee_ent=$('#choix_annee').val();
  $(document).ready(function() {

$.ajax({

      type: 'POST',
      url: 'update_insert_popup.php',
      data: {
         enseignant: enseignant,
         jour: jour,
         period:period,
         commence_cour:commence_cour,
         heur:heur,
         semaine:semaine,
         salle:salle,
         annee_ent:annee_ent,
         insert:sql,
         idcreneaux:idcreneaux,
         deb: deb,
         heur_v: heur,
         login: login,
         cours:cours
        },

      success: function(response) {
        $.each(response, function(key, val){
          verif_message=val.verif;
          if(verif_message == 0 ){

    $(".message_id").html("<div class=\"alert alert-danger\"><i class=\"fa fa-warning\" style=\"font-size: 25px;\"> </i><span style=\"font-size:15px \"> Choix Faux </span>"+val.message+" </div>");

    //  $(".message_id").html("<div class=\"col-lg-13\"><div class=\"panel panel-warning\"><div class=\"panel-heading\"><i class=\"fa fa-warning\" style=\"font-size: 25px;\"> </i>  <span style=\"font-size:20px \"> Choix Faux </span> </div><div class=\"panel-body style=\" padding:10px\" \"><h4>"+val.message+"</h4> </div></div></div>");
    }else if(verif_message == 1 )
    $(".message_id").html("<div class=\"alert alert-success\"><i class=\"fa fa-check-square-o\" style=\"font-size: 25px;\"></i><span style=\"font-size:15px \">Success Choix </span>"+val.message+"</div>");
    // $(".message_id").html("<div class=\"col-lg-13\"><div class=\"panel panel-success\"><div class=\"panel-heading\"><i class=\"fa fa-check-square-o\" style=\"font-size: 25px;\"></i> <span style=\"font-size:20px \">Success Panel </span></div><div class=\"panel-body\"><h4>"+val.message+"</h4> </div></div></div>");

    });
  /*  if(verif_message == 1){
      console.log("is erro :  "+verif_message);
       setTimeout(function() {
        $("#myModal2").attr('class', 'modal inmodal');
        $("#myModal2").css("display","none")
      }, 2000);
    } */
        }

  });
// $("#ajaxid1").load("affiche_emploi_ajax.php");
});


}

  setTimeout(function() {
  $("#myModal2").attr('class', 'modal inmodal');
  $("#myModal2").css("display","none")
}, 2000);

// $("#myModal2").css("display","none");
// $('#myModal2').style.display = "none";
   if(verif_message== 100){

  var $container = $("#ajaxid1");
  $container.load("affiche_emploi_ajax.php");
}

//var $container = $("#ajaxid1");
  //      $container.load("affiche_emploi_ajax.php");

   $.ajax({
  url: 'update_insert_popup.php',
  type: 'get',
  success: function(data){
      $("#message_id").html("message d'erreur is heer : ");
   $.each(data, function(key, modelName){
      $.each(modelName, function(k2, val){

          $("#message_id").html("message d'erreur is heer : "+k2+" et "+val);

      });
    });
  }
});




$.ajax({
  url: 'variable_popup.php',
  headers: {
      'Content-Type':'application/json'
  },
  method: 'POST',
  dataType: 'json',
  data: YourData,
  success: function(data){
    console.log('succes: '+data);
  }
});




$.ajax({
        type: "get",
        url: 'variable_popup.php',
        // serializes the form's elements.

        success: function(data1)
        {
          $.each(data, function(key, modelName){
            $.each(modelName, function(k2, val){

              $("#message_id").html("message d'erreur "+val+"  "+k2);
            });
          });
            alert(data1); // show response from the php script.
        }
      });



 $.ajax({
url: 'variable_popup.php',
header: { 'Authentication': 'Token r4r4xxxxx' }
}).done(function(data) {
$("#message_id").html(data+"message d'erreur ");
});




 message=x.getAttribute("data-message");
$("#message_id").html("message d'erreur is heer : "+message);



var xhttp;
if (window.XMLHttpRequest) {
// code for modern browsers
xhttp = new XMLHttpRequest();
} else {
// code for IE6, IE5
xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xhttp.open("GET", "variable_popup.php", !0);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.onreadystatechange = function() {
if (xhttp.readyState == 4 && xhttp.status == 200) {
  document.getElementById("message_id").innerHTML = this.responseText;

}
};
