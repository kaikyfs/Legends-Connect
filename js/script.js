//Objeto jogador
let jogador = {
    nick: undefined,
    elo: undefined,
    posicao: undefined,
    campeoesMaisJogados: undefined
};


//Array de jogadores
let jogadores = [
    { nick: 'Red00vmq#BR1', elo: 'Prata II', posicao: 'Topo', campeoesMaisJogados: ['Singed', 'Pantheon', 'Garen', 'Mordekaiser'] },
    { nick: 'Lavinia#BR20', elo: 'Bronze III', posicao: 'Suporte', campeoesMaisJogados: ['Lux', 'Lulu', 'Nami'] },
    { nick: 'rdg1#60hz', elo: 'Platina IV', posicao: 'Caçador', campeoesMaisJogados: ['Graves', 'Lee Sin', 'Jax'] },
    { nick: 'Josias22#BR15', elo: 'Ouro I', posicao: 'Meio', campeoesMaisJogados: ['Azir', 'Yasuo', 'LeBlanc'] },
    { nick: 'GamerGirl#NA4', elo: 'Diamante II', posicao: 'Atirador', campeoesMaisJogados: ["Kai'Sa", 'Jhin', 'Ashe'] },
    { nick: 'MestreYoda#EUNE', elo: 'Mestre', posicao: 'Caçador', campeoesMaisJogados: ['Elise', 'Nidalee', 'Kindred'] },
    { nick: 'Rainbow#EUW', elo: 'Platina III', posicao: 'Topo', campeoesMaisJogados: ['Riven', 'Fiora', 'Camille'] },
    { nick: 'Invictus#KR', elo: 'Desafiante', posicao: 'Meio', campeoesMaisJogados: ['Azir', 'Syndra', 'Orianna'] },
    { nick: 'Jukes#BR1', elo: 'Mestre', posicao: 'Meio/Suporte', campeoesMaisJogados: ['Yasuo', 'Yone', 'Zed', 'Shaco', 'Ashe'] }
];

function buscarJogadorPorNome(nome) {
    for (let i = 0; i < jogadores.length; i++) {
        if (jogadores[i].nick === nome) {
            return jogadores[i];
        }
    }
    return null;
}

// Adicione um evento de clique ao botão de pesquisa la do HTML
document.getElementById('botao-pesquisa').addEventListener('click', function() {
    // Obtenha o valor inserido no campo de pesquisa
    let nomeBuscado = document.getElementById('pesquisa').value;

    // Chame a função de busca de jogador por nome e armazene o resultado
    let jogadorEncontrado = buscarJogadorPorNome(nomeBuscado);

    if (jogadorEncontrado !== null) {
        console.log('Jogador encontrado:', jogadorEncontrado);
    } else {
        console.log('Jogador não encontrado');
    }
});


const tabelaBody = document.querySelector('#tabela-jogadores tbody');

// Adiciona os jogadores à tabela
jogadores.forEach(jogador => {
    const linha = document.createElement('tr'); // Cria uma nova linha
    linha.innerHTML = `
        <td><a href="#" class="link-jogador">${jogador.nick}</a></td>
        <td>${jogador.elo}</td>
        <td>${jogador.posicao}</td>
        <td>${jogador.campeoesMaisJogados.join(', ')}</td>
    `; // Define o HTML da linha com os dados do jogador
    tabelaBody.appendChild(linha); // Adiciona a linha ao corpo da tabela
});