/* Gerado por montar.js a partir de conteudo.js: não edite aqui. */
const DADOS = {
  demo: [
  {
    "aba": "Minha dívida tem mais de 5 anos",
    "etq": "Passo 3",
    "titulo": "A dívida tem mais de 5 anos",
    "blocos": [
      [
        "O que diz a regra",
        "Pelo Código de Defesa do Consumidor (art. 43), o nome não pode ficar negativado por mais de 5 anos pela mesma dívida. Muitas dívidas de consumo também prescrevem em 5 anos para cobrança na Justiça."
      ],
      [
        "O que fazer",
        "Confira a data de vencimento. Se passou de 5 anos e o nome segue sujo, peça a exclusão ao birô. Antes de fechar acordo de dívida antiga, veja se ele recomeça prazos."
      ],
      [
        "Roteiro pronto",
        "“Essa dívida venceu em [data], há mais de 5 anos. Peço a exclusão do registro, conforme o art. 43 do CDC.”"
      ]
    ]
  },
  {
    "aba": "O cartão virou uma bola de neve",
    "etq": "Passo 4",
    "titulo": "Juros do cartão sem fim",
    "blocos": [
      [
        "O que diz a regra",
        "Desde 2024, pela Lei 14.690/2023, juros e encargos do rotativo e do parcelamento da fatura não podem passar de 100% do valor original da dívida."
      ],
      [
        "O que fazer",
        "Descubra quanto era a dívida no começo e quanto está hoje. Se os encargos passaram do dobro, peça revisão ao banco e reclame no Banco Central."
      ],
      [
        "Roteiro pronto",
        "“Essa dívida do cartão começou em R$ [valor]. Pela Lei 14.690/2023, juros e encargos não podem passar de 100% do valor original. Peço a revisão do saldo.”"
      ]
    ]
  },
  {
    "aba": "Me ligaram oferecendo um acordo",
    "etq": "Passo 4",
    "titulo": "Acordo ou golpe?",
    "blocos": [
      [
        "Sinais de golpe",
        "Pedem pagamento antecipado para “liberar” acordo; boleto em nome de pessoa física ou de outra empresa; prometem “limpar o nome em 24 horas”; pressionam com prazo de minutos."
      ],
      [
        "O que fazer",
        "Não pague nada nesse contato. Desligue e procure você mesmo o credor pelo app ou site oficial, ou pelo Serasa Limpa Nome. Confira o CNPJ antes de pagar."
      ],
      [
        "Roteiro pronto",
        "“Antes de pagar, me envie a proposta por escrito no e-mail, com o valor, as parcelas e o CNPJ de quem recebe.”"
      ]
    ]
  },
  {
    "aba": "Paguei e o nome não saiu",
    "etq": "Passo 7",
    "titulo": "Paguei e continuo negativado",
    "blocos": [
      [
        "O que diz a regra",
        "Pela Súmula 548 do STJ, o credor deve pedir a retirada do nome em até 5 dias úteis depois do pagamento integral."
      ],
      [
        "O que fazer",
        "Guarde o comprovante. Passou o prazo, peça a baixa ao credor por escrito. Sem solução: Consumidor.gov.br ou Procon."
      ],
      [
        "Roteiro pronto",
        "“Paguei em [data], comprovante anexo. Já passou o prazo de 5 dias úteis e meu nome segue negativado. Peço a baixa imediata.”"
      ]
    ]
  },
  {
    "aba": "Devo em vários lugares. Por onde começo?",
    "etq": "Passo 6",
    "titulo": "A ordem certa de pagar",
    "blocos": [
      [
        "A ordem",
        "1. Contas essenciais em dia. 2. Dívidas com bem em garantia. 3. Juros mais altos (cartão, cheque especial). 4. As que travam sua vida. 5. Antigas e paradas, que costumam ter mais desconto."
      ],
      [
        "O erro comum",
        "Pagar um pouco de cada. Os juros das maiores comem o que você paga nas menores."
      ],
      [
        "No plano",
        "Ficha 1 (lista mestra) e Ficha 3 (o caminho até o nome limpo), para imprimir."
      ]
    ]
  }
],
  demoFonte: "Trecho do Saída do Vermelho. Conteúdo educativo; não é oferta de crédito nem consultoria jurídica.",
  calc: { campos: [{"id":"total","rotulo":"Quanto você deve hoje","tipo":"reais","min":500,"max":50000,"passo":500,"valor":6000},{"id":"juros","rotulo":"Juros ao mês","ajuda":"Cheque especial e cartão costumam passar de 7% ao mês","tipo":"pct","min":1,"max":15,"passo":1,"valor":7},{"id":"meses","rotulo":"Meses sem um plano","tipo":"meses","min":1,"max":24,"passo":1,"valor":6}], conta: function (v, preco) {
      const br = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");
      const futuro = v.total * Math.pow(1 + v.juros / 100, v.meses), cresce = futuro - v.total, mes = v.total * v.juros / 100;
      return {
        grande: cresce,
        linhas: [["Juros só no primeiro mês", br(mes)], [`Em ${v.meses} ${v.meses == 1 ? "mês" : "meses"}, a dívida vira`, br(futuro)], ["Cada dia de espera custa cerca de", br(mes / 30)]],
        paga: `O plano custa <b>R$ ${preco}</b>, uma vez só: <b>menos que ${Math.max(1, Math.ceil(preco / (mes / 30)))} ${Math.ceil(preco / (mes / 30)) <= 1 ? "dia" : "dias"}</b> de juros da sua dívida.`,
      };
    } },
};
