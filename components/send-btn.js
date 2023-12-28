const SendBtnTemplate = document.createElement('template');
SendBtnTemplate.innerHTML = /*html*/ `
<style>
    a {
        text-decoration: var(--anchor-decoration);
    }

    h3,
    p {
        font-size: 1rem;
        margin: 0;
    }

    .icon-circle {
        background-color: var(--background-color);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        padding: 0.6rem;
        line-height: 0;
        margin-bottom: 7px;
    }


    .send-btns {
        display: grid;
        place-items: center;
        background-color: var(--baby-blue);
        color: #000;
        padding: 0.5rem 0;
        text-align: center;
        transition: var(--btn-transition);
        border-radius: var(--btn-radius);
        cursor: pointer;
    }

    .send-btns:hover {
        background-color: var(--baby-blue-hover);
    }

    .send-btns:active {
        background-color: var(--baby-blue-active);
    }
</style>


<a class="btn send-btns">
    <div class="icon-circle">
        <div class="icon"></div>
        <slot></slot>
    </div>
</a>
`;

class SendBtn extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open',
    });
    shadowRoot.appendChild(SendBtnTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.getInfo();
  }

  openSlideUpModal() {
    this.dispatchEvent(
      new CustomEvent('open-modal', {
        bubbles: true,
        composed: true,
      })
    );
  }

  messageDetails(obj) {
    this.dispatchEvent(
      new CustomEvent('message-details', {
        bubbles: true,
        composed: true,
        detail: obj,
      })
    );
  }

  getInfo() {
    const firstName = this.getAttribute('firstName');
    const lastName = this.getAttribute('lastName');
    const dutyName = this.getAttribute('dutyName');
    const number = this.getAttribute('number');
    const icon = this.getAttribute('icon');

    this.shadowRoot.querySelector('.icon').innerHTML = icon;

    this.addEventListener('click', function () {
      this.openSlideUpModal();
      this.messageDetails({
        firstName,
        lastName,
        dutyName,
        number,
      });
    });
  }
}

customElements.define('send-button', SendBtn);
