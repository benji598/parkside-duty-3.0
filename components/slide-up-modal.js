const SlideUpModalTemplate = document.createElement('template');
SlideUpModalTemplate.innerHTML = /*html*/ `

<style>
    .slide-pop-up {
        position: absolute;
        max-height: 0;
        left: 0;
        bottom: 0;
        z-index: 2;
        border-radius: 2rem 2rem 0 0;
        background-color: var(--baby-blue);
    }

    .open {
        bottom: 0px;
        max-height: 1000px;
    }

    .overlay {
        position: absolute;
        opacity: 0;
        height: 100%;
        z-index: -1;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
    }

    .slide-pop-up,
    .overlay {
        width: 100%;
        transition: all 0.6s ease;
    }

    .overlay.dark {
        opacity: 1;
        z-index: 1;
    }
</style>

<div class="overlay"></div>
<div class="slide-pop-up">
    <div class="modal-content"></div>
</div>

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

    this.overlay.addEventListener('click', () => {
      this.closeSlideUpModal();
    });

    this.getContent();

    document.addEventListener('open-modal', (el) => {
      setTimeout(() => {
        this.openSlideUpModal(el);
      }, 10);
    });

    document.addEventListener('close-modal', () => {
      this.closeSlideUpModal();
    });
  }

  disconnectedCallback() {
    // Remove event listeners
    document.removeEventListener('open-modal', this.openSlideUpModal);
    document.removeEventListener('close-modal', this.closeSlideUpModal);
  }

  openSlideUpModal() {
    this.popUp.classList.add('open');
    this.overlay.classList.add('dark');
  }

  closeSlideUpModal() {
    this.popUp.classList.remove('open');
    this.overlay.classList.remove('dark');
  }

  getContent() {
    const modalContent = this.getAttribute('content');

    this.shadowRoot.querySelector('.modal-content').innerHTML = modalContent;
  }
}

customElements.define('slideup-modal', SlideUpModal);
