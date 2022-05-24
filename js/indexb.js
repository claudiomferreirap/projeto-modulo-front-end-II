let inputEmail = document.getElementById("email");
let validarEmail = false;

let inputSenha = document.getElementById("senha");
let validarSenha = false;

let inputConfirmarSenha = document.getElementById("confirmar-senha");
let validarConfirmaSenha = false;

let criarContaAgora = document.getElementById("criarContaAgora");

// criar os eventos possiveis nos botoes

inputEmail.addEventListener("keyup", verificaEmail);

inputSenha.addEventListener("keyup", verificaSenha);

inputConfirmarSenha.addEventListener("keyup", verificaConfirmaSenha);

criarContaAgora.addEventListener("click", verificaCampos);

//FUNÇÕES
function verificaEmail() {
  if (inputEmail.value.length < 10) {
    inputEmail.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: red;"
    );
    validarEmail = false;
  } else {
    inputEmail.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: green;"
    );
    validarEmail = true;
  }
}

function verificaSenha() {
  if (inputSenha.value.length < 6) {
    inputSenha.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: red;"
    );
    validarSenha = false;
  } else {
    inputSenha.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: green;"
    );
    validarSenha = true;
  }
}

function verificaConfirmaSenha() {
  if (inputSenha.value !== inputConfirmarSenha.value) {
    inputConfirmarSenha.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: red;"
    );
    validarConfirmaSenha = false;
  } else {
    inputConfirmarSenha.setAttribute(
      "style",
      "display: block; margin-bottom: 15px; width: 415px; border-color: green;"
    );
    validarConfirmaSenha = true;
  }
}

function verificaCampos() {
  console.log(validarEmail);
  console.log(validarSenha);
  console.log(validarConfirmaSenha);

  if (
    inputEmail.value === "" ||
    inputSenha.value === "" ||
    inputConfirmarSenha.value === ""
  ) {
    alert(
      "Algo deu errado! Por favor verifique se você preencheu todos os campos."
    );
    return;
  } else if (!validarEmail || !validarSenha || !validarConfirmaSenha) {
    alert(
      "Campos incorretos! Por favor verifique se você preencheu todos os campos corretamente."
    );
    return;
  } else {
    //salvar os dados localStorage
    salvarNoLocalStorage();
  }
}

function salvarNoLocalStorage() {
  let email = inputEmail.value;
  let senha = inputSenha.value;
  let recados = [];

  let listaUsuarios = buscarLocalStorage();

  let existe = listaUsuarios.some((usuario) => usuario.email === email);

  if (existe) {
    alert(`usuário ${email} já está cadastrado no sistema`);
    return;
  }

  let dadosNovoUsuario = {
    email,
    senha,
    recados,
  };

  listaUsuarios.push(dadosNovoUsuario);
  atualizarLocalStorage(listaUsuarios);

  alert("Conta criada com sucesso!");

  let confirma = confirm("Deseja realizar o login agora?");

  if (confirma) {
    window.location.href = "indexa.html";
  }
}

function buscarLocalStorage() {
  let dadosStorage = JSON.parse(localStorage.getItem("usuarios"));

  if (dadosStorage) {
    return dadosStorage;
  } else {
    return [];
  }
}

function atualizarLocalStorage(novoUsuario) {
  localStorage.setItem("usuarios", JSON.stringify(novoUsuario));
}
