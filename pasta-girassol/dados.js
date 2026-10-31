/* Gerado por montar.js a partir de conteudo.js: não edite aqui. */
const DADOS = {
  demo: [
  {
    "aba": "O plano limitou o número de sessões",
    "etq": "Plano de saúde",
    "titulo": "O plano limitou as sessões",
    "blocos": [
      [
        "O que diz a regra",
        "Desde a RN 541/2022 da ANS, não há limite de sessões com psicólogo, fonoaudiólogo, terapeuta ocupacional e fisioterapeuta. Vale o que foi prescrito."
      ],
      [
        "O que fazer agora",
        "Peça a negativa por escrito, com o motivo e a cláusula. Anote o protocolo. Se não resolver, registre na ouvidoria e depois na ANS (0800 701 9656)."
      ],
      [
        "Na Pasta",
        "Modelo 1 (pedido de autorização) e Modelo 2 (reclamação na ANS), prontos para copiar."
      ]
    ]
  },
  {
    "aba": "Negaram o método indicado pelo médico",
    "etq": "Plano de saúde",
    "titulo": "Negaram o método indicado",
    "blocos": [
      [
        "O que diz a regra",
        "Pela RN 465/2021 da ANS, com redação da RN 539/2022, o plano deve cobrir o método ou técnica indicado pelo médico assistente para CID F84."
      ],
      [
        "O que fazer agora",
        "Confira se o laudo e a prescrição citam o método e a carga horária (checklist da Parte 2). Reenvie o pedido com eles e peça resposta por escrito."
      ],
      [
        "Na Pasta",
        "Checklist do laudo que funciona e frases prontas para o telefone."
      ]
    ]
  },
  {
    "aba": "Não tem terapeuta na rede",
    "etq": "Plano de saúde",
    "titulo": "Não tem profissional disponível",
    "blocos": [
      [
        "O que diz a regra",
        "A ANS define prazos máximos: 10 dias úteis para psicólogo, fono e terapeuta ocupacional. Sem profissional no prazo, o plano deve garantir o atendimento conforme as regras da ANS."
      ],
      [
        "O que fazer agora",
        "Anote a data do pedido e o protocolo: é ele que conta o prazo. Passou do prazo, pergunte por escrito como o plano vai garantir o atendimento."
      ],
      [
        "Na Pasta",
        "Ficha 3 (controle de protocolos) e o caminho do reembolso."
      ]
    ]
  },
  {
    "aba": "A escola disse que “não tem estrutura”",
    "etq": "Escola",
    "titulo": "A escola recusou ou não quer adaptar",
    "blocos": [
      [
        "O que diz a regra",
        "A Lei 12.764/2012 prevê multa ao gestor que recusar matrícula de aluno com TEA e garante acompanhante especializado quando comprovada a necessidade. Escola particular não pode cobrar a mais pelas adaptações (Lei 13.146/2015)."
      ],
      [
        "O que fazer agora",
        "Faça o pedido por escrito, em duas vias, e peça a assinatura da escola na sua cópia. Negou? Secretaria de educação, Conselho Tutelar e Promotoria."
      ],
      [
        "Na Pasta",
        "Modelo 4 (acompanhante e adaptações) e o que levar na primeira reunião."
      ]
    ]
  },
  {
    "aba": "Quero saber se tenho direito ao BPC",
    "etq": "Benefícios",
    "titulo": "BPC (LOAS): um salário mínimo por mês",
    "blocos": [
      [
        "Quem pode",
        "Pessoa com deficiência, incluindo autismo, de família com renda por pessoa de até 1/4 do salário mínimo (há casos analisados individualmente)."
      ],
      [
        "Como pedir",
        "Cadastro Único atualizado no CRAS, depois pedido no Meu INSS ou pelo 135, com laudo e relatórios. Há avaliação médica e social."
      ],
      [
        "Na Pasta",
        "A ordem certa dos pedidos e, no kit extra, o modelo de recurso se o INSS negar."
      ]
    ]
  }
],
  demoFonte: "Trecho da Pasta Girassol. Informação geral com base em leis federais e normas da ANS; não substitui advogado ou Defensoria.",
  calc: { campos: [{"id":"horas","rotulo":"Horas de terapia por semana sem cobertura","ajuda":"Sessões negadas, cortadas ou sem profissional na rede","tipo":"horas","min":1,"max":40,"passo":1,"valor":8},{"id":"valor","rotulo":"Valor de uma sessão particular","ajuda":"Psicologia, fono ou terapia ocupacional na sua cidade","tipo":"reais","min":80,"max":400,"passo":10,"valor":160}], conta: function (v, preco) {
      const br = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");
      const mes = v.horas * 4.3 * v.valor, ano = mes * 12, ir = ano * 0.275;
      return {
        grande: ano,
        linhas: [["Por mês", br(mes)], ["Por ano", br(ano)], ["Se já paga e declara: pode voltar no IR (alíquota de 27,5%)", "até " + br(ir)]],
        paga: `A Pasta custa <b>R$ ${preco}</b>, uma vez só: menos que <b>${Math.max(1, Math.ceil((preco / v.valor) * 60))} minutos</b> de uma sessão particular.`,
      };
    } },
};
