// Função para preencher a tabela com os dados dos jogadores
function preencherTabelaJogadores(jogadores) {
    const tabelaBody = document.querySelector('#tabela-jogadores tbody');
    tabelaBody.innerHTML = '';

    jogadores.forEach(jogador => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
                <td>${jogador.nick}</td>
                <td>${jogador.elo}</td>
                <td>${jogador.posicao}</td>
                <td>${jogador.campeoesMaisJogados.join(', ')}</td>
            `;
        tabelaBody.appendChild(linha);
    });
}
// Função para buscar os dados dos jogadores no backend
function buscarJogadores() {
    fetch('/api/jogadores')
        .then(response => response.json())
        .then(jogadores => {
            preencherTabelaJogadores(jogadores);
        })
        .catch(error => {
            console.error('Erro ao buscar jogadores:', error);
        });
}
// Quando a página carregar, buscar os jogadores
window.addEventListener('load', function () {
    buscarJogadores();
});



// Função para pesquisar jogador
function pesquisarJogador(textoPesquisa) {
    // Encontre o jogador com o mesmo nick que foi pesquisado
    const jogadorEncontrado = jogadores.find(jogador => jogador.nick === textoPesquisa);

    // Se o jogador for encontrado, exiba as informações
    if (jogadorEncontrado) {
        // Redirecione o usuário para a página de perfil, passando o nick do jogador como parâmetro na URL
        window.location.href = 'perfil.html?nick=' + encodeURIComponent(jogadorEncontrado.nick);
    } else {
        // Se o jogador não for encontrado, exiba uma mensagem indicando isso
        alert('Jogador não encontrado');
    }
}


// Função para obter parâmetros da URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


document.getElementById('botao-pesquisa-inicio').addEventListener('click', function () {
    const textoPesquisa = document.getElementById('pesquisa').value;
    window.location.href = 'perfil.html?nick=' + encodeURIComponent(textoPesquisa);
});



// Codigo para o model
// Função para abrir e fechar o modal
const modal = document.getElementById('modal-criar-jogador');
const btn = document.getElementById('botao-criar-jogador');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
    modal.style.display = 'block';
}

span.onclick = function () {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Função para lidar com a criação do jogador
document.getElementById('form-criar-jogador').addEventListener('submit', function (event) {
    event.preventDefault();

    const nick = document.getElementById('nick').value;
    const posicao = document.getElementById('posicao').value;
    const icone = document.getElementById('icone').value;
    const capa = document.getElementById('capa').value;
    const elo = document.getElementById('elo').value;
    const campeoes = document.getElementById('campeoes').value.split(',').map(item => item.trim());

    const novoJogador = {
        nick: nick,
        posicao: posicao,
        icone: icone,
        capa: capa,
        elo: elo,
        campeoesMaisJogados: campeoes
    };

    // Enviar os dados para o servidor
    fetch('/api/jogadores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoJogador)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Jogador criado com sucesso!');
                modal.style.display = 'none';
                // Atualize a tabela de jogadores
                buscarJogadores();
            } else {
                alert('Erro ao criar jogador');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao criar jogador');
        });
});



//função para caixa de seleção
// Event listener para mudança na caixa de seleção de elo
document.getElementById('select-elo').addEventListener('change', function () {
    const eloSelecionado = this.value;

    fetch('/api/jogadores')
        .then(response => response.json())
        .then(jogadores => {
            // Filtrar jogadores com base no elo selecionado
            const jogadoresFiltrados = eloSelecionado === 'todos' ? jogadores : jogadores.filter(jogador => jogador.elo === eloSelecionado);
            preencherTabelaJogadores(jogadoresFiltrados);
        })
        .catch(error => {
            console.error('Erro ao buscar jogadores:', error);
        });
});