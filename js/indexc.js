verificaLogin();

let inputCodigo = document.getElementById("codigo");
let inputDescricao = document.getElementById("descricao");
let inputDetalhamento = document.getElementById("detalhamento");
let botaoSalvar = document.getElementById("btn-salvar");
let botaoAtualizar = document.getElementById("btn-atualizar");
let botaoCancelar = document.getElementById("btn-cancelar");
let botaoSair = document.getElementById("btn-sair");

let tabela = document.getElementById("tabela-recados");

// eventos
botaoSalvar.addEventListener("click", salvarRecado);
document.addEventListener("DOMContentLoaded", mostrarRecadosDoStorage);
botaoCancelar.addEventListener("click", cancelarEdicao);
botaoSair.addEventListener("click", sair);

function verificaLogin() {
  let existeLogin = sessionStorage.getItem("indiceUsuarioLogado");

  if (!existeLogin) {
    alert(`Você precisa estar logado para acessar essa página!`);
    window.location.href = "indexa.html";
    return;
  }
}

function salvarRecado() {
  let codigo = inputCodigo.value;
  let descricao = inputDescricao.value;
  let detalhamento = inputDetalhamento.value;

  let listaRecados = buscarRecadosStorage();

  let existe = listaRecados.some((recado) => recado.codigo == codigo);
  if (existe) {
    alert(`Já possui um registro com o código ${codigo}. Tente outro!`);
    inputCodigo.value = "";
    inputCodigo.focus();
    return;
  }

  let novoRecado = {
    codigo,
    descricao,
    detalhamento,
  };

  listaRecados.push(novoRecado);
  mostrarNoHtml(novoRecado);
  salvarNoLocalStorage(listaRecados);
  limparCampos();
}

function mostrarNoHtml(recado) {
  let novaLinha = document.createElement("tr");
  let colunaCodigo = document.createElement("td");
  let colunaDescricao = document.createElement("td");
  let colunaDetalhamento = document.createElement("td");
  let colunaAcoes = document.createElement("td");

  novaLinha.setAttribute("class", "registros");
  novaLinha.setAttribute("id", recado.codigo);
  colunaCodigo.innerHTML = recado.codigo;
  colunaDescricao.innerHTML = recado.descricao;
  colunaDetalhamento.innerHTML = recado.detalhamento;
  colunaAcoes.innerHTML = `
                            <button type="button" class="btn-apagar" onclick="apagarRecado(${recado.codigo})">Apagar</button>
                            <button type="button" class="btn-editar" onclick="prepararEdicao(${recado.codigo})">Editar</button>
                        `;

  novaLinha.appendChild(colunaCodigo);
  novaLinha.appendChild(colunaDescricao);
  novaLinha.appendChild(colunaDetalhamento);
  novaLinha.appendChild(colunaAcoes);
  tabela.appendChild(novaLinha);
}

function salvarNoLocalStorage(listaRecados) {
  let indiceUsuario = sessionStorage.getItem("indiceUsuarioLogado");
  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));

  listaUsuarios[indiceUsuario].recados = listaRecados;

  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
}

function buscarRecadosStorage() {
  let indiceUsuario = sessionStorage.getItem("indiceUsuarioLogado");
  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));

  return listaUsuarios[indiceUsuario].recados || [];
}

function mostrarRecadosDoStorage() {
  let listaRecadosdoStorage = buscarRecadosStorage();

  for (let recado of listaRecadosdoStorage) {
    mostrarNoHtml(recado);
  }
}

function limparCampos() {
  inputCodigo.value = "";
  inputDescricao.value = "";
  inputDetalhamento.value = "";
  inputCodigo.focus();
}

function apagarRecado(codigo) {
  let listaRecados = buscarRecadosStorage();

  let indiceEncontrado = listaRecados.findIndex(
    (recado) => recado.codigo == codigo
  );

  let confirma = confirm(`Excluir o recado ${codigo}?`);

  if (confirma) {
    let linhasTabela = document.querySelectorAll(".registros");

    for (let linha of linhasTabela) {
      if (linha.id == codigo) {
        tabela.removeChild(linha);
        listaRecados.splice(indiceEncontrado, 1);
        alert("Registro removido!");
      }
    }
    salvarNoLocalStorage(listaRecados);
  }
}

function cancelarEdicao() {
  limparCampos();
  botaoSalvar.setAttribute("style", "display: inline-block");
  botaoAtualizar.setAttribute("style", "display: none");
  botaoCancelar.setAttribute("style", "display: none");
  inputCodigo.removeAttribute("readonly");
  inputCodigo.removeAttribute("disabled");
}

function prepararEdicao(codigo) {
  botaoSalvar.setAttribute("style", "display: none");
  botaoAtualizar.setAttribute("style", "display: inline-block");
  botaoAtualizar.setAttribute("onclick", `atualizarRecado(${codigo})`);
  botaoCancelar.setAttribute("style", "display: inline-block");

  let listaRecados = buscarRecadosStorage();
  let recadoEncontrado = listaRecados.find((recado) => recado.codigo == codigo);
  console.log(recadoEncontrado);

  //adiciona o valor do recado novamente ao campo de input
  inputCodigo.value = recadoEncontrado.codigo;
  inputDescricao.value = recadoEncontrado.descricao;
  inputDetalhamento.value = recadoEncontrado.detalhamento;
  inputCodigo.setAttribute("readonly", "true");
  inputCodigo.setAttribute("disabled", "true");
}

function atualizarRecado(codigo) {
  let novoCodigo = inputCodigo.value;
  let novaDescricao = inputDescricao.value;
  let novoDetalhamento = inputDetalhamento.value;

  let recadoAtualizado = {
    codigo: novoCodigo,
    descricao: novaDescricao,
    detalhamento: novoDetalhamento,
  };

  let listaRecados = buscarRecadosStorage();
  let indiceEncontrado = listaRecados.findIndex(
    (recado) => recado.codigo == codigo
  );

  listaRecados[indiceEncontrado] = recadoAtualizado;

  let linhasTabela = document.querySelectorAll(".registros");

  for (let linha of linhasTabela) {
    if (linha.id == codigo) {
      let colunas = linha.children;

      //equivale ao codigo
      colunas[0].innerText = recadoAtualizado.codigo;

      //equivale ao titulo do Livro
      colunas[1].innerText = recadoAtualizado.descricao;

      //equivale a descricao do livro
      colunas[2].innerText = recadoAtualizado.detalhamento;
    }
  }

  salvarNoLocalStorage(listaRecados);
  cancelarEdicao();
}

function sair() {
  sessionStorage.removeItem("indiceUsuarioLogado");
  window.location.href = "indexa.html";
}
