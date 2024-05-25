from flask import Flask, jsonify, render_template, request
from sqlalchemy.engine import URL
import sqlalchemy as db

app = Flask(__name__)

# Configuração do banco de dados
url_object = URL.create(
    "postgresql",
    username="postgres",
    password="524590",
    host="localhost",
    database="Legends Connect",
)

engine = db.create_engine(
    url_object
)  # Cria um objeto que representa a conexão com o banco de dados
conn = engine.connect()  # Abre a conexão com o banco de dados
metadata = (
    db.MetaData()
)  # Objeto para guardar as informações referentes às tabelas do banco de dados
jogadores_table = db.Table(
    "jogadores", metadata, autoload_with=engine
)  # Associa a tabela jogadores a um objeto


# Definindo a classe Jogador
class Jogador:
    def __init__(
        self, nick, posicao, imgLane, icone, capa, elo, imgElo, campeoesMaisJogados
    ):
        self.nick = nick
        self.posicao = posicao
        self.imgLane = imgLane
        self.icone = icone
        self.capa = capa
        self.elo = elo
        self.imgElo = imgElo
        self.campeoesMaisJogados = campeoesMaisJogados

    # Para converter em um dicionário
    def to_dict(self):
        return {
            "nick": self.nick,
            "posicao": self.posicao,
            "imgLane": self.imgLane,
            "icone": self.icone,
            "capa": self.capa,
            "elo": self.elo,
            "imgElo": self.imgElo,
            "campeoesMaisJogados": self.campeoesMaisJogados,
        }


# Função para pegar todos os jogadores e retornar eles como uma lista
def buscar_todos_jogadores():
    consulta = jogadores_table.select()  # Um select na tabela toda
    resultado = (
        conn.execute(consulta).mappings().fetchall()
    )  # Executa a consulta criada e busca todos os resultados como dicionários
    jogadores = []
    for linha in resultado:
        jogadores.append(
            Jogador(
                nick=linha["nick"],
                posicao=linha["posicao"],
                imgLane=linha["imglane"],
                icone=linha["icone"],
                capa=linha["capa"],
                elo=linha["elo"],
                imgElo=linha["imgelo"],
                campeoesMaisJogados=linha["campeoesmaisjogados"].split(","),
            )
        )
    return jogadores


# Buscar um jogador específico pelo nick
def buscar_um_jogador(nick):
    consulta = jogadores_table.select().where(
        jogadores_table.c.nick == nick
    )  # Consulta para selecionar o jogador da tabela jogadores onde a coluna nick é igual ao valor fornecido
    resultado = (
        conn.execute(consulta).mappings().fetchone()
    )  # Busca o resultado da consulta como dicionário
    if resultado:
        return Jogador(
            nick=resultado["nick"],
            posicao=resultado["posicao"],
            imgLane=resultado["imglane"],
            icone=resultado["icone"],
            capa=resultado["capa"],
            elo=resultado["elo"],
            imgElo=resultado["imgelo"],
            campeoesMaisJogados=resultado["campeoesmaisjogados"].split(","),
        )
    return None


@app.route("/")
def index():
    jogadores = buscar_todos_jogadores()
    return render_template("index.html", jogadores=jogadores)


@app.route("/perfil.html")
def perfil():
    # Obter o parâmetro 'nick' da URL
    nick = request.args.get("nick")

    # Encontrar o jogador correspondente
    jogador = buscar_um_jogador(nick)

    # Renderizar o template perfil.html com os dados do jogador
    return render_template(
        "perfil.html", jogador=jogador.to_dict() if jogador else None
    )


@app.route("/api/jogador/<nick>", methods=["GET"])
def get_jogador(nick):
    jogador = buscar_um_jogador(nick)
    if jogador:
        return jsonify(jogador.to_dict())
    else:
        return jsonify({"error": "Jogador não encontrado"}), 404


@app.route("/api/jogadores", methods=["GET"])
def get_jogadores():
    jogadores = buscar_todos_jogadores()
    return jsonify([jogador.to_dict() for jogador in jogadores])


@app.route("/api/jogadores", methods=["POST"])
def criar_jogador():
    dados = request.json  # Extrai os dados do JSON enviado na solicitação POST

    # Cria um novo objeto Jogador com base nos dados recebidos
    novo_jogador = Jogador(
        nick=dados["nick"],
        posicao=dados["posicao"],
        imgLane="",
        icone=dados["icone"],
        capa=dados["capa"],
        elo=dados["elo"],
        imgElo="",
        campeoesMaisJogados=dados["campeoesMaisJogados"],
    )
    # Cria uma instrução de inserção para adicionar o novo jogador à tabela no banco de dados
    inserir = jogadores_table.insert().values(
        nick=novo_jogador.nick,
        posicao=novo_jogador.posicao,
        imglane=novo_jogador.imgLane,
        icone=novo_jogador.icone,
        capa=novo_jogador.capa,
        elo=novo_jogador.elo,
        imgelo=novo_jogador.imgElo,
        campeoesmaisjogados=",".join(novo_jogador.campeoesMaisJogados),
    )
    conn.execute(inserir)  # Executa a instrução de inserir no bd
    conn.commit()
    return jsonify({"success": True}), 201


@app.route("/api/jogadores/<nick>", methods=["DELETE"])
def remover_jogador(nick):
    remove = jogadores_table.delete().where(
        jogadores_table.c.nick == nick
    )  # Cria a consulta
    resultado = conn.execute(remove)  # Executa a consulta
    conn.commit()
    # Verifica se algum registro foi removido (resultado.rowcount retorna o número de linhas afetadas)
    if resultado.rowcount > 0:
        return (
            jsonify({"success": True, "message": "Jogador removido com sucesso!"}),
            200,
        )
    else:
        return jsonify({"success": False, "message": "Jogador não encontrado."}), 404


@app.route("/api/jogadores/<nick>", methods=["PUT"])
def atualizar_jogador(nick):
    dados = request.json
    atualizar = (
        jogadores_table.update()
        .where(jogadores_table.c.nick == nick)
        .values(
            posicao=dados.get("posicao"),
            icone=dados.get("icone"),
            capa=dados.get("capa"),
            elo=dados.get("elo"),
            campeoesmaisjogados=",".join(dados.get("campeoesMaisJogados")),
        )
    )
    resultado = conn.execute(atualizar)  # Executa a instrução
    conn.commit()

    if resultado.rowcount > 0:
        return (
            jsonify({"success": True, "message": "Jogador atualizado com sucesso"}),
            200,
        )
    else:
        return jsonify({"success": False, "message": "Jogador não encontrado."}), 404
