const DutyBtnGridLayoutTemplate = document.createElement('template');
DutyBtnGridLayoutTemplate.innerHTML = /*html*/ `

<style>
    :host {
        display: grid;
        gap: 0.7rem;
        grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
        overflow: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 1rem;
    }
</style>

<slot></slot>

`;

class DutyBtnGridLayout extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(DutyBtnGridLayoutTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.getData();
  }

  async getData() {
    const response = await fetch('/api/duty-types');
    const data = await response.json();

    console.log(data);

    this.createBtns(data);
  }

  createBtns(data) {
    data.forEach((duty) => {
      const dutyBtn = document.createElement('duty-button');

      dutyBtn.setAttribute('title', duty.name);
      dutyBtn.setAttribute('link', `duty.php?id=${duty.id}`);
      dutyBtn.setAttribute('subtitle', 'Duty');

      const changeName = duty.name;
      const formatIconName = changeName.toLowerCase().replace(' ', '-');

      dutyBtn.setAttribute('icon', `<${formatIconName}-icon></${formatIconName}-icon>`);

      this.appendChild(dutyBtn);
    });
  }
}

customElements.define('duty-btn-grid', DutyBtnGridLayout);
