const SlideUpModalTemplate = document.createElement('template');
SlideUpModalTemplate.innerHTML = /*html*/ `

<style>
    .slide-pop-up {
        position: absolute;
        bottom: 0;
        height: 0;
        background-color: var(--baby-blue);
        width: 100%;
        left: 0;
        border-radius: 2rem 2rem 0 0;
        transition: all 0.6s ease-in-out;
        z-index: 2;
    }

    .open {
        bottom: 0px;
        height: 320px;
    }

    .cancel-btn {
        background-color: #dc3545;
        padding: 1rem 0rem;
        grid-column: span 2;

        &:active {
            background-color: #ae2d3a;
        }
    }

    .overlay {
        position: absolute;
        transition: all 0.4s ease;
    }

    .dark {
        position: absolute;
        top: 0;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .pop-up-title {
        text-align: center;
        font-weight: 600;
        font-size: 1.3rem;
        padding-bottom: 1rem;
        line-height: 1.8;
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
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid white;
        fill: white;
        padding: 0.5rem 0rem;
        border: 2px solid white;
        gap: 0.8rem;
        color: white;
        letter-spacing: 1px;
        cursor: pointer;
        border-radius: var(--btn-radius)
    }

    .whatsapp-btn {
        background-color: var(--whatsapp-green);

        &:active {
            background-color: #1fa550;
        }
    }

    .whatsapp-cover-btn {
        background-color: rgb(255, 255, 255, 0);
        border: 2px solid black;
        border-radius: 1rem;
        color: black;
        padding: 0.8rem 0rem;
        cursor: pointer;
    }

    .sms-btn {
        background-color: var(--sms-blue);
    }

    .sms-cover-btn {
        background-color: rgb(255, 255, 255, 0);
        border: 2px solid black;
        color: black;
        padding: 0.8rem 0rem;
        cursor: pointer;
    }
</style>

<div class="slide-pop-up">
    <div class="pop-up-title">Send Reminder to</div>
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
</div>
<div class="overlay"></div>

`;

class SlideUpModal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(SlideUpModalTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.popUp = this.shadowRoot.querySelector('.slide-pop-up');
    this.whatsapp = this.shadowRoot.querySelector('.whatsapp-btn');
    this.find = this.shadowRoot.querySelector('.whatsapp-cover-btn');
    this.sms = this.shadowRoot.querySelector('.sms-btn');
    this.smsCover = this.shadowRoot.querySelector('.sms-cover-btn');
    this.cancelBtn = this.shadowRoot.querySelector('.cancel-btn');
    this.overlay = this.shadowRoot.querySelector('.overlay');
    this.popUpName = this.shadowRoot.querySelector('.pop-up-title');

    document.addEventListener('open-modal', (el) => this.openSlideUpModal(el));
  }

  openSlideUpModal(el) {
    console.log(el.detail);
    this.popUp.classList.add('open');
    this.overlay.classList.add('dark');
    this.btnOption(el);
  }

  closePopUp() {
    this.popUp.classList.remove('open');
    this.overlay.classList.remove('dark');
  }

  btnOption(el) {
    this.find.addEventListener('click', () => {
      this.findCover(el);
      this.closePopUp();
    });

    this.whatsapp.addEventListener('click', () => {
      this.whatsApp(el);
      this.closePopUp();
    });

    this.sms.addEventListener('click', () => {
      this.sms(el);
      this.closePopUp();
    });

    this.smsCover.addEventListener('click', () => {
      this.smsCover(el);
      this.closePopUp();
    });

    this.cancelBtn.addEventListener('click', () => {
      console.assert('clicked');
      this.closePopUp();
    });

    this.overlay.addEventListener('click', () => {
      this.closePopUp();
    });
  }

  sms(el) {
    window.location.assign(
      `sms:${el.number}?&body=Reminder!%0aHello ${
        el.firstName
      }, You are scheduled for %0a${pageTitle} on ${dayOfWeek()}, Please let me know if you can NOT cover the duty. Thanks.`
    );
  }

  smsCover(el) {
    window.location.assign(
      `sms:${el.number}?&body=Cover Needed!%0aHello ${
        el.firstName
      }, Would you be available to cover ${pageTitle} on ${dayOfWeek()}, Please let me know if you are able to stand in. Thanks.`
    );
  }

  whatsApp(el) {
    window.location.assign(
      `whatsapp://send?phone= ${el.number} &text=*Reminder!*%0aHello ${
        el.firstName
      }, You are scheduled for %0a*${pageTitle}* on *${dayOfWeek()}*, Please let me know if you can *NOT* cover the duty. Thanks.`
    );
  }

  findCover(el) {
    window.location.assign(
      `whatsapp://send?phone= ${el.number} &text=*Cover Needed!*%0aHello ${
        el.firstName
      }, Would you be available to cover *${pageTitle}* on *${dayOfWeek()}*, Please let me know if you are able to stand in. Thanks.`
    );
  }
}

customElements.define('slideup-modal', SlideUpModal);
