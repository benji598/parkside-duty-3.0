const SlideUpModalTemplate = document.createElement('template');
SlideUpModalTemplate.innerHTML = /*html*/ `

<style>
    .slide-pop-up {
        position: absolute;
        bottom: 0;
        max-height: 0;
        background-color: var(--baby-blue);
        width: 100%;
        left: 0;
        border-radius: 2rem 2rem 0 0;
        transition: all 1s ease;
        z-index: 2;
    }

    .open {
        bottom: 0px;
        max-height: 1000px;
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

    .cancel-btn {
        background-color: #dc3545;

        grid-column: span 2;

        &:active {
            background-color: #ae2d3a;
        }
    }

    .overlay {
        position: absolute;
        transition: all 0.4s ease;
    }
</style>

<div class="slide-pop-up">
    <div class="modal-content"></div>
</div>
<div class="overlay"></div>

`;

class SlideUpModal extends HTMLElement {
  constructor() {
    super();
    this.pageTitle;

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(SlideUpModalTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.popUp = this.shadowRoot.querySelector('.slide-pop-up');
    this.overlay = this.shadowRoot.querySelector('.overlay');

    document.addEventListener('open-modal', (el) => {
      console.log('received', el);
      this.openSlideUpModal(el);
    });
    this.getContent();
  }

  openSlideUpModal(el) {
    // console.log(el.detail);
    this.popUp.classList.add('open');
    this.overlay.classList.add('dark');
    // this.btnOption(el);
    console.log(el);
  }

  closePopUp() {
    this.popUp.classList.remove('open');
    this.overlay.classList.remove('dark');
  }

  getContent() {
    const modalContent = this.getAttribute('content');
    console.log('modal content', modalContent);

    this.shadowRoot.querySelector('.modal-content').innerHTML = modalContent;
  }

  // btnOption(el) {
  // this.find.addEventListener('click', () => {
  // this.findCover(el);
  // this.closePopUp();
  // });

  // this.whatsapp.addEventListener('click', () => {
  // this.whatsApp(el);
  // this.closePopUp();
  // });

  // this.sms.addEventListener('click', () => {
  // this.sms(el);
  // this.closePopUp();
  // });

  // this.smsCover.addEventListener('click', () => {
  // this.smsCover(el);
  // this.closePopUp();
  // });

  // this.cancelBtn.addEventListener('click', () => {
  // console.assert('clicked');
  // this.closePopUp();
  // });

  // this.overlay.addEventListener('click', () => {
  // this.closePopUp();
  // });
  // }

  // sms(el) {
  // window.location.assign(
  // `sms:${el.number}?&body=Reminder!%0aHello ${el.firstName}, You are scheduled for %0a${
  // this.pageTitle
  // } on ${dayOfWeek()}, Please let me know if you can NOT cover the duty. Thanks.`
  // );
  // }

  // smsCover(el) {
  // window.location.assign(
  // `sms:${el.number}?&body=Cover Needed!%0aHello ${el.firstName}, Would you be available to cover ${
  // this.pageTitle
  // } on ${dayOfWeek()}, Please let me know if you are able to stand in. Thanks.`
  // );
  // }

  // whatsApp(el) {
  // window.location.assign(
  // `whatsapp://send?phone= ${el.number} &text=*Reminder!*%0aHello ${el.firstName}, You are scheduled for %0a*${
  // this.pageTitle
  // }* on *${dayOfWeek()}*, Please let me know if you can *NOT* cover the duty. Thanks.`
  // );
  // }

  // findCover(el) {
  // window.location.assign(
  // `whatsapp://send?phone= ${el.number} &text=*Cover Needed!*%0aHello ${el.firstName}, Would you be available to cover *${
  // this.pageTitle
  // }* on *${dayOfWeek()}*, Please let me know if you are able to stand in. Thanks.`
  // );
  // }
}

customElements.define('slideup-modal', SlideUpModal);
