const NameListLayoutTemplate = document.createElement('template');
NameListLayoutTemplate.innerHTML = /*html*/ `
<style>
    :host {
        display: grid;
        grid-template-columns: auto 35%;
        gap: 0.7rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 1rem;
        overflow: auto;
    }
</style>
<slot></slot>

`;

class NameListLayout extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(NameListLayoutTemplate.content.cloneNode(true));
    this.dutyId = new URLSearchParams(window.location.search).get('id');
  }

  connectedCallback() {
    document.addEventListener('duty-name-received', (dutyName) => {
      if (!this.hasFetchedData) {
        this.getUsers(dutyName.detail);
        this.hasFetchedData = true;
      }
    });
  }

  async getUsers(dutyName) {
    const response = await fetch(`/api/sub-users/${this.dutyId}`);
    const users = await response.json();

    // Assuming sorting is needed; adjust the attribute names as necessary.
    users.sort((a, b) => `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`));

    users.forEach((user) => {
      const nameDiv = document.createElement('name-holder');
      nameDiv.textContent = `${user.firstname} ${user.lastname}`;

      const sendBtn = document.createElement('send-button');
      sendBtn.setAttribute('firstName', user.firstname);
      sendBtn.setAttribute('lastName', user.lastname);
      sendBtn.setAttribute('number', user.phone);
      sendBtn.setAttribute('dutyName', dutyName);
      sendBtn.setAttribute('duty_message', user.duty_message);
      sendBtn.setAttribute('cover_message', user.cover_message);
      sendBtn.setAttribute('meeting_1', user.meeting_1);
      sendBtn.setAttribute('meeting_2', user.meeting_2);
      sendBtn.setAttribute('icon', '<send-icon></send-icon>');

      this.appendChild(nameDiv);
      this.appendChild(sendBtn);
    });
  }
}

customElements.define('name-list-layout', NameListLayout);
