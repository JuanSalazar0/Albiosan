/* =========================================================
   ALBIOSAN · interacciones de la landing
   Sin dependencias. Todo degrada con gracia.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header elevado al hacer scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.setAttribute("data-elevated", window.scrollY > 12 ? "true" : "false");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav && header) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      header.setAttribute("data-open", String(!open));
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        header.setAttribute("data-open", "false");
        mobileNav.hidden = true;
      });
    });
  }

  /* ---------- Reveal al entrar en viewport ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contadores animados ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
    var dur = 1400, start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      var val = (target * eased).toFixed(decimals);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(frame);
  }
  var counters = document.querySelectorAll(".stat-num[data-count]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Ripple de agua en botones ---------- */
  if (!reduceMotion) {
    document.querySelectorAll(".btn-ripple").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var r = btn.getBoundingClientRect();
        var dot = document.createElement("span");
        dot.className = "ripple-dot";
        var size = Math.max(r.width, r.height);
        dot.style.width = dot.style.height = size + "px";
        dot.style.left = (e.clientX - r.left) + "px";
        dot.style.top = (e.clientY - r.top) + "px";
        btn.appendChild(dot);
        setTimeout(function () { dot.remove(); }, 650);
      });
    });
  }

  /* ---------- Formulario → WhatsApp ---------- */
  /* REEMPLAZAR: número de WhatsApp real (formato internacional sin +) */
  var WHATSAPP = "52XXXXXXXXXX";
  var form = document.getElementById("cotiza-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = (form.nombre.value || "").trim();
      var tipo = form.tipo.value || "";
      var tel = (form.telefono.value || "").trim();
      var msg = (form.mensaje.value || "").trim();

      if (!nombre) { form.nombre.focus(); form.nombre.reportValidity && form.nombre.reportValidity(); return; }

      var texto =
        "Hola Albiosan, quiero una cotización.\n" +
        "• Nombre: " + nombre + "\n" +
        "• Tipo de uso: " + tipo + "\n" +
        (tel ? "• Teléfono: " + tel + "\n" : "") +
        (msg ? "• Detalle: " + msg : "");

      var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Año dinámico en footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
