//  capturar os elementos pelo id

let inputEmail = document.getElementById("e-mail");

let inputSenha = document.getElementById("senha");

let botao = document.getElementById("botao-entrar");

let botaoCriar = document.getElementById("botao-criar");

// criar os eventos possiveis nos botoes

botao.addEventListener("click", entrarNoSistema);

botaoCriar.addEventListener("click", criarConta);

function entrarNoSistema() {
  let email = inputEmail.value;
  let senha = inputSenha.value;

  let listaUsuarios = buscarLocalStorage();

  let usuarioEncontrado = listaUsuarios.find((usuario) => {
    if (usuario.email === email && usuario.senha === senha) {
      return usuario;
    }
  });

  //quando não encontra, o find retorna -1
  if (usuarioEncontrado === -1) {
    alert("Usuário ou senha está incorretas!");
    return;
  }

  let posicao = listaUsuarios.findIndex(
    (usuario) => usuario === usuarioEncontrado
  );

  window.sessionStorage.setItem("indiceUsuarioLogado", posicao);
  window.location.href = "indexc.html";
}

function criarConta() {
  window.location.href = "indexb.html";
}

function buscarLocalStorage() {
  let dadosStorage = JSON.parse(localStorage.getItem("usuarios"));

  if (dadosStorage) {
    return dadosStorage;
  } else {
    return [];
  }
}
