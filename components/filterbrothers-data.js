'use strict';

const FilteredBrothers = document.createElement('template');

FilteredBrothers.innerHTML = /*html*/ `

<style>
    .grid-container {
        display: grid;
        grid-template-columns: auto 35%;
        gap: 0.5rem;
        padding-bottom: 0.5rem;
    }

    .send-btn {
        display: flex;
        justify-content: center;
        cursor: pointer;
        border: 0;
        border-radius: var(--btn-radius);
        background-color: var(--baby-blue);
    }
</style>

<div id="data" class="grid-container"></div>

`;

class BrothersData extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });

    this.shadowRoot.appendChild(FilteredBrothers.content.cloneNode(true));
    this.getName();
  }

  connectedCallback() {
    document.addEventListener('page-title', (title) => {
      this.pageTitle = title.detail;
    });

    this.filterBroData();
  }

  // disconnectedCallback() {
  // document.removeEventListener('page-title', this.pageTitleListener);
  // }

  openSlideUpModal(el) {
    this.dispatchEvent(
      new CustomEvent('open-modal', {
        bubbles: true,
        composed: true,
        detail: el,
      })
    );
  }

  async filterBroData() {
    const response = await fetch('data/data.json');
    const broData = await response.json();

    broData.sort((a, b) => a.firstName.localeCompare(b.firstName));
    broData.forEach((el, i) => {
      if (el.duties.includes(`${this.pageTitle}`)) {
        this.addToDom(el, i);
      }
    });
  }

  addToDom(el, i) {
    const insertCode = this.shadowRoot.querySelector('#data');
    console.log(el);

    const html = `<div class="name-holder">${el.firstName} ${el.lastName}</div>
<duty-button class="sender-btn-${i + 1}" title="" subtitle="" icon="<send-icon></send-icon>"></duty-button>
`;
    insertCode.insertAdjacentHTML('beforeend', html);
    insertCode.querySelector(`.sender-btn-${i + 1}`).addEventListener('click', () => {
      console.log(el);
      this.openSlideUpModal(el);
    });
  }
}

// filterBroData() {
// fetch('data/data.json')
// .then((response) => {
// return response.json();
// })
// .then((data) => {
// data.forEach((element) => {
// if (element.duties.includes(`${this.getTitle}`)) {
// console.log(element.firstName, element.lastName);
// }
// // console.log(element.duties.includes('WT Reader'));
// });
// });
// }

customElements.define('filtered-data', BrothersData);
