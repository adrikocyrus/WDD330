import { renderListWithTemplate, setImageFallback } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    if (!this.listElement) {
      throw new Error(
        `Could not find product list element for category: ${this.category}`,
      );
    }

    const products = await this.dataSource.getData();
    this.renderList(products);
  }

  renderList(products) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      "afterbegin",
      true,
    );
    setImageFallback(this.listElement);
  }
}
