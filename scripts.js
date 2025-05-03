const API_BASE_URL = 'https://crudcrud.com/api/f21711a9351b4e728f2affe3f6e1a30b/tarefa-aula' ; 
const form = document.getElementById('formCliente');
const lista = document.getElementById('listaClientes');

// Carrega clientes ao iniciar
window.addEventListener('DOMContentLoaded', listarClientes);

// Cadastrar cliente
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email }),
    });

    if (response.ok) {
      form.reset();
      listarClientes();
    } else {
      alert('Erro ao cadastrar cliente.');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
});

// Listar clientes
async function listarClientes() {
  lista.innerHTML = '';

  try {
    const response = await fetch(API_BASE_URL);
    const clientes = await response.json();

    clientes.forEach((cliente) => {
      const li = document.createElement('li');
      li.textContent = `${cliente.nome} - ${cliente.email} `;

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.onclick = () => excluirCliente(cliente._id);

      li.appendChild(btnExcluir);
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
  }
}

// Excluir cliente
async function excluirCliente(id) {
  try {
    await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    listarClientes();
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
  }
}
