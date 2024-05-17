from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


# Definindo a classe Jogador
class Jogador:
    def __init__(self, nick, posicao, imgLane, icone, capa, elo, imgElo, campeoesMaisJogados):
        self.nick = nick
        self.posicao = posicao
        self.imgLane = imgLane
        self.icone = icone
        self.capa = capa
        self.elo = elo
        self.imgElo = imgElo
        self.campeoesMaisJogados = campeoesMaisJogados
   #Para converter em um dicionario 
    def to_dict(self):
        return {
            'nick': self.nick,
            'posicao': self.posicao,
            'imgLane' : self.imgLane,
            'icone': self.icone,
            'capa': self.capa,
            'elo': self.elo,
            'imgElo' : self.imgElo,
            'campeoesMaisJogados': self.campeoesMaisJogados
        }

# Definindo os dados dos jogadores no backend
jogadores = [
    Jogador('Red00vmq#BR1', 'Topo', '../static/img/Lane/top.png', 'https://lolg-cdn.porofessor.gg/img/d/summonerIcons/14.9/64/4618.png', 'https://lolg-cdn.porofessor.gg/img/d/champion-banners/80.jpg', 'Prata', 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/3.png?v=9', ['Singed', 'Pantheon', 'Garen', 'Mordekaiser']),
    Jogador('Lavinia#BR20', 'Suporte', '../static/img/Lane/sup.png', 'https://lolg-cdn.porofessor.gg/img/d/summonerIcons/14.9/64/5675.png', 'https://lolg-cdn.porofessor.gg/img/d/champion-banners/99.jpg', 'Bronze', 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/2.png?v=9', ['Lux', 'Lulu', 'Nami']),
    Jogador('rdg1#60hz', 'Caçador', '../static/img/Lane/jungle.png', 'https://lolg-cdn.porofessor.gg/img/d/summonerIcons/14.9/64/6570.png', 'https://lolg-cdn.porofessor.gg/img/d/champion-banners/104.jpg', 'Platina', 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/5.png?v=9', ['Graves', 'Lee Sin', 'Jax']),
    Jogador('IIllIIlIlIlIlI#BR1', 'Atirador', '../static/img/Lane/adc.png', 'https://lolg-cdn.porofessor.gg/img/d/summonerIcons/14.9/64/6502.png', 'https://lolg-cdn.porofessor.gg/img/d/champion-banners/221.jpg', 'Ouro', 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/4.png?v=9', ['Zeri', 'Varus', 'Ezreal', 'Jinx', 'Xayah']),
    Jogador('andersoncp123#BR1', 'Topo', '../static/img/top.png', 'https://lolg-cdn.porofessor.gg/img/d/summonerIcons/14.9/64/5734.png', 'https://lolg-cdn.porofessor.gg/img/d/champion-banners/98.jpg', 'Ouro', 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/4.png?v=9', ['Shen', 'Seraphine', 'Mordekaiser', 'Nami', 'Kayn']),
]


@app.route('/')
def index():
   return render_template('index.html', jogadores=jogadores)


@app.route('/index.html')
def home():
   return render_template('index.html', jogadores=jogadores)

@app.route('/perfil.html')
def perfil():
    # Obter o parâmetro 'nick' da URL
    nick = request.args.get('nick')

    # Encontrar o jogador correspondente
    jogador = None
    for j in jogadores:
        if j.nick == nick:
            jogador = j
            break

    # Renderizar o template perfil.html com os dados do jogador
    return render_template('perfil.html', jogador=jogador)

@app.route('/api/jogador/<nick>')
def get_jogador(nick):
    jogador = next((j for j in jogadores if j['nick'] == nick), None)
    if jogador:
        return jsonify(jogador)
    else:
        return jsonify({'error': 'Jogador não encontrado'}), 404