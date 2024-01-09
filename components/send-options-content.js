const SendOptionsTemplate = document.createElement('template');
SendOptionsTemplate.innerHTML = /*html*/ `

<style>
    .pop-up-title {
        text-align: center;
        font-weight: 600;
        font-size: 1.3rem;
        line-height: 1.8;
        padding-top: 0.7rem;
    }

    .btn-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        padding: 1rem;
    }

    .whatsapp-btn,
    .sms-btn,
    .cancel-btn {
        fill: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid white;
        padding: 0.5rem 0rem;
        border: 2px solid white;
        gap: 0.8rem;
        color: var(--color-black);
        font-weight: 600;
        cursor: pointer;
        border-radius: var(--btn-radius);
    }

    .whatsapp-btn {
        background-color: var(--whatsapp-green);
    }

    .sms-btn {
        background-color: var(--sms-blue);
    }

    .sms-cover-btn,
    .whatsapp-cover-btn {
        background-color: rgb(255, 255, 255, 0);
        border: 2px solid black;
        color: black;
        padding: 0.8rem 0rem;
        cursor: pointer;
        border-radius: var(--btn-radius);
    }

    .cancel-btn {
        color: var(--color-white);
        background-color: var(--color-red);
        padding: 1rem 0;
        grid-column: span 2;
    }

    .whatsapp-btn:active,
    .sms-btn:active,
    .cancel-btn:active,
    .sms-cover-btn:active,
    .whatsapp-cover-btn:active {
        transform: scale(var(--btn-scale));
        transition: var(--btn-transition);
    }
</style>

<div class="pop-up-title">
    Send Reminder to <div class="pop-up-name"></div>
</div>

<div class="btn-container">
    <button class="sms-btn btn">
        <sms-icon></sms-icon>
        <div>SMS</div>
    </button>

    <button class="whatsapp-btn btn">
        <whatsapp-icon></whatsapp-icon>
        <div>WhatsApp</div>
    </button>

    <button class="sms-cover-btn btn">Ask to Cover Duty</button>
    <button class="whatsapp-cover-btn btn">Ask to Cover Duty</button>
    <button class="cancel-btn btn">Cancel</button>
</div>
<div class="overlay"></div>

`;

class SendOptions extends HTMLElement {
  constructor() {
    super();
    this.pageTitle;

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(SendOptionsTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.popUp = this.shadowRoot.querySelector('.slide-pop-up');
    this.whatsapp = this.shadowRoot.querySelector('.whatsapp-btn');
    this.whatsappCoverBtn = this.shadowRoot.querySelector('.whatsapp-cover-btn');
    this.smsBtn = this.shadowRoot.querySelector('.sms-btn');
    this.smsCoverBtn = this.shadowRoot.querySelector('.sms-cover-btn');
    this.cancelBtn = this.shadowRoot.querySelector('.cancel-btn');
    this.overlay = this.shadowRoot.querySelector('.overlay');
    this.popUpName = this.shadowRoot.querySelector('.pop-up-name');

    document.addEventListener('message-details', (obj) => {
      this.popUpName.textContent = `${obj.detail.firstName} ${obj.detail.lastName}`;
      this.btnOption(obj);
      console.log(obj.detail.message);
    });

    this.cancelButton();
  }

  closeModal() {
    this.dispatchEvent(
      new CustomEvent('close-modal', {
        bubbles: true,
        composed: true,
      })
    );
  }

  btnOption(obj) {
    this.whatsapp.addEventListener('click', () => {
      this.whatsApp(obj);
      this.closeModal();
    });

    this.whatsappCoverBtn.addEventListener('click', () => {
      this.whatsappCover(obj);
      this.closeModal();
    });

    this.smsBtn.addEventListener('click', () => {
      this.sms(obj);
      this.closeModal();
    });

    this.smsCoverBtn.addEventListener('click', () => {
      this.smsCover(obj);
      this.closeModal();
    });

    this.overlay.addEventListener('click', () => {
      this.closeModal();
    });
  }

  cancelButton() {
    this.cancelBtn.addEventListener('click', () => {
      if ('vibrate' in navigator) {
        navigator.vibrate([30, 0, 0, 0, 30]);
      }
      this.closeModal();
    });
  }

  whatsApp(obj) {
    window.location.assign(
      `whatsapp://send?phone=+${obj.detail.number} &text=*Reminder!*%0aHello ${obj.detail.firstName}, You are scheduled for %0a*${obj.detail.dutyName}* on *Sunday*, Please let me know if you can *NOT* cover the duty. Thanks.`
    );
  }

  whatsappCover(obj) {
    window.location.assign(
      `whatsapp://send?phone= ${obj.detail.number} &text=*Cover Needed!*%0aHello ${obj.detail.firstName}, Would you be available to cover *${obj.detail.dutyName}* on *Sunday*, Please let me know if you are able to stand in. Thanks.`
    );
  }

  sms(obj) {
    window.location.assign(
      `sms:${obj.detail.number}?&body=Reminder!%0aHello ${obj.detail.firstName},
You are scheduled for %0a${obj.detail.dutyName} on Sunday, Please let me know if you can NOT cover the duty. Thanks.`
    );
  }

  smsCover(obj) {
    window.location.assign(
      `sms:${obj.detail.number}?&body=Cover Needed!%0aHello ${obj.detail.firstName}, Would you be available to cover ${obj.detail.dutyName} on Sunday, Please let me know if you are able to stand in. Thanks.`
    );
  }
}

customElements.define('send-options', SendOptions);
