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