/* protecao.js — proteção anti-cópia das páginas (gestor de tráfego).
   Carregado em todas as páginas geradas pelo montar.js. NÃO é promessa de blindagem:
   é FRICÇÃO contra cópia casual + trava que faz o clone parar de funcionar fora do seu domínio.
   O que realmente protege está no README PROTECAO.md (robots/noai, Kiwify, domínio, pixel).

   Config opcional antes deste script:
   window.PROTECAO = {
     dominios: ['dlmidiasmkt.github.io'],   // de onde a página PODE rodar (além de localhost/arquivo)
     redirecionar: '',                      // URL real: se clonada em outro host, manda o visitante pra cá
     antiInspeta: true,                     // bloqueia menu direito, F12, Ctrl+U/S/P, Ctrl+Shift+I/J/C, arrastar imagem
     antiSelecao: true,                     // impede seleção de texto (inputs continuam liberados)
     devtools: false,                       // tenta detectar devtools aberto (impreciso; desligado por padrão)
   };
*/
(function () {
  'use strict';
  var C = Object.assign({
    dominios: ['dlmidiasmkt.github.io'],
    redirecionar: '',
    antiInspeta: true,
    antiSelecao: true,
    devtools: false,
  }, window.PROTECAO || {});

  var host = (location.hostname || '').toLowerCase();
  var DEV = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '::1' || host === '' || location.protocol === 'file:';
  var liberado = DEV || C.dominios.some(function (d) { return host === String(d).toLowerCase(); });

  // ---------- 1) TRAVA DE DOMÍNIO: se a página foi copiada para outro host, o clone não funciona ----------
  function travar() {
    // desliga todos os botões de compra (o clone não leva ninguém ao checkout)
    [].forEach.call(document.querySelectorAll('[data-checkout], a[href*="pay.kiwify"], a[href*="kiwify.com"]'), function (b) {
      b.removeAttribute('href'); b.setAttribute('aria-disabled', 'true');
      b.style.pointerEvents = 'none'; b.style.filter = 'grayscale(1)'; b.style.opacity = '.5';
    });
    if (C.redirecionar) { try { location.replace(C.redirecionar); return; } catch (e) {} }
    var v = document.createElement('div');
    v.setAttribute('role', 'alert');
    v.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#17161b;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px;font:600 18px/1.5 system-ui,sans-serif;gap:14px';
    v.innerHTML = '<div style="font-size:40px">🔒</div><div style="font-size:22px;font-weight:800">Conteúdo protegido</div><div style="max-width:30em;opacity:.85">Esta página é uma cópia não autorizada. O original está no site oficial.</div>';
    (document.body || document.documentElement).appendChild(v);
  }
  if (!liberado) {
    if (document.body) travar(); else document.addEventListener('DOMContentLoaded', travar);
    return; // não precisa do resto quando já é clone travado
  }

  // ---------- 2) ANTI-SELEÇÃO (inputs seguem liberados) ----------
  if (C.antiSelecao) {
    var st = document.createElement('style');
    st.textContent = 'body{-webkit-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none}' +
      'input,textarea,select,[contenteditable]{-webkit-user-select:text;user-select:text}' +
      'img{-webkit-user-drag:none;user-drag:none;-webkit-touch-callout:none}';
    (document.head || document.documentElement).appendChild(st);
  }

  // ---------- 3) ANTI-INSPEÇÃO (atrito contra cópia casual; não para máquina/headless) ----------
  if (C.antiInspeta) {
    var stop = function (e) { e.preventDefault(); e.stopPropagation(); return false; };
    document.addEventListener('contextmenu', stop, { capture: true });
    document.addEventListener('dragstart', function (e) { if (e.target && e.target.tagName === 'IMG') return stop(e); }, { capture: true });
    document.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase(), ctrl = e.ctrlKey || e.metaKey;
      if (e.key === 'F12') return stop(e);
      if (ctrl && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) return stop(e); // DevTools
      if (ctrl && (k === 'u' || k === 's' || k === 'p')) return stop(e);               // ver-fonte / salvar / imprimir
    }, { capture: true });
  }

  // ---------- 4) DETECÇÃO DE DEVTOOLS (opcional, impreciso) ----------
  if (C.devtools) {
    var fechado = true;
    setInterval(function () {
      var aberto = (window.outerWidth - window.innerWidth > 160) || (window.outerHeight - window.innerHeight > 160);
      if (aberto && fechado) { fechado = false; document.documentElement.style.filter = 'blur(10px)'; }
      else if (!aberto && !fechado) { fechado = true; document.documentElement.style.filter = ''; }
    }, 1000);
  }
})();
