// Importando Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Sua configuração Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Inicializando
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Formulário
const form = document.getElementById('suporte-form');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const tipo = document.getElementById('tipo').value;
  const mensagem = document.getElementById('mensagem').value;

  try {
    await addDoc(collection(db, 'suporte'), {
      nome,
      email,
      tipo,
      mensagem,
      data: new Date()
    });

    status.textContent = 'Mensagem enviada com sucesso!';
    status.style.color = 'lightgreen';
    form.reset();
  } catch (error) {
    console.error('Erro ao enviar:', error);
    status.textContent = 'Erro ao enviar mensagem. Tente novamente.';
    status.style.color = 'red';
  }
});
