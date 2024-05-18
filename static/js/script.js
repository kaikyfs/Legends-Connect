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

// // Se estiver na página de perfil, carregue as informações do jogador
// if (window.location.pathname.includes('perfil.html')) {
//     // Obtém o nick do jogador da URL
//     const nickJogador = getParameterByName('nick');

//     // Encontre o jogador com o nick fornecido e carregue suas informações
//     const jogadorEncontrado = jogadores.find(jogador => jogador.nick === nickJogador);
//     if (jogadorEncontrado) {
//         // Chame a função para exibir as informações do jogador
//         exibirInformacoesDoJogador(jogadorEncontrado);
//     } else {
//         // Se o jogador não for encontrado, exiba uma mensagem indicando isso
//         alert('Jogador não encontrado');
//     }
// }


document.getElementById('botao-pesquisa-perfil').addEventListener('click', function() {
    const textoPesquisa = document.getElementById('pesquisa').value;
    window.location.href = 'perfil.html?nick=' + encodeURIComponent(textoPesquisa);
});

window.addEventListener('load', function() {
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




// // Função para exibir informações do jogador na página de perfil
// function exibirInformacoesDoJogador(jogadorEncontrado) {
//     if (jogadorEncontrado) {
//         const nick = document.querySelector('#nickPlayer');
//         const role = document.querySelector('#posicaoPlayer');
//         const icone = document.getElementById('iconePerfil');
//         const capa = document.getElementById('div1_perfil');
//         const fotoLane = document.getElementById('imgLane');
//         const listaChamp = document.getElementById('lista-campeoes');
//         const eloImagem = document.getElementById('imgElo');
//         const elo = document.querySelector('#eloPlayer')

//         //Preenche as informações de cada jogador
//         nick.textContent = jogadorEncontrado.nick;
//         role.textContent = jogadorEncontrado.posicao;
//         icone.src = jogadorEncontrado.icone;
//         capa.style.backgroundImage = `url(${jogadorEncontrado.capa})`;
//         fotoLane.src = jogadorEncontrado.lane;
//         elo.textContent = jogadorEncontrado.elo;

//         //Limpa qualquer dado existente na lista de campeões
//         listaChamp.innerHTML = '';

//         //Adiciona cada campeão mais jogado como um item da lista
//         jogadorEncontrado.campeoesMaisJogados.forEach(campeao => {
//             const itemLista = document.createElement('li');
//             itemLista.textContent = campeao;
//             listaChamp.appendChild(itemLista);
//         });

//         // Verifica o elo do jogador e carrega a imagem correspondente ao elo
//         if (jogadorEncontrado.elo === 'Prata') {
//             eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/3.png?v=9';
//         } else if (jogadorEncontrado.elo === 'Bronze') {
//             eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/2.png?v=9';
//         } else if (jogadorEncontrado.elo === 'Platina') {
//             eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/5.png?v=9';
//         } else if (jogadorEncontrado.elo === 'Ouro'){
//             eloImagem.src = 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/4.png?v=9';
//         }

//         // Verifica o elo do jogador e carrega a imagem correspondente a posição
//         if (jogadorEncontrado.posicao === 'Topo') {
//             fotoLane.src = '../static/img/Lane/top.png';
//         } else if (jogadorEncontrado.posicao === 'Suporte') {
//             fotoLane.src = '../static/img/Lane/sup.png';
//         } else if (jogadorEncontrado.posicao === 'Caçador') {
//             fotoLane.src = '../static/img/Lane/jungle.png';
//         } else if (jogadorEncontrado.posicao === 'Atirador') {
//             fotoLane.src = '../static/img/Lane/adc.png';
//         }

//         //Para o titulo da pagina
//         document.title = jogadorEncontrado.nick;
//     } else {
//         // Se o jogador não for encontrado, exiba uma mensagem indicando isso
//         const saida = document.querySelector('#nickPlayer');
//         saida.textContent = 'Jogador não encontrado';
//     }
// }

