import Swal from '/node_modules/sweetalert2/src/sweetalert2.js'
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getStorage, ref, getDownloadURL }from "https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js";
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc, deleteDoc, deleteField, query, where, getDocs }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOjKc5cZtMXPqoIE3LMFJjGpqdOHZEINY",
  authDomain: "caribbeanfoodweb.firebaseapp.com",
  projectId: "caribbeanfoodweb",
  storageBucket: "caribbeanfoodweb.appspot.com",
  messagingSenderId: "986873180157",
  appId: "1:986873180157:web:20fd4941a89f374b72f394"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore();

// variables usuario
let nombre_usuario = [];
let correo_usuario = [];
let estado_cuenta = [];

// variables pedidos
let nombre_pedido = [];
let correo_cliente = [];
let id_pedido = [];
let precio_pedido = [];
let referencia_pedido = [];


// cargar Usuarios
const q = query(collection(db, "users"), where("correo", "!=", ''));
const querySnapshot = await getDocs(q);
var cont = -1;
querySnapshot.forEach((doc) => {
  cont += 1;
  nombre_usuario[cont] = doc.data().nombre;
  correo_usuario[cont] = doc.data().correo;
  estado_cuenta[cont] = doc.data().state;
});

// cargar Pedidos
const p = query(collection(db, "pedidos"), where("correo", "!=", ''));
const querySnapshot2 = await getDocs(p);
var cont2 = -1;
querySnapshot2.forEach((doc) => {
  cont2 += 1;
  nombre_pedido [cont2] = doc.data().nombre;
  correo_cliente [cont2] = doc.data().correo;
  id_pedido[cont2] = doc.data().idProducto;
  precio_pedido[cont2] = doc.data().precio;
  referencia_pedido[cont2] = doc.data().referencia;
});
// botones dropdown
let inicioBtn = document.getElementById('boton_inicio_admin');
let usuariosBtn = document.getElementById('boton_usuarios_admin');
let configuracionBtn = document.getElementById('boton_configuracion_admin');
let salirBtn = document.getElementById('boton_salir_admin');

// panels
let inicioPane = document.getElementById('panel_inicio_admin');
let usuariosPane = document.getElementById('panel_usuarios_admin');
let body_tabla_usuarios = document.getElementById('body_tabla_usuarios');
let body_tabla_pedidos = document.getElementById('body_tabla_pedidos');

// eventos
inicioBtn.addEventListener('click', event =>{inicioPane.hidden = false;usuariosPane.hidden = true;});
usuariosBtn.addEventListener('click', event =>{inicioPane.hidden = true;usuariosPane.hidden = false;});
salirBtn.addEventListener('click', event => {sessionStorage.removeItem("usuario");location.replace('index.html');})

function tabla_usuarios(){

    for (let i = 0; i < nombre_usuario.length; i++) {
        // Crea las hileras de la tabla
        let row = document.createElement("tr");
    
        for (let j = 0; j < 5; j++) {
          // Crea un elemento <td> y un nodo de texto, haz que el nodo de
          // texto sea el contenido de <td>, ubica el elemento <td> al final
          // de la hilera de la tabla
          let celda = document.createElement("td");
          let textoCelda = document.createTextNode(i+1);
          let textoCelda1 = document.createTextNode(nombre_usuario[i]);
          let textoCelda2 = document.createTextNode(correo_usuario[i]);
          let boton_eliminar_usuario = document.createElement("a");
          let boton_acti_usuario = document.createElement("b");
          let boton_des_usuario = document.createElement("c");
          boton_des_usuario.setAttribute('href','#');
          boton_des_usuario.setAttribute('class','boton_des_usuario_class btn bg-danger fa fa-lock');
          boton_acti_usuario.setAttribute('href','#');
          boton_acti_usuario.setAttribute('class','boton_acti_usuario_class btn bg-info fa fa-unlock');
          boton_eliminar_usuario.setAttribute('href','#');
          boton_eliminar_usuario.setAttribute('class','boton_eliminar_usuario_class btn bg-danger fas fa-user-times');
          if (j == 0){
            celda.appendChild(textoCelda);
            row.appendChild(celda);
          }
          if (j == 1){
            celda.appendChild(textoCelda1);
            row.appendChild(celda);
          }
          if (j == 2){
            celda.appendChild(textoCelda2);
            row.appendChild(celda);
          }
          if (j == 3){
            let cont3 = i + 1;
            boton_eliminar_usuario.setAttribute('id','boton_eliminar_usuario_'+ cont3)
            celda.appendChild(boton_eliminar_usuario);
            row.appendChild(celda);
          }
          if (j == 4){
            let cont4 = i + 1;
            boton_des_usuario.setAttribute('id','boton_des_usuario_'+ cont4)
            boton_acti_usuario.setAttribute('id','boton_acti_usuario_'+ cont4)
            if(estado_cuenta[i] == 'activo'){
              celda.appendChild(boton_des_usuario);
            }else{
              celda.appendChild(boton_acti_usuario);
            }
            row.appendChild(celda);
          }
          let cont = i+1
          row.id = 'fila_'+cont
        }
    
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        body_tabla_usuarios.appendChild(row);
      }
}
tabla_usuarios();

