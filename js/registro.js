import Swal from '/node_modules/sweetalert2/src/sweetalert2.js'
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import {getFirestore, doc, getDoc,setDoc}from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOjKc5cZtMXPqoIE3LMFJjGpqdOHZEINY",
  authDomain: "caribbeanfoodweb.firebaseapp.com",
  databaseURL: "https://caribbeanfoodweb-default-rtdb.firebaseio.com",
  projectId: "caribbeanfoodweb",
  storageBucket: "caribbeanfoodweb.appspot.com",
  messagingSenderId: "986873180157",
  appId: "1:986873180157:web:20fd4941a89f374b72f394"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const mauth = getAuth();
const db = getFirestore();

//variables
let input_correo = document.getElementById('input_correo_registro');
let input_telefono = document.getElementById('input_telefono_registro');
let input_direccion = document.getElementById('input_direccion_registro');
let input_password = document.getElementById('input_password_registro');
let input_nombre = document.getElementById('input_nombre_registro');
let check_condiciones = document.getElementById('check_condiciones_registro');
let id_usuario_activo = sessionStorage.getItem("usuario");
//events
document.getElementById('link_condiciones_registro').addEventListener('click', event =>{
	Swal.fire({
		title: 't&c',
		text: 'Configurar T&C',
		footer: "grupo 6 - Programción para Web"
	});
});

$("#btn_cancelar").click(function(){

	if(id_usuario_activo == 'admin@correo.com'){
		window.location.replace('admin.html')
	}else{
		window.location.replace('index.html')
	}
})

document.getElementById('btn_submit_registro').addEventListener('click', event => {
	if(validarCorreo(input_correo) && validarNombre(input_nombre) && validarPassword(input_password) && validarCheck(check_condiciones) &&
	 validarDireccion(input_direccion) && validarTelefono(input_telefono)){
		validarNuevo();
	} else {
		if (!validarCorreo(input_correo)){
			Swal.fire("","Correo inválido","info");
		}
		if (!validarNombre(input_nombre)){
			Swal.fire("","El nombre es muy corto","info");
		}
		if (!validarPassword(input_password)){
			Swal.fire("","Contraseña muy corta","info");
		}
		if (!validarCheck(check_condiciones)){
			Swal.fire("","Debe aceptar Términos y condiciones","info");
		}
		if (!validarTelefono(input_telefono)){
			Swal.fire("","Numero muy corto","info");
		}
		if (!validarDireccion(input_direccion)){
			Swal.fire("","El campo de direccion es hobligatorio","info");
		}
	}
})
function validarCorreo(String){
	let expression = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
	if (expression.test(String.value) == true){
		return true;
	} else {
		return false;
	}
}
function validarPassword(String){
	if (String.value.length == 0) {
		return false;
	} else {
		if (String.value.length >= 7){
			return true;
		} else {
			return false;
		}
	}
}
function validarNombre(String){
	if (String.value.length == 0) {
		return false;
	} else {
		if (String.value.length >= 3){
			return true;
		} else {
			return false;
		}
	}
}
function validarTelefono(String){
	if (String.value.length == 0) {
		return false;
	} else {
		if (String.value.length >= 10){
			return true;
		} else {
			return false;
		}
	}
}
function validarDireccion(String){
	if (String.value.length == 0) {
		return false;
	} else {
		return true;
	}
}
function validarCheck(CheckBox){
	if (CheckBox.checked == true){
		return true;
	} else {
		return false;
	}
}
async function Registro(){ // email
	const correo = input_correo.value;
	const contra = input_password.value;
	var ref = doc(db, "users", correo);
	createUserWithEmailAndPassword(mauth,correo,contra).then((userCredential)=>{
		const docRef = setDoc(
			ref, {
				correo: input_correo.value,
				nombre: input_nombre.value,
				direccion: input_direccion.value,
				telefono: input_telefono.value,
				password: input_password.value,
				state: 'activo'
			}
		)
		.then(()=>{
			if(id_usuario_activo == 'admin@correo.com'){
				window.location.replace('admin.html')
			}else{
				sessionStorage.setItem('usuario',correo);
				window.location.replace('home.html')
			}
		})
		.catch((error)=>{
			new Swal('Error!', error, 'error');
		});

	}).catch((e)=>{
		new Swal("problemas en el registro",e);
	})
}
async function validarNuevo(){
	var ref = doc(db, "users", input_correo.value);
	const docSnap = await getDoc(ref);
	if (docSnap.exists()){
		Swal.fire("Atención","Ya esxiste una cuenta asociada a éste correo","error");
	} else {
		Registro();
	}
}