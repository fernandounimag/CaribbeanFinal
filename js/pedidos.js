import Swal from '/node_modules/sweetalert2/src/sweetalert2.js'
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
//import { getStorage, ref, uploadBytes , getDownloadURL }from "https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where, getDocs
  }
  from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";

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
const db = getFirestore();

//declaracion de variables 
let id_usuario_activo = sessionStorage.getItem("usuario");

//eventos
$("#btn2").click(function() {
    pedido('id2','nm2','p2');
});

$("#btn1").click(function() {
    pedido('id1','nm1','p1');
});

$("#inicio").click(function() {
    if(id_usuario_activo){
        location.replace('home.html');
    }else{
        location.replace('index.html');
    }
});
//funciones
function pedido(a1,b1,c1){
    let id = $('#'+a1).html();
    let nombre =  $('#'+b1).html();
    let precioP =  $('#'+c1).html();
    if(!id_usuario_activo){
        Swal.fire('Debe iniciar seccion');
        return location.replace('login.html');
    }
    var ref = doc(collection(db, "pedidos"));
    const docRef = setDoc(
        ref, {
            idProducto: id,
            nombre: nombre,
            precio: precioP,
            correo: id_usuario_activo,
            referencia: ref
        }
    )
    .then(()=>{
        Swal.fire('ENVIADO');
    })
    .catch((error)=>{
        new Swal('Error!', error, 'error');
    });

}
