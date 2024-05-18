// garante que seu código só será executado após todos os recursos da página serem carregados
window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const nick = urlParams.get('nick');

    console.log('Nick obtido da URL:', nick); // Depuração

    if (nick) {
        fetch('/api/jogador/' + encodeURIComponent(nick))
            .then(response => {
                console.log('Resposta da API recebida:', response); // Depuração
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                return response.json();
            })
            .then(jogador => {
                console.log('Dados do jogador recebidos:', jogador); // Depuração
                if (jogador.error) {
                    document.getElementById('nickPlayer').textContent = 'Jogador não encontrado';
                } else {
                    document.getElementById('nickPlayer').textContent = jogador.nick;
                    document.getElementById('lane').textContent = jogador.posicao;
                    document.getElementById('iconePerfil').src = jogador.icone;
                    document.getElementById('div1_perfil').style.backgroundImage = `url(${jogador.capa})`;
                    document.getElementById('eloPlayer').textContent = jogador.elo;

                    // Definir a imagem da posição
                    const laneImagem = document.getElementById('imgLane');
                    if (jogador.posicao === 'Topo') {
                        laneImagem.src = '../static/img/Lane/top.png';
                    } else if (jogador.posicao === 'Suporte') {
                        laneImagem.src = '../static/img/Lane/sup.png';
                    } else if (jogador.posicao === 'Caçador') {
                        laneImagem.src = '../static/img/Lane/jungle.png';
                    } else if (jogador.posicao === 'Atirador') {
                        laneImagem.src = '../static/img/Lane/adc.png';
                    } else if(jogador.posicao === 'Meio'){
                        laneImagem.src = '../static/img/Lane/mid.png'
                    }

                    // Definir a imagem do elo
                    const eloImagem = document.getElementById('imgElo');
                    if (jogador.elo === 'Prata') {
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/3.png?v=9';
                    } else if (jogador.elo === 'Bronze') {
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/2.png?v=9';
                    } else if (jogador.elo === 'Platina') {
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/5.png?v=9';
                    } else if (jogador.elo === 'Ouro') {
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/4.png?v=9';
                    } else if (jogador.elo === 'Ferro'){
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/1.png?v=9';
                    } else if (jogador.elo === 'Esmeralda'){
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/6.png?v=9';
                    } else if (jogador.elo === 'Diamante'){
                        eloImagem.src =  'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/7.png?v=9';
                    } else if (jogador.elo === 'Mestre'){
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/8.png?v=9';
                    } else if (jogador.elo === 'Grão Mestre'){
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/9.png?v=9';
                    } else if (jogador.elo === 'Desafiante'){
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/10.png?v=9';
                    } else {
                        eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/0.png?v=9';
                    }

                    // Adicionar campeões mais jogados
                    const listaChamp = document.getElementById('lista-campeoes');
                    listaChamp.innerHTML = '';
                    jogador.campeoesMaisJogados.forEach(campeao => {
                        const itemLista = document.createElement('li');
                        itemLista.textContent = campeao;
                        listaChamp.appendChild(itemLista);
                    });

                    document.title = jogador.nick;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar jogador:', error);
                document.getElementById('nickPlayer').textContent = 'Erro ao buscar jogador';
            });
    } else {
        console.log('Nenhum nick encontrado na URL'); // Depuração
    }
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