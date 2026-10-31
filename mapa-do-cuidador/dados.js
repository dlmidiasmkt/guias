/* Gerado por montar.js a partir de conteudo.js: não edite aqui. */
const DADOS = {
  demo: [
  {
    "aba": "Faz a mesma pergunta 20 vezes",
    "etq": "Situação 1",
    "titulo": "Faz a mesma pergunta 20 vezes",
    "blocos": [
      [
        "Por quê",
        "A pessoa não guarda a resposta: para ela, é sempre a primeira vez. Muitas vezes, por trás da pergunta existe ansiedade."
      ],
      [
        "Na hora",
        "Responda com calma, como se fosse a primeira vez. Se perceber ansiedade: “Fica tranquila, eu te aviso quando for a hora.”"
      ],
      [
        "Evite",
        "“Eu já falei!”, “Você não lembra?”"
      ],
      [
        "Previna",
        "Um quadro grande à vista com a informação do dia. Evite avisar compromissos com muita antecedência."
      ]
    ]
  },
  {
    "aba": "Quer “ir para casa” estando em casa",
    "etq": "Situação 4",
    "titulo": "“Quero ir para a minha casa”",
    "blocos": [
      [
        "Por quê",
        "“Casa” muitas vezes não é o endereço: é a sensação de segurança, ou a casa da infância. Costuma aparecer no fim da tarde."
      ],
      [
        "Na hora",
        "Não diga “você está em casa”. Pergunte: “Como era a sua casa?” e depois redirecione: “Vamos tomar um café antes de sair?”"
      ],
      [
        "Previna",
        "Fotos e músicas antigas por perto, luz acesa antes de escurecer, fim de dia tranquilo."
      ]
    ]
  },
  {
    "aba": "Fica agressivo ou grita",
    "etq": "Situação 2",
    "titulo": "Fica agressivo ou grita",
    "blocos": [
      [
        "Por quê",
        "Quase sempre é medo, dor, cansaço, fome, vontade de ir ao banheiro ou sensação de estar sendo forçado."
      ],
      [
        "Na hora",
        "Dê espaço. Não segure e não rebata. Fale pouco e baixo. Saia do cômodo se precisar e volte em alguns minutos."
      ],
      [
        "Previna",
        "Anote no Diário de Comportamentos o que aconteceu antes. Se for frequente ou de repente, leve ao médico: dor e infecções causam agitação."
      ]
    ]
  },
  {
    "aba": "Recusa o banho",
    "etq": "Situação 3",
    "titulo": "Recusa o banho",
    "blocos": [
      [
        "Por quê",
        "Frio, vergonha, medo da água, banheiro escuro ou escorregadio."
      ],
      [
        "Na hora",
        "Não insista. Tente em 20 minutos, de outro jeito: “A água está quentinha, vamos nos arrumar para o almoço?”"
      ],
      [
        "Previna",
        "Banheiro aquecido, toalha cobrindo o corpo, cadeira de banho, uma etapa de cada vez. Banho por partes também conta."
      ]
    ]
  },
  {
    "aba": "Não reconhece você",
    "etq": "Situação 12",
    "titulo": "Não reconhece você",
    "blocos": [
      [
        "Por quê",
        "A memória mais recente vai antes. A pessoa pode procurar o filho “criança” ou achar que a filha é a mãe dela."
      ],
      [
        "Na hora",
        "Não pergunte “você sabe quem eu sou?”. Apresente-se com carinho: “Oi, mãe, sou a Ana, sua filha.”"
      ],
      [
        "Para você",
        "Dói, e é normal sentir luto com a pessoa ainda viva. Ela pode não lembrar quem você é, mas sente que você faz bem."
      ]
    ]
  }
],
  demoFonte: "Trecho da Parte 3 do Mapa do Cuidador. Orientações de convivência; não substituem o médico.",
  calc: { campos: [{"id":"rem","rotulo":"Gasto mensal com os remédios do Alzheimer","ajuda":"Donepezila, galantamina, rivastigmina ou memantina","tipo":"reais","min":0,"max":800,"passo":10,"valor":220},{"id":"ir","rotulo":"Imposto de Renda descontado por mês na aposentadoria","ajuda":"Aparece no extrato de pagamento do INSS. Se for zero, deixe em zero.","tipo":"reais","min":0,"max":1500,"passo":10,"valor":250},{"id":"anos","rotulo":"Há quanto tempo existe o diagnóstico","ajuda":"Conta para recuperar o IR já descontado","tipo":"anos","min":0,"max":5,"passo":1,"valor":2}], conta: function (v, preco) {
      const br = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");
      const rem = v.rem * 12, ir = v.ir * 12, atras = v.ir * 12 * v.anos, total = rem + ir + atras;
      const vezes = Math.floor(total / preco);
      return {
        grande: total,
        linhas: [["Remédios pelo SUS, por ano", br(rem)], ["Isenção de IR, por ano", br(ir)], ["IR de anos anteriores que pode voltar", br(atras)]],
        paga: total > preco ? `O Mapa custa <b>R$ ${preco}</b>, uma vez só: <b>${vezes.toLocaleString("pt-BR")} vezes menos</b> do que está em jogo.` : `Mesmo sem esses valores, o Mapa custa <b>R$ ${preco}</b>, uma vez só, e organiza todo o resto do cuidado.`,
      };
    } },
};
