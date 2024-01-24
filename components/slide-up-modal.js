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

    .btn-container {
        padding: 1rem;
        padding-top: 0;
    }

    .cancel-btn {
        width: 100%;
        padding: 1rem;
        border: 2px solid white;
        color: var(--color-white);
        font-weight: 600;
        cursor: pointer;
        background-color: var(--color-red);
        border-radius: var(--btn-radius);
    }

    .cancel-btn:active {
        transform: scale(var(--btn-scale));
        transition: var(--btn-transition);
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
    <div class="btn-container">
        <button class="cancel-btn btn">Cancel</button>
    </div>
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
    this.shadowRoot.querySelector('.cancel-btn').addEventListener('click', this.cancelButton.bind(this));

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

  static get observedAttributes() {
    return ['content'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'content') {
      this.updateContent(newValue); // Call a method to update the modal's content
    }
  }

  updateContent(newContent) {
    // Update the modal's content
    const contentContainer = this.shadowRoot.querySelector('.modal-content');
    contentContainer.innerHTML = newContent;
  }

  openSlideUpModal() {
    this.popUp.classList.add('open');
    this.overlay.classList.add('dark');
  }

  closeSlideUpModal() {
    this.popUp.classList.remove('open');
    this.overlay.classList.remove('dark');
  }

  cancelButton() {
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 0, 0, 0, 30]);
    }

    this.closeSlideUpModal();
  }

  getContent() {
    const modalContent = this.getAttribute('content');

    this.shadowRoot.querySelector('.modal-content').innerHTML = modalContent;
  }
}

customElements.define('slideup-modal', SlideUpModal);
