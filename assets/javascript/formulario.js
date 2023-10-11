// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyCyWpB-1fClB5IMRlUiRmTDlubx3z6YYw0",
    authDomain: "productos-digitales-wordpress.firebaseapp.com",
    databaseURL: "https://productos-digitales-wordpress-default-rtdb.firebaseio.com",
    projectId: "productos-digitales-wordpress",
    storageBucket: "productos-digitales-wordpress.appspot.com",
    messagingSenderId: "549012156361",
    appId: "1:549012156361:web:a197dc8475a36449420218"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Elements HTML
const sendClick = document.getElementById("send");
const error = document.getElementById('error');
const success = document.getElementById('success');
//Inputs Form
const form = $('#formSend');

sendClick.addEventListener("click", function (e) {
  e.preventDefault();
  if (validarFormulario(form)) {
    $('#send').attr('disabled', 'true');
    const nameLast = document.getElementById('nameLast').value;
    const correoInput = document.getElementById('correoInput').value;
    const telInput = document.getElementById('telInput').value;
    writeUserData(nameLast, correoInput, telInput);
  } else {
    /* alert('Llena formulario'); */
  }
});

function writeUserData(nameLast, correoInput, telInput) {
  const db = getDatabase();
  let id = new Date();
  set(ref(db, 'productos-digitales-wordpress/' + id), {
    nombre: nameLast,
    correo: correoInput,
    telefono: telInput,
  }).then(result => {
    console.log('Send!');
    success.removeAttribute('class', 'inboxVisible');
    success.setAttribute('class', 'boxVisible');
    setInterval(showForm, 4000);
  }).catch(err => {
    console.log(err);
    error.setAttribute('class', 'boxVisible');
    error.removeAttribute('class', 'inboxVisible');
  });
}

function showForm() {
  const formData = document.getElementById('formSend');
  formData.reset();
}

function validarFormulario(form) {
  form.validate({
    rules: {
      nameLast: { required: true },
      telInput: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
      correoInput: { required: true, email: true },
      msgInput: { required: true },
      origen: { required: true }
    },

    messages: {
      nameLast: { required: 'El campo es obligatorio' },
      correoInput: {
        required: 'El campo es obligatorio',
        email: 'Ingresa un email valido',
      },
      telInput: {
        required: 'El campo es obligatorio',
        digits: "Ingresa números solamente",
        minlength: "Mínimo 10 dígitos",
        maxlength: "Máximo 10 dígitos",
      },
      msgInput: { required: 'El campo es obligatorio' },
      origen: { required: 'El campo es obligatorio' }
    },
  });
  return form.valid();
};