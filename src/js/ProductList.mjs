import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    return `<li class="product-card">
    <a href="product_pages/?product=${product.id}">
      <img src="${product.image}" alt="Image of ${product.name}">
      <h2 class="card__brand">${product.brand}</h2>
      <h3 class="card__name">${product.name}</h3>
      <p class="product-card__price">$${product.price.toFixed(2)}</p>
    </a>
  </li>`
}

export default class ProductList {
  constructor(productCategory, dataSource,listElement) {
    this.productCategory = productCategory;
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
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

    renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  } 
}  
    if (!this.listElement) {
      throw new Error(
        `Could not find product list element for category: ${this.category}`,
      );
    }

    const products = await this.dataSource.getData();
    this.renderList(products);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
    setImageFallback(this.listElement);
  }
}
