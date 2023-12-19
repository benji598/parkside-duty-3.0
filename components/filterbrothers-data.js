const FilteredBrothers = document.createElement('template');

FilteredBrothers.innerHTML = /*html*/ `

<style>
    .grid-container {
        display: grid;
        grid-template-columns: auto 35%;
        gap: 0.5rem;
        padding-bottom: 0.5rem;
    }

    .name-holder {
        display: grid;
        align-items: center;
        background-color: var(--baby-blue);
        padding-left: 1rem;
        border-radius: var(--btn-radius);
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
    }

    connectedCallback() {
        document.addEventListener('page-title', (title) => {
            this.pageTitle = title.detail;
        });

        this.filterBroData();
    }

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

        const btnClass = `sender-btn-${i + 1}`;

        const html = `<div class="name-holder">${el.firstName} ${el.lastName}</div>
<button class="btn send-btn ${btnClass}">
    <circle-icon-btn icon="send"></circle-icon-btn>
</button>`;

        insertCode.insertAdjacentHTML('beforeend', html);
        insertCode.querySelector(`.${btnClass}`).addEventListener('click', () => {
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