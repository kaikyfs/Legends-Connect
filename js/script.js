//Objeto jogador
let jogador = {
    nick: undefined,
    elo: undefined,
    posicao: undefined,
    campeoesMaisJogados: undefined
};


//Array de jogadores
let jogadores = [
    {
        nick: 'Red00vmq#BR1', elo: 'Prata', posicao: 'Topo', campeoesMaisJogados: ['Singed', 'Pantheon', 'Garen', 'Mordekaiser'],
        icone: 'https://lolg-cdn.porofessor.gg/img/d/summonerIcons/14.9/64/4618.png', capa: 'https://lolg-cdn.porofessor.gg/img/d/champion-banners/80.jpg'
    },
    {
        nick: 'Lavinia#BR20', elo: 'Bronze', posicao: 'Suporte', campeoesMaisJogados: ['Lux', 'Lulu', 'Nami'],
        icone: 'https://lolg-cdn.porofessor.gg/img/d/summonerIcons/14.9/64/5675.png', capa: 'https://lolg-cdn.porofessor.gg/img/d/champion-banners/99.jpg'
    },
    {
        nick: 'rdg1#60hz', elo: 'Platina', posicao: 'Caçador', campeoesMaisJogados: ['Graves', 'Lee Sin', 'Jax'],
        icone: 'https://lolg-cdn.porofessor.gg/img/d/summonerIcons/14.9/64/6570.png', capa: 'https://lolg-cdn.porofessor.gg/img/d/champion-banners/104.jpg'
    },
    {
        nick: 'IIllIIlIlIlIlI#BR1', elo: 'Ouro', posicao: 'Atirador', campeoesMaisJogados: ['Zeri', 'Varus', 'Ezreal', 'Jinx', 'Xayah'],
        icone: 'https://lolg-cdn.porofessor.gg/img/d/summonerIcons/14.9/64/6502.png', capa: 'https://lolg-cdn.porofessor.gg/img/d/champion-banners/221.jpg'
    }
];

function preencherTabelaJogadores(jogadores) {
    const tabelaBody = document.querySelector('#tabela-jogadores tbody');

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

// Se estiver na página de perfil, carregue as informações do jogador
if (window.location.pathname.includes('perfil.html')) {
    // Obtém o nick do jogador da URL
    const nickJogador = getParameterByName('nick');

    // Encontre o jogador com o nick fornecido e carregue suas informações
    const jogadorEncontrado = jogadores.find(jogador => jogador.nick === nickJogador);
    if (jogadorEncontrado) {
        // Chame a função para exibir as informações do jogador
        exibirInformacoesDoJogador(jogadorEncontrado);
    } else {
        // Se o jogador não for encontrado, exiba uma mensagem indicando isso
        alert('Jogador não encontrado');
    }
}

// Função para exibir informações do jogador na página de perfil
function exibirInformacoesDoJogador(jogadorEncontrado) {
    if (jogadorEncontrado) {
        const nick = document.querySelector('#nickPlayer');
        const role = document.querySelector('#posicaoPlayer');
        const icone = document.getElementById('iconePerfil');
        const capa = document.getElementById('div1_perfil');
        const fotoLane = document.getElementById('imgLane');
        const listaChamp = document.getElementById('lista-campeoes');
        const eloImagem = document.getElementById('imgElo');
        const elo = document.querySelector('#eloPlayer')

        //Preenche as informações de cada jogador
        nick.textContent = jogadorEncontrado.nick;
        role.textContent = jogadorEncontrado.posicao;
        icone.src = jogadorEncontrado.icone;
        capa.style.backgroundImage = `url(${jogadorEncontrado.capa})`;
        fotoLane.src = jogadorEncontrado.lane;
        elo.textContent = jogadorEncontrado.elo;

        //Limpa qualquer dado existente na lista de campeões
        listaChamp.innerHTML = '';

        //Adiciona cada campeão mais jogado como um item da lista
        jogadorEncontrado.campeoesMaisJogados.forEach(campeao => {
            const itemLista = document.createElement('li');
            itemLista.textContent = campeao;
            listaChamp.appendChild(itemLista);
        });

        // Verifica o elo do jogador e carrega a imagem correspondente ao elo
        if (jogadorEncontrado.elo === 'Prata') {
            eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/3.png?v=9';
        } else if (jogadorEncontrado.elo === 'Bronze') {
            eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/2.png?v=9';
        } else if (jogadorEncontrado.elo === 'Platina') {
            eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/5.png?v=9';
        } else if (jogadorEncontrado.elo === 'Ouro'){
            eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/4.png?v=9';
        }

        // Verifica o elo do jogador e carrega a imagem correspondente a posição
        if (jogadorEncontrado.posicao === 'Topo') {
            fotoLane.src = '../img/Lane/top.png';
        } else if (jogadorEncontrado.posicao === 'Suporte') {
            fotoLane.src = '../img/Lane/sup.png';
        } else if (jogadorEncontrado.posicao === 'Caçador') {
            fotoLane.src = '../img/Lane/jungle.png';
        } else if (jogadorEncontrado.posicao === 'Atirador'){
            fotoLane.src = '../img/Lane/adc.png';
        }

        //Para o titulo da pagina
        document.title = jogadorEncontrado.nick;
    } else {
        // Se o jogador não for encontrado, exiba uma mensagem indicando isso
        const saida = document.querySelector('#nickPlayer');
        saida.textContent = 'Jogador não encontrado';
    }
}

