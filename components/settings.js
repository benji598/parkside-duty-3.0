const SettingsTemplate = document.createElement('template');
SettingsTemplate.innerHTML = /*html*/ `
<style>

</style>

<slot></slot>
`;

class Settings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(SettingsTemplate.content.cloneNode(true));
  }
}

customElements.define('admin-settings', Settings);