function tabla_pedidos(){
  if(nombre_pedido.length != 0){
    $("#textempty").hide();
  }else{
    $("#textempty").show();
  }
  for (let i = 0; i < nombre_pedido.length; i++) {
      // Crea las hileras de la tabla
      let row = document.createElement("tr");
  
      for (let j = 0; j < 6; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(i+1);
        let textoCelda1 = document.createTextNode(id_pedido[i]);
        let textoCelda2 = document.createTextNode(nombre_pedido[i]);
        let textoCelda3 = document.createTextNode(precio_pedido[i]);
        //let textoCelda4 = document.createTextNode(correo_cliente[i]);

        let boton_info_cliente = document.createElement("a");
        boton_info_cliente.setAttribute('href','#');
        boton_info_cliente.setAttribute('class','boton_info_cliente_class btn bg-info fa fa-user');
        boton_info_cliente.setAttribute('data-toggle','modal');
        boton_info_cliente.setAttribute('data-target','#perfil');

        let boton_cerrar_pedido = document.createElement("a");
        boton_cerrar_pedido.setAttribute('href','#');
        boton_cerrar_pedido.setAttribute('class','boton_cerrar_pedido_class btn bg-danger fa fa-times');
        if (j == 0){
          celda.appendChild(textoCelda);
          row.appendChild(celda);
        }
        if (j == 1){
          celda.appendChild(textoCelda1);
          row.appendChild(celda);
        }
        if (j == 2){
          celda.appendChild(textoCelda2);
          row.appendChild(celda);
        }
        if (j == 3){
          celda.appendChild(textoCelda3);
          row.appendChild(celda);
        }
        if (j == 4){
          let cont4 = i + 1;
          boton_info_cliente.setAttribute('id','boton_info_cliente_'+ cont4)
          celda.appendChild(boton_info_cliente);
          row.appendChild(celda);
        }
        if (j == 5){
          let cont3 = i + 1;
          boton_cerrar_pedido.setAttribute('id','boton_cerrar_pedido_'+ cont3)
          celda.appendChild(boton_cerrar_pedido);
          row.appendChild(celda);
        }
        let cont = i+1
        row.id = 'fila_'+cont
      }
  
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      body_tabla_pedidos.appendChild(row);
    }
}

tabla_pedidos();

document.getElementById('boton_actualizar_lista').addEventListener('click', event => {
  location.reload();
});

document.querySelectorAll('.boton_eliminar_usuario_class').forEach(item => {
    item.addEventListener('click', event => {
      Swal.fire({
        title: 'Eliminar usuario?',
        text: "El usuario "+nombre_usuario[item.id.substr(23,24)-1].toUpperCase()+" será eliminado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          DeleteUser(correo_usuario[item.id.substr(23,24)-1]);
        }
      })
    })
});

document.querySelectorAll('.boton_cerrar_pedido_class').forEach(i => {
  i.addEventListener('click', event => {
    Swal.fire({
      title: 'Cerrar Pedido?',
      text: "El Pedido a nombre de " + correo_cliente[i.id.substr(20,21)-1].toUpperCase() + " será eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        DeletePedido(referencia_pedido[i.id.substr(20,21)-1]);
      }
    })
  })
});
document.querySelectorAll('.boton_acti_usuario_class').forEach(i => {
  i.addEventListener('click', event => {
    Updatestate(correo_usuario[i.id.substr(19,20)-1]);
  })
});
document.querySelectorAll('.boton_des_usuario_class').forEach(i => {
  i.addEventListener('click', event => {
    Updatestate(correo_usuario[i.id.substr(18,19)-1]);
  })
});
async function Updatestate(correo){
  var ref = doc(db, "users", correo );
  const docSnap = await getDoc(ref);
  let estado = 'activo';
  if(docSnap.data().state=='activo')estado='des';
  await updateDoc(
      ref, {
        state: estado
      }
  )
  .then(()=>{
      Swal.fire('Éxito!','Stado actualizado','success');
      refresh();
  })
  .catch((error)=>{
      Swal.fire('Error! ', error ,'error');
  }); 
}


document.querySelectorAll('.boton_info_cliente_class').forEach(i => {
  i.addEventListener('click', event => {
    cargarClientes(correo_cliente[i.id.substr(19,20)-1]); 
  })
});


function refresh(){
  location.reload();
}

async function cargarClientes(correo){
  let name,telefono,direccion,users;
  let ref = doc(db, "users", correo );
  const docSnap3 = await getDoc(ref);
  if (docSnap3.exists()){
    name = docSnap3.data().nombre.split(" ",2);
    $("#name").html(name);
    telefono = docSnap3.data().telefono.split(" ",2);
    $("#telefono").html(telefono);
    direccion = docSnap3.data().direccion.split(" ",2);
    $("#direccion").html(direccion);
    users = docSnap3.data().correo;
    $("#email").html(users);
    $("#rol").html("Tipo: User");
    cargarImage(correo);

  } else {
      Swal.fire('Error!','Usuario no encontrado','error');
  }

}
function cargarImage(users){
  const storageRe = ref(storage, 'fotos/'+users );
      getDownloadURL(storageRe).then(function(url) {
        $('#imageP').attr('src', url);
      }).catch(function(error) {
        console.log("Imagen No encontrada");
      });
}

// variables usuario activo
let adminID = 'admin@correo.com';
//funciones firebase
async function cargarNombre(){
  let ref = doc(db, "admins", adminID);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()){
    document.getElementById('label_nombre_admin').innerHTML = docSnap.data().nombre;
  } else {
      Swal.fire('Error!','Usuario no encontrado','error');
  }
}
cargarNombre();
async function UpdateFieldsDocument(id){
  var ref = doc(db, "users", id);

  await updateDoc(
      ref, {
          //item: field
      }
  )
  .then(()=>{
      Swal.fire('Éxito!','Datos actualizados','success');
  })
  .catch((error)=>{
      Swal.fire('Error! ', error ,'error');
  }); 
}
async function UpdatePassword(id){
  var ref = doc(db, "users", id);
  await updateDoc(
      ref, {
          //password_item_name: password_field
      }
  )
  .then(()=>{
    Swal.fire('Éxito!','Contraseña actualizada','success');
  })
  .catch((error)=>{
    Swal.fire('Error!', error ,'error');
  }); 
}
async function DeleteUser(id){
  let ref = doc(db, "users", id);
  const docSnap = await getDoc(ref);
  if (!docSnap.exists()){
    Swal.fire('Error!','Usuario no existe','error');
    return;
  }await deleteDoc(ref)
  .then(()=>{
    Swal.fire('Éxito!','Usuario eliminado','success');
    refresh() 
  })
  .catch((error)=>{
    Swal.fire('Error!',error,'error');
  }); 
}
async function DeletePedido(id){
  const docSnap2 = await getDoc(id);

      if (!docSnap2.exists()){
        Swal.fire('Error!','Pedido no existe','error');
          return;
      }await deleteDoc(id)
      .then(()=>{
        Swal.fire('Éxito!','Pedido cerrado','success');
        refresh()
      })
      .catch((error)=>{
        Swal.fire('Error!',error,'error');
      }); 
      
}
async function Registro(correo, nombre, password){ // email
  var ref = doc(db, "users", correo);

  const docRef = await setDoc(
      ref, {
        correo: correo,
        nombre: nombre,
        password: password
      }
  )
  .then(()=>{
    Swal.fire('Éxito!','Usuario creado exitosamente','success');
  })
  .catch((error)=>{
      Swal.fire('Error!', error, 'error');
  });

}
async function GetDocument(){
  var ref = doc(db, "admins", adminID);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()){
    document.getElementById('label_nombre_admin').innerHTML = docSnap.data().nombre;
  } else {
      Swal.fire('Error!','Usuario no encontrado','error');
  }
}