// =====================================================================
// CATÁLOGO DE MUESTRAS
// Para agregar una vela: copia una línea de ejemplo, quítale las // del
// inicio y cambia la foto. "nombre" y "detalle" son opcionales.
// Mientras la lista esté vacía, la sección no aparece en la página.
// =====================================================================

const CATALOGO = [
  // { foto: "assets/catalogo/navidad-1.jpg", grupo: "navidad", nombre: "Pino nevado", detalle: "Aroma canela" },
  // { foto: "assets/catalogo/boda-1.jpg", grupo: "boda" },
];

// Grupos disponibles. Solo se muestran los que tengan al menos una foto.
// Puedes agregar más siguiendo el mismo formato.
const GRUPOS = {
  temporadas: {
    titulo: "Temporadas",
    grupos: {
      "san-valentin": "San Valentín",
      "dia-de-las-madres": "Día de las Madres",
      halloween: "Halloween",
      "dia-de-muertos": "Día de Muertos",
      navidad: "Navidad",
    },
  },
  momentos: {
    titulo: "Momentos de vida",
    grupos: {
      cumpleanos: "Cumpleaños",
      bautizo: "Bautizo",
      "primera-comunion": "Primera Comunión",
      "xv-anos": "XV años",
      boda: "Boda",
      "baby-shower": "Baby shower",
      graduacion: "Graduación",
    },
  },
};

// ---------------------------------------------------------------------
// A partir de aquí no hace falta editar nada.
// ---------------------------------------------------------------------

(function renderCatalogo() {
  const section = document.getElementById("catalogo");
  if (!section) return;

  const tipoDe = {};
  const nombreDe = {};
  Object.entries(GRUPOS).forEach(([tipo, { grupos }]) => {
    Object.entries(grupos).forEach(([clave, nombre]) => {
      tipoDe[clave] = tipo;
      nombreDe[clave] = nombre;
    });
  });

  const items = CATALOGO.filter((item) => {
    if (!item.foto) return false;
    if (!tipoDe[item.grupo]) {
      console.warn(`Every Occasion: el grupo "${item.grupo}" no existe en GRUPOS (catalogo.js).`);
      return false;
    }
    return true;
  });

  if (items.length === 0) return;

  section.hidden = false;
  document.querySelectorAll("[data-requires-catalogo]").forEach((el) => (el.hidden = false));

  const tabsEl = section.querySelector(".catalog-tabs");
  const chipsEl = section.querySelector(".catalog-chips");
  const gridEl = section.querySelector(".catalog-grid");

  const tiposConFotos = Object.keys(GRUPOS).filter((tipo) =>
    items.some((item) => tipoDe[item.grupo] === tipo)
  );

  let tipoActual = tiposConFotos[0];
  let grupoActual = "todas";

  function boton(texto, activo, onClick) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = texto;
    b.setAttribute("aria-pressed", String(activo));
    b.addEventListener("click", onClick);
    return b;
  }

  function pintarTabs() {
    tabsEl.replaceChildren();
    tabsEl.hidden = tiposConFotos.length < 2;
    tiposConFotos.forEach((tipo) => {
      tabsEl.append(
        boton(GRUPOS[tipo].titulo, tipo === tipoActual, () => {
          tipoActual = tipo;
          grupoActual = "todas";
          pintar();
        })
      );
    });
  }

  function pintarChips() {
    chipsEl.replaceChildren();
    const grupos = Object.keys(GRUPOS[tipoActual].grupos).filter((clave) =>
      items.some((item) => item.grupo === clave)
    );
    chipsEl.hidden = grupos.length < 2;
    chipsEl.append(boton("Todas", grupoActual === "todas", () => elegirGrupo("todas")));
    grupos.forEach((clave) => {
      chipsEl.append(boton(nombreDe[clave], grupoActual === clave, () => elegirGrupo(clave)));
    });
  }

  function elegirGrupo(clave) {
    grupoActual = clave;
    pintar();
  }

  function pintarGrid() {
    gridEl.replaceChildren();
    items
      .filter((item) => tipoDe[item.grupo] === tipoActual)
      .filter((item) => grupoActual === "todas" || item.grupo === grupoActual)
      .forEach((item) => {
        const grupo = nombreDe[item.grupo];
        const titulo = item.nombre || `Vela para ${grupo}`;

        const card = document.createElement("li");
        card.className = "catalog-card";

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = item.foto;
        img.alt = item.nombre ? `${item.nombre}, vela para ${grupo}` : `Vela artesanal para ${grupo}`;
        img.loading = "lazy";
        img.decoding = "async";
        figure.append(img);

        const body = document.createElement("div");
        body.className = "catalog-card-body";

        const tag = document.createElement("p");
        tag.className = "catalog-tag";
        tag.textContent = grupo;

        const h3 = document.createElement("h3");
        h3.textContent = titulo;
        body.append(tag, h3);

        if (item.detalle) {
          const p = document.createElement("p");
          p.className = "catalog-detail";
          p.textContent = item.detalle;
          body.append(p);
        }

        const link = document.createElement("a");
        link.className = "card-link";
        link.href = "https://www.instagram.com/everyoccasiion";
        link.target = "_blank";
        link.rel = "noreferrer";
        link.dataset.waText = `Hola, me interesa una vela como la del catálogo: ${titulo} (${grupo})`;
        link.innerHTML = 'Pedir una como esta <svg class="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg>';
        body.append(link);

        card.append(figure, body);
        gridEl.append(card);
      });

    // Si ya hay número de WhatsApp, script.js expone la función para enlazar los botones nuevos.
    if (window.applyWhatsAppLinks) window.applyWhatsAppLinks(gridEl);
  }

  function pintar() {
    pintarTabs();
    pintarChips();
    pintarGrid();
  }

  pintar();
})();
