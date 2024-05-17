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


document.getElementById('botao-pesquisa-perfil').addEventListener('click', function() {
    const textoPesquisa = document.getElementById('pesquisa').value;
    window.location.href = 'perfil.html?nick=' + encodeURIComponent(textoPesquisa);
});

window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nick = urlParams.get('nick');

    if (nick) {
        fetch('/api/jogador/' + encodeURIComponent(nick))
            .then(response => response.json())
            .then(jogador => {
                if (jogador.error) {
                    document.getElementById('nickPlayer').textContent = 'Jogador não encontrado';
                } else {
                    //pensar o que fazer aqui
                }
            })
            .catch(error => {
                console.error('Erro ao buscar jogador:', error);
                document.getElementById('nickPlayer').textContent = 'Erro ao buscar jogador';
            });
    }
});


