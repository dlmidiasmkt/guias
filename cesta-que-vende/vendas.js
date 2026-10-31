/* Páginas de vendas dos infoprodutos: checkout Kiwify (+ UTMs), pixel do Meta, demonstração, calculadora,
   páginas ampliadas, entrada ao rolar e barra fixa no celular.
   Preço, checkout e pixel vêm de config.js (CONFIG); demonstração e calculadora vêm de DADOS (gerado por montar.js). */

// ---------- pixel do Meta: PageView aqui; ViewContent ao ver a oferta; InitiateCheckout no clique
if (CONFIG.pixel) {
  !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", CONFIG.pixel); fbq("track", "PageView");
}
const evento = (nome, dados) => { try { if (window.fbq) fbq("track", nome, dados); } catch (e) {} };

// ---------- UTMs do anúncio: guardados e repassados ao checkout da Kiwify
const CHAVES_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "src", "sck"];
function utms() {
  const daUrl = new URLSearchParams(location.search);
  let salvos = {};
  try { salvos = JSON.parse(localStorage.getItem("utm_" + CONFIG.id) || "{}"); } catch (e) {}
  const atuais = {};
  CHAVES_UTM.forEach((k) => { if (daUrl.get(k)) atuais[k] = daUrl.get(k); });
  if (Object.keys(atuais).length) { salvos = atuais; try { localStorage.setItem("utm_" + CONFIG.id, JSON.stringify(salvos)); } catch (e) {} }
  return salvos;
}
function linkCheckout() {
  if (!CONFIG.checkout) return "#oferta";
  const url = new URL(CONFIG.checkout);
  Object.entries(utms()).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}
const brl = (n) => "R$ " + (Number.isInteger(n) ? n : n.toFixed(2).replace(".", ","));
utms();
document.querySelectorAll("[data-checkout]").forEach((b) => {
  b.href = linkCheckout();
  b.addEventListener("click", () => evento("InitiateCheckout", { value: CONFIG.preco, currency: "BRL", content_name: CONFIG.nome }));
});
document.querySelectorAll("[data-preco]").forEach((el) => { el.textContent = brl(CONFIG.preco); });
document.querySelectorAll("[data-preco-num]").forEach((el) => { el.textContent = brl(CONFIG.preco).slice(3); });

const semMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- demonstração: a pessoa escolhe uma situação e vê o trecho do guia
const abas = document.getElementById("abas");
const painel = document.getElementById("painel");
if (abas && painel) {
  const mostrar = (i) => {
    const s = DADOS.demo[i];
    abas.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-selected", String(k === i)));
    painel.innerHTML = `<span class="etq">${s.etq}</span><h3>${s.titulo}</h3><dl>${s.blocos.map(([t, d]) => `<dt>${t}</dt><dd>${d}</dd>`).join("")}</dl><p class="fonte">${DADOS.demoFonte}</p>`;
    if (!semMovimento) { painel.classList.remove("troca"); void painel.offsetWidth; painel.classList.add("troca"); }
  };
  DADOS.demo.forEach((s, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "tab"); b.textContent = s.aba;
    b.addEventListener("click", () => { mostrar(i); if (matchMedia("(max-width: 960px)").matches) painel.scrollIntoView({ behavior: semMovimento ? "auto" : "smooth", block: "nearest" }); });
    abas.appendChild(b);
  });
  mostrar(0);
}

// ---------- calculadora: campos e conta vêm de DADOS.calc
const calc = document.getElementById("calc-campos");
if (calc) {
  const br = (n, c = 0) => Number(n).toLocaleString("pt-BR", { minimumFractionDigits: c, maximumFractionDigits: c });
  const fmt = { reais: (v) => "R$ " + br(v), num: (v) => br(v), pct: (v) => br(v) + "%", anos: (v) => v + (v == 1 ? " ano" : " anos"), meses: (v) => v + (v == 1 ? " mês" : " meses"), horas: (v) => v + " h" };
  const entradas = DADOS.calc.campos.map((c) => {
    const l = document.createElement("label"); l.className = "campo";
    l.innerHTML = `<span>${c.rotulo} <output></output></span>${c.ajuda ? `<small>${c.ajuda}</small>` : ""}<input type="range" min="${c.min}" max="${c.max}" step="${c.passo}" value="${c.valor}">`;
    calc.appendChild(l);
    return { c, input: l.querySelector("input"), out: l.querySelector("output") };
  });
  const atualizar = () => {
    const v = {};
    entradas.forEach(({ c, input, out }) => { v[c.id] = Number(input.value); out.textContent = fmt[c.tipo](input.value); });
    const r = DADOS.calc.conta(v, CONFIG.preco);
    document.getElementById("calc-grande").textContent = "R$ " + br(r.grande);
    document.getElementById("calc-linhas").innerHTML = r.linhas.map(([t, n]) => `<div class="linha"><span>${t}</span><b>${n}</b></div>`).join("");
    document.getElementById("calc-paga").innerHTML = r.paga;
  };
  entradas.forEach(({ input }) => input.addEventListener("input", atualizar));
  atualizar();
}

// ---------- páginas do guia ampliadas
const modal = document.getElementById("modal");
document.querySelectorAll("[data-amplia]").forEach((b) => b.addEventListener("click", () => {
  const img = modal.querySelector("img");
  img.src = b.dataset.amplia; img.alt = b.querySelector("img").alt;
  modal.classList.add("aberto"); modal.querySelector("button").focus();
}));
const fechar = () => modal.classList.remove("aberto");
modal.querySelector("button").addEventListener("click", fechar);
modal.addEventListener("click", (e) => { if (e.target === modal) fechar(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") fechar(); });

// ---------- entrada ao rolar (o CSS só esconde .rv quando a animação é permitida)
const revelar = new IntersectionObserver((itens) => itens.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add("ver"); revelar.unobserve(e.target);
}), { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".rv").forEach((el, i) => { el.style.transitionDelay = (i % 3) * 80 + "ms"; revelar.observe(el); });

// ---------- barra fixa: aparece depois do herói e some quando a oferta está na tela; ViewContent ao ver a oferta
const barra = document.getElementById("barra");
let passouHeroi = false, vendoOferta = false, viuOferta = false;
function atualizarBarra() {
  const ver = passouHeroi && !vendoOferta;
  barra.classList.toggle("ver", ver); barra.setAttribute("aria-hidden", String(!ver));
  barra.querySelector("a").tabIndex = ver ? 0 : -1;
}
new IntersectionObserver(([e]) => { passouHeroi = !e.isIntersecting; atualizarBarra(); }).observe(document.querySelector(".heroi"));
new IntersectionObserver(([e]) => {
  vendoOferta = e.isIntersecting; atualizarBarra();
  if (e.isIntersecting && !viuOferta) { viuOferta = true; evento("ViewContent", { content_name: CONFIG.nome, value: CONFIG.preco, currency: "BRL" }); }
}).observe(document.getElementById("oferta"));
