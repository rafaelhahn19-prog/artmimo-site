// Cor de destaque do tema (mantida em um único lugar)
const GOLD = "#d4af37";

const WHATSAPP_PHONE = "5554999699979";

function buildWhatsAppUrl(text) {
  const msg = String(text || "").trim();
  const qs = msg ? `?text=${encodeURIComponent(msg)}` : "";
  return `https://wa.me/${WHATSAPP_PHONE}${qs}`;
}

// Estrutura de categorias (futuro: pode vir de CMS/Supabase)
const CATEGORIES = [
  { id: "futebol", label: "Futebol" },
  { id: "futsal", label: "Futsal" },
  { id: "volei", label: "Vôlei" },
  { id: "rodeio", label: "Rodeio" },
  { id: "medalhas", label: "Medalhas" },
  { id: "outros", label: "Outros esportes" },
];

const IMG = {
  trophyA:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80",
  trophyB:
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1400&q=80",
  medalA:
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1400&q=80",
  medalB:
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1400&q=80",
  arena:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=80",
  crowd:
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1400&q=80",
};

// Catálogo estático (futuro: trocar por fetch + render)
const CATALOG = {
  futebol: [
    { title: "Kit Premium", tag: "Campeonato", img: IMG.trophyB },
    { title: "Kit Tradicional", tag: "Torneio", img: IMG.trophyA },
    { title: "Taças", tag: "Troféus", img: IMG.trophyB },
    { title: "Troféu Goleiro", tag: "Individual", img: IMG.crowd },
    { title: "Jogador Destaque", tag: "Individual", img: IMG.trophyA },
    { title: "Troféu Goleador", tag: "Individual", img: IMG.trophyB },
    { title: "Troféu Técnico", tag: "Comissão", img: IMG.arena },
    { title: "Outros", tag: "Diversos", img: IMG.medalB },
    { title: "Linha JEBS", tag: "Escolar", img: IMG.medalA },
  ],
  futsal: [
    { title: "Taça Campeão (Futsal)", tag: "Kits e Taças", img: IMG.trophyB },
    { title: "Troféu Goleador", tag: "Troféus Individuais", img: IMG.crowd },
    { title: "Troféu Técnico Destaque", tag: "Troféus Individuais", img: IMG.trophyB },
    { title: "Medalha Ouro", tag: "Final", img: IMG.medalB },
    { title: "Medalha Prata", tag: "2º lugar", img: IMG.medalA },
  ],
  volei: [
    { title: "Taça Campeão (Vôlei)", tag: "Kits e Taças", img: IMG.trophyB },
    { title: "Kit Premiação Vôlei (Taças + Medalhas)", tag: "Kits e Taças", img: IMG.trophyA },
    { title: "Troféu Melhor Levantador", tag: "Troféus Individuais", img: IMG.crowd },
    { title: "Troféu Melhor Ataque", tag: "Troféus Individuais", img: IMG.trophyA },
    { title: "Troféu Melhor Bloqueio", tag: "Troféus Individuais", img: IMG.trophyB },
    { title: "Placa Comemorativa", tag: "Troféus Individuais", img: IMG.arena },
  ],
  rodeio: [
    { title: "Taças de Rodeio", tag: "Campeões", img: IMG.trophyB },
    { title: "Troféus por Modalidade", tag: "Competição", img: IMG.trophyA },
    { title: "Troféus de Homenagem", tag: "Reconhecimento", img: IMG.arena },
  ],
  medalhas: [
    { title: "Medalhas de Metal (Zamak)", tag: "Metal", img: IMG.medalB },
    { title: "Medalhas em MDF", tag: "Personalizado", img: IMG.medalA },
    { title: "Medalhas em Acrílico", tag: "Premium", img: IMG.medalB },
    { title: "Medalhas Sublimadas", tag: "Coloridas", img: IMG.crowd },
  ],
  outros: [
    { title: "Troféu Multi-Esportes", tag: "Versátil", img: IMG.trophyB },
    { title: "Troféu Corporativo", tag: "Eventos e empresas", img: IMG.trophyA },
    { title: "Placa de Homenagem", tag: "Reconhecimento", img: IMG.arena },
    { title: "Medalha Personalizada", tag: "Identidade do evento", img: IMG.medalB },
    { title: "Troféu Destaque", tag: "MVP / Melhor da noite", img: IMG.crowd },
    { title: "Kit Pódio Completo", tag: "Ouro/Prata/Bronze", img: IMG.medalA },
  ],
};

const $tabs = document.getElementById("catalog-tabs");
const $products = document.getElementById("products");
const $activeCategory = document.getElementById("active-category");

function createTab(category) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "tab";
  btn.dataset.tab = category.id;
  btn.setAttribute("role", "tab");
  btn.setAttribute("aria-selected", "false");
  btn.textContent = category.label;
  return btn;
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "card";

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = item.img;
  img.alt = item.title;

  const body = document.createElement("div");
  body.className = "card-body";

  const tag = document.createElement("div");
  tag.className = "card-tag";
  tag.textContent = item.tag;

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = item.title;

  const action = document.createElement("a");
  action.className = "card-action";
  action.href = buildWhatsAppUrl(
    [
      "Olá, Art Mimo! Quero um orçamento:",
      `Item: ${item.title}`,
      `Categoria: ${item.tag}`,
    ].join("\n")
  );
  action.target = "_blank";
  action.rel = "noopener";
  action.textContent = "Solicitar no WhatsApp";

  body.append(tag, title, action);
  card.append(img, body);
  return card;
}

function setActiveCategory(id) {
  const category = CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

  $tabs.querySelectorAll(".tab").forEach((b) => {
    const active = b.dataset.tab === category.id;
    b.setAttribute("aria-selected", String(active));
  });

  $activeCategory.textContent = category.label;

  $products.innerHTML = "";
  (CATALOG[category.id] ?? []).forEach((item) => $products.append(createCard(item)));

  const url = new URL(location.href);
  url.searchParams.set("cat", category.id);
  if (!url.hash) url.hash = "#catalogo";
  history.replaceState(null, "", url);
}

// Inicializa abas + render do grid
function setupCatalog() {
  if (!$tabs || !$products) return;

  $tabs.innerHTML = "";
  CATEGORIES.forEach((c) => $tabs.append(createTab(c)));

  $tabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    setActiveCategory(btn.dataset.tab);
  });

  const params = new URLSearchParams(location.search);
  const initial = params.get("cat") || "";
  setActiveCategory(CATEGORIES.some((c) => c.id === initial) ? initial : CATEGORIES[0].id);
}

// Gera uma mensagem pronta para orçamento (sem backend)
function setupLeadForm() {
  const form = document.getElementById("lead-form");
  const out = document.getElementById("lead-result");
  if (!form || !out) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const modalidade = String(data.get("modalidade") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();

    const text = [
      "Olá, Art Mimo! Quero um orçamento:",
      `Nome: ${nome}`,
      `Modalidade: ${modalidade}`,
      `Detalhes: ${mensagem}`,
    ].join("\n");

    out.hidden = false;
    out.textContent = text;
    out.style.borderLeft = `3px solid ${GOLD}`;

    const url = buildWhatsAppUrl(text);
    window.open(url, "_blank", "noopener");

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        out.textContent = `${text}\n\n(Abrimos o WhatsApp e copiamos a mensagem)`;
      } catch {
        out.textContent = `${text}\n\n(Abrimos o WhatsApp)`;
      }
    }
  });
}

setupCatalog();
setupLeadForm();