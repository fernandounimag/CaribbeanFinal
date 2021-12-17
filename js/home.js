import Swal from '/node_modules/sweetalert2/src/sweetalert2.js'
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getStorage, ref, uploadBytes , getDownloadURL }from "https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js";
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
// firestrore
import {
  getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where, getDocs
}
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
const db = getFirestore();
// variables
let label_usuario_activo = document.getElementById('nombre_usuario');
let id_usuario_activo = sessionStorage.getItem("usuario");
var users=''; var name='';var telefono='';var direccion='';

// botones
let boton_cerrar_sesion = document.getElementById('boton_cerrar_sesion');
let file_selector = document.getElementById('file-selector');


// eventos
boton_cerrar_sesion.addEventListener('click', event => {
    sessionStorage.removeItem("usuario")
    location.replace('index.html');
})

$("#editar").click(function() {
  $("#input_nombre").show();
  $("#input_nombre").val(document.getElementById('name').textContent)
  $("#name").hide();
  $("#email").hide();
  $("#input_telefono").show();
  $("#input_telefono").val(document.getElementById('telefono').textContent)
  $("#telefono").hide();
  $("#input_direccion").show();
  $("#input_direccion").val(document.getElementById('direccion').textContent)
  $("#direccion").hide();
  $("#imageP").hide();
  $("#btn_submit_update").show();
  $("#rol").hide();
  $("#editar").hide();
  $("#btn_cancelar").show();
});

$("#btn_cancelar").click(function() {
  cargarInput();
})

$("#btn_submit_update").click(function() {
  UpdateFieldsDocument();
  cargarDatos();
  cargarInput();
})

file_selector.addEventListener('change', (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(){
    $('#imageP').attr('src', reader.result);
  }
  const storageRef = ref(storage, 'fotos/'+users );
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  }).catch(()=>{
    console.log('ERROR');
  });
})



// functins
async function cargarDatos(){
    var ref = doc(db, "users", id_usuario_activo);
    const docSnap = await getDoc(ref);
  
    if (docSnap.exists()){
      name = docSnap.data().nombre.split(" ",2);
      $("#name").html(name);
      telefono = docSnap.data().telefono.split(" ",2);
      $("#telefono").html(telefono);
      direccion = docSnap.data().direccion.split(" ",2);
      $("#direccion").html(direccion);
      users = docSnap.data().correo;
      $("#email").html(users);
      cargarImage();
      $("#rol").html("Tipo: User");
      label_usuario_activo.innerHTML = name.toString().replace(","," ");

    } else {
        Swal.fire('Error!','Usuario no encontrado','error');
    }
  }

cargarDatos();

function cargarImage(){
  const storageRe = ref(storage, 'fotos/'+users );
      getDownloadURL(storageRe).then(function(url) {
        $('#imageP').attr('src', url);
      }).catch(function(error) {
        console.log("Imagen No encontrada");
      });
}

function cargarInput(){
  $("#input_nombre").hide();
  $("#name").show();
  $("#input_correo").hide();
  $("#email").show();
  $("#input_telefono").hide();
  $("#telefono").show();
  $("#input_direccion").hide();
  $("#direccion").show();
  $("#imageP").show();
  $("#btn_submit_update").hide();
  $("#rol").show();
  $("#editar").show();
  $("#btn_cancelar").hide();
}

async function UpdateFieldsDocument(){
  let input_telefono = document.getElementById("input_telefono");
  let input_direccion = document.getElementById("input_direccion");
  let input_nombre = document.getElementById("input_nombre");
  const correo = id_usuario_activo;

  var ref = doc(db, "users", correo );
  await updateDoc(
      ref, {
				nombre: input_nombre.value,
				direccion: input_direccion.value,
				telefono: input_telefono.value
      }
  )
  .then(()=>{
      Swal.fire('Éxito!','Datos actualizados','success');
  })
  .catch((error)=>{
      Swal.fire('Error! ', error ,'error');
  }); 
}
