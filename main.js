

// Cargar productos desde productos-data.js
const galeria = document.getElementById("galeria-productos");
const filtroCategoria = document.getElementById("filtroCategoria");
const ordenarPor = document.getElementById("ordenarPor");

// Detectar si hay un id en la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");


if (id && productos[id]) {
  // Modo detalle
  const p = productos[id];
  galeria.innerHTML = `
    <div class="detalle-card">
      <div class="image-wrapper">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="card-body">
        <h2>${p.name}</h2>
        <p class="price">
          <strong>${p.price} Gs</strong>
          ${p.oldPrice ? `<span class="old-price">${p.oldPrice} Gs</span>` : ""}
        </p>
        <p class="description">${p.description || "Cuadro disponible para decorar tu espacio."}</p>
        <p><strong>Tamaño:</strong> ${p.size || "Estándar"}</p>
        <p><strong>Stock disponible:</strong> ${p.stock ?? "Consultar"}</p>
        <p><strong>Categoría:</strong> ${p.category.toUpperCase()}</p>
        <a href="https://wa.me/595992957450?text=${encodeURIComponent(`Hola! Quiero este cuadro: ${p.name}`)}" class="btn-whatsapp" target="_blank">
          <img src="img/whatsapp-black.svg" width="18"> Pedir
        </a>
        <a href="productos.html" class="btn-volver">← Volver al catálogo</a>
      </div>
    </div>
  `;

  document.querySelector(".filtros-container")?.classList.add("hidden");
  document.querySelector(".section-title").textContent = "Detalle del Producto";

} else {
  // Modo catálogo
  function renderProductos(filtro = "todos", orden = "relevancia") {
    galeria.innerHTML = "";

    let lista = Object.entries(productos);

    if (filtro !== "todos") {
      lista = lista.filter(([_, p]) => p.category === filtro);
    }

    if (orden === "precio-asc") {
      lista.sort((a, b) => a[1].price - b[1].price);
    } else if (orden === "precio-desc") {
      lista.sort((a, b) => b[1].price - a[1].price);
    } else if (orden === "nombre-az") {
      lista.sort((a, b) => a[1].name.localeCompare(b[1].name));
    } else if (orden === "nombre-za") {
      lista.sort((a, b) => b[1].name.localeCompare(a[1].name));
    }

    lista.forEach(([id, p]) => {
      galeria.innerHTML += `
        <div class="card">
          <div class="image-wrapper">
            <img src="${p.image}" alt="${p.name}">
          </div>
          <div class="card-body">
            <h3>${p.name}</h3>
            <p class="price">
              <strong>${p.price} Gs</strong>
              ${p.oldPrice ? `<span class="old-price">${p.oldPrice} Gs</span>` : ""}
            </p>
            <div class="card-buttons">
              <a href="productos.html?id=${id}" class="btn-ver">
                <span class="material-icons" style="font-size: 1rem;">visibility</span> Ver
              </a>
              <a href="https://wa.me/595992957450?text=${encodeURIComponent(`Hola! Quiero este cuadro: ${p.name}`)}" class="btn-whatsapp" target="_blank">
                <img src="img/whatsapp-black.svg" alt="WhatsApp" width="18" height="18">
                <span class="btn-text">Pedir</span>
              </a>
            </div>
          </div>
        </div>
      `;
    });
  }
  if (id && productos[id]) {
  // Ocultar filtros
  document.querySelector(".filtros-container")?.classList.add("hidden");
  document.querySelector(".section-title").textContent = "Detalle del Producto";
}


  filtroCategoria?.addEventListener("change", () => {
    renderProductos(filtroCategoria.value, ordenarPor.value);
  });

  ordenarPor?.addEventListener("change", () => {
    renderProductos(filtroCategoria.value, ordenarPor.value);
  });

  renderProductos();
}


// Botones menú y búsqueda
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");
const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
  searchInput.focus();
});

// Buscador activo
searchInput.addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(filter) ? "" : "none";
  });
}); 