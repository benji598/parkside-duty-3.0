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
        transition: all 0.35s ease-in-out;
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

    .overlay {
        position: absolute;
        transition: all 0.35s ease;
    }

    .cancel-btn {
        background-color: #dc3545;

        grid-column: span 2;

        &:active {
            background-color: #ae2d3a;
        }
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

        this.getContent();

        document.addEventListener('open-modal', (el) => {
            console.log('received', el);
            this.openSlideUpModal(el);
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
        console.log('modal content', modalContent);

        this.shadowRoot.querySelector('.modal-content').innerHTML = modalContent;
    }
}

customElements.define('slideup-modal', SlideUpModal);