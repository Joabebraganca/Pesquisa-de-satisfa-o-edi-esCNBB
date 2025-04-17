// Alterna entre mostrar CPF ou CNPJ
function alternarCampoDocumento() {
  const tipo = document.getElementById('tipo-doc').value;
  const campoCpf = document.getElementById('campo-cpf');
  const campoCnpj = document.getElementById('campo-cnpj');

  if (tipo === 'cpf') {
    campoCpf.classList.remove('hidden');
    campoCpf.querySelector('input').required = true;
    campoCnpj.classList.add('hidden');
    campoCnpj.querySelector('input').required = false;
  } else {
    campoCnpj.classList.remove('hidden');
    campoCnpj.querySelector('input').required = true;
    campoCpf.classList.add('hidden');
    campoCpf.querySelector('input').required = false;
  }
}

// Envia os dados do formulário
document.getElementById("pesquisa-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const tipoDoc = document.getElementById("tipo-doc").value;
  const documento = tipoDoc === "cpf"
    ? document.getElementById("cpf").value
    : document.getElementById("cnpj").value;

  const dados = {
    documento: documento,
    tipo_documento: tipoDoc,
    atendente_id: document.getElementById("atendente").value,
    atendimento_avaliacao: document.querySelector('input[name="avaliacao"]:checked').value,
    expectativa: document.querySelector('input[name="expectativa"]:checked').value,
    indicaria: document.querySelector('input[name="indicaria"]:checked').value === "Sim",
    solicitacao: document.querySelector('input[name="solicitacao"]:checked').value,
    comentario: document.getElementById("comentario").value
  };

  try {
    const resposta = await fetch("http://localhost:3000/api/pesquisa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    alert(resultado.message || "Resposta enviada com sucesso!");
  } catch (erro) {
    console.error("Erro ao enviar:", erro);
    alert("Erro ao enviar a pesquisa.");
  }
});
