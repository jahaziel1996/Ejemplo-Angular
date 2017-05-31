var ResultadosRe = document.getElementById('resultado');
var IdRegistro = document.getElementById('idregistro');
var Titulo = document.getElementById('titulo');
var Descripcion = document.getElementById('descripcion');
var Hora = document.getElementById('hora');
/*---------------------------------------------------------------------*/

var bd = openDatabase("Historial", "1.0", "Scheadule", 200000);
var datos;
TablaRegistro();

function errorBD(tra, error){
    alert('Error: ' + error.message("Error de codigo") + '(Código: ' + error.code + ')');
    return true;
}
/*------------------Funiones de Perfil-------------------*/
var CreateRegistro = "CREATE TABLE IF NOT EXISTS Registro(idregistro INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, descripcion TEXT, hora TEXT)";
function TablaRegistro(){
    bd.transaction(function(tra){
        tra.executeSql(CreateRegistro, [], ShowRegistro, errorBD);
    });
}

var InsertRegistro = "INSERT INTO Registro (titulo, descripcion, hora) VALUES (?,?,?)";
function InsertarRegistro(){
    bd.transaction(function(tra){
        tra.executeSql(InsertRegistro, [Titulo.value, Descripcion.value, Hora.value], LoadResetR, errorBD);
    });
}

var SelectRegistro = "SELECT * FROM Registro";

var buscador = document.getElementById("buscar");

function ShowRegistro(){
    ResultadosRe.innerHTML = '';
    bd.transaction(function(tra){
        tra.executeSql(SelectRegistro, [], function(tra, result){
            datos = result.rows;
            for (var i = 0, item = null; i < datos.length; i++){
                item = datos.item(i);
                ResultadosRe.innerHTML += '<ons-list-item>' + '<div class="left" onclick="LoadR('+i+');dialog.show()">'+'<img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">' + '</div>'+ '<div class="center" id="titulo2">' + '<span class="list-item__title" id="titulo">' + item['titulo'] + '</span>' + '<span class="list-item__subtitle">' + item['descripcion'] +'</span>' + '<span class="list-item__subtitle">' + item['hora'] +'</span>'+ '</div>' + '<img src="img/bin.png" id="img" onclick="eliminarRegistro('+item['idregistro']+')"></img>'+'</ons-list-item>' ;
                
                
            }
        });
    });
} 
 var lista_x_autor = document.getElementById("lista_x_autor");
function buscxAutor(tx){

    bd.transaction(function(tra){
    
    var autor_a_buscar = document.getElementById("txtautor_b").value;
     tra.executeSql('SELECT titulo,descripcion,hora from Registro where titulo like "'+autor_a_buscar+'%"',[], function(tx,resultado){
    var len= resultado.rows.length;
    if(len>0){
       
      lista_x_autor.innerHTML = '';
    for(var i=0; i<len; i++){
      var fila=resultado.rows.item(i);
      lista_x_autor.innerHTML += '<ons-list-item>' + '<div class="left">'+'<img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">' + '</div>'+ '<div class="center">' + '<span class="list-item__title">' + fila['titulo'] + '</span>' + '<span class="list-item__subtitle">' + fila['descripcion'] +'</span>' + '<span class="list-item__subtitle">' + fila['hora'] +'</span>'+ '</div>' +'</ons-list-item>';
    }
    }
    else{
      alert("No hay datos");
    }
 

  });
});
}




function LoadR(i){
    var item = datos.item(i);
    Titulo.value = item['titulo'];
    Hora.value = item['hora'];
    IdRegistro.value = item['idregistro'];
    Descripcion.value = item['descripcion'];
}

var UpdateRegistro = "UPDATE Registro SET titulo = ?, descripcion = ?, hora = ? WHERE idregistro = ?";
function ActualizarR(){
    bd.transaction(function(tra){
        tra.executeSql(UpdateRegistro, [Titulo.value, Descripcion.value, Hora.value, IdRegistro.value], LoadResetR, errorBD);
    });
}

function ResetR(){
    Titulo.value = '';
    Descripcion.value = '';
    Hora.value = '';
}

function LoadResetR(){
    ResetR();
    ShowRegistro();
}
var deleteRegistro = "DELETE FROM Registro WHERE idregistro = ?";
function eliminarRegistro(idt){
    bd.transaction(function(tra){
        tra.executeSql(deleteRegistro, [idt], ShowRegistro, errorBD);
    });
    ResetR();
}

var DropRegistro = "Drop TABLE Registro";
function borrarRegistro(){
    bd.transaction(function(tra){
        tra.executeSql(DropRegistro, [], ShowRegistro, errorBD);
    });
    ResetR();
}


