// Local, fictional data: no API keys, network requests, or database.
// The initial order is intentionally not price order.
const stays = [
  {
    name: "Harbor House",
    city: "Monterey",
    price: 185,
    guests: 2,
    description: "Slow mornings, sea air, and a little room by the harbor.",
    scene: "coast",
    caption: "By the water",
  },
  {
    name: "Redwood Hideaway",
    city: "Santa Cruz",
    price: 125,
    guests: 2,
    description: "A quiet studio tucked between the trees and the trails.",
    scene: "forest",
    caption: "Under the trees",
  },
  {
    name: "Sunset Loft",
    city: "San Francisco",
    price: 240,
    guests: 4,
    description: "Big windows, neighborhood coffee, and room to spread out.",
    scene: "city",
    caption: "In the neighborhood",
  },
  {
    name: "Cypress Cottage",
    city: "Monterey",
    price: 165,
    guests: 4,
    description: "A cozy base for beach walks and long, unhurried dinners.",
    scene: "coast",
    caption: "Take the scenic route",
  },
  {
    name: "North Beach Nook",
    city: "San Francisco",
    price: 210,
    guests: 2,
    description: "A small city escape with bookshops just around the corner.",
    scene: "city",
    caption: "A city kind of weekend",
  },
  {
    name: "Boardwalk Bungalow",
    city: "Santa Cruz",
    price: 145,
    guests: 4,
    description: "Pack light. The sand, the surf, and the sunset are nearby.",
    scene: "coast",
    caption: "Make time for the coast",
  },
];

const destination = document.querySelector("#destination");
const resetButton = document.querySelector("#reset-filters");
const grid = document.querySelector("#stay-grid");
const template = document.querySelector("#stay-template");
const resultsCount = document.querySelector("#results-count");
const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function renderStays() {
  const visibleStays = stays.filter((stay) => {
    return destination.value === "" || stay.city === destination.value;
  });
  const cards = document.createDocumentFragment();

  for (const stay of visibleStays) {
    const card = template.content.cloneNode(true);
    card.querySelector(".stay-art").classList.add(`scene-${stay.scene}`);
    card.querySelector(".art-caption").textContent = stay.caption;
    card.querySelector(".stay-location").textContent = stay.city;
    card.querySelector(".stay-name").textContent = stay.name;
    card.querySelector(".stay-description").textContent = stay.description;
    card.querySelector(".stay-guests").textContent = `Up to ${stay.guests} guests`;
    card.querySelector(".stay-price strong").textContent = dollars.format(stay.price);
    cards.append(card);
  }

  grid.replaceChildren(cards);
  resultsCount.textContent = `${visibleStays.length} ${visibleStays.length === 1 ? "stay" : "stays"}`;
}

destination.addEventListener("change", renderStays);
resetButton.addEventListener("click", () => {
  destination.value = "";
  renderStays();
});

renderStays();
