/* Gerado por montar.js a partir de conteudo.js: não edite aqui. */
const DADOS = {
  demo: [
  {
    "aba": "Café da manhã",
    "etq": "Modelo 01",
    "titulo": "Café Clássico",
    "blocos": [
      [
        "Itens",
        "Pães e croissants, frios, suco, iogurte, geleia, frutas, bolo caseiro, biscoitos e uma caneca."
      ],
      [
        "Custo e preço",
        "Custo de referência ~R$ 91 (itens + embalagem). Vende entre R$ 150 e R$ 180."
      ],
      [
        "Segredo",
        "Monte na noite anterior o que não estraga e finalize de manhã o que é fresco. Entrega entre 7h e 9h."
      ]
    ]
  },
  {
    "aba": "Dia das Mães",
    "etq": "Modelo 07",
    "titulo": "Mãe Querida",
    "blocos": [
      [
        "Itens",
        "Café da manhã + hidratante, sabonete artesanal, vela aromática, flores e cartão escrito à mão."
      ],
      [
        "Custo e preço",
        "Custo de referência ~R$ 118. Vende entre R$ 190 e R$ 220."
      ],
      [
        "Quando divulgar",
        "A partir de meados de abril. É a maior data do ano para cestas: feche a agenda num limite de pedidos."
      ]
    ]
  },
  {
    "aba": "Natal para empresas",
    "etq": "Modelo 18",
    "titulo": "Corporativa Padrão",
    "blocos": [
      [
        "Itens",
        "Caixa de MDF com o logo da empresa no cartão, panetone, suco de uva, biscoitos, castanhas e chocolate."
      ],
      [
        "Custo e preço",
        "Custo ~R$ 70. Vende entre R$ 105 e R$ 125 por unidade, em pedidos de várias cestas."
      ],
      [
        "Como oferecer",
        "Leve uma cesta pequena de amostra na recepção com a proposta pronta (mensagem 9 do guia). Empresas fecham entre outubro e dezembro."
      ]
    ]
  },
  {
    "aba": "Maternidade",
    "etq": "Modelo 21",
    "titulo": "Bem-vindo, Bebê",
    "blocos": [
      [
        "Itens",
        "Fraldas, body, pomada, toalha de boca, sabonete neutro e um chocolate para a mãe."
      ],
      [
        "Custo e preço",
        "Custo ~R$ 105. Vende entre R$ 170 e R$ 195."
      ],
      [
        "Parceria",
        "Lojas de bebê, fotógrafas de newborn e doulas indicam o ano todo. Combine uma comissão."
      ]
    ]
  },
  {
    "aba": "“Achei caro”",
    "etq": "Mensagem 10",
    "titulo": "Quando acham caro",
    "blocos": [
      [
        "O que responder",
        "“Entendo! A Clássica já vem com [itens], montada, embalada e entregue com cartão escrito à mão. Se quiser algo mais em conta, a Mimo sai por R$ __ e fica linda também. Quer ver a foto?”"
      ],
      [
        "Por que funciona",
        "Mostra o valor sem baixar o preço e oferece um tamanho menor em vez de desconto."
      ],
      [
        "No guia",
        "São 10 mensagens: do primeiro contato à proposta para empresas."
      ]
    ]
  }
],
  demoFonte: "Trecho do Cesta que Vende. Custos de referência de out/2026; variam por cidade e fornecedor.",
  calc: { campos: [{"id":"preco","rotulo":"Preço de venda da cesta","tipo":"reais","min":50,"max":400,"passo":10,"valor":160},{"id":"custo","rotulo":"Custo (itens + embalagem)","ajuda":"No guia, a cesta de café da manhã sai por cerca de R$ 91","tipo":"reais","min":20,"max":300,"passo":5,"valor":95},{"id":"semana","rotulo":"Cestas por semana","tipo":"num","min":1,"max":30,"passo":1,"valor":3}], conta: function (v, preco) {
      const br = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");
      const porCesta = Math.max(0, v.preco - v.custo), mes = porCesta * v.semana * 4.3;
      return {
        grande: mes,
        linhas: [["Sobra em cada cesta", br(porCesta)], [`${v.semana} ${v.semana == 1 ? "cesta" : "cestas"} por semana, no mês`, Math.round(v.semana * 4.3) + " cestas"], ["Margem sobre o preço", Math.round(porCesta / v.preco * 100) + "%"]],
        paga: porCesta > 0 ? `O guia custa <b>R$ ${String(preco).replace(".", ",")}0</b>, uma vez só: <b>menos do que sobra de ${porCesta >= preco ? "uma única cesta" : "duas cestas"}.</b>` : "Com esse custo, a cesta dá prejuízo. A Parte 3 do guia mostra como chegar ao preço certo.",
      };
    } },
};
