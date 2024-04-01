const SlideUpModalTemplate = document.createElement('template');
SlideUpModalTemplate.innerHTML = /*html*/ `

<style>
    .slide-pop-up {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;
        border-radius: 2rem 2rem 0 0;
        transform: translateY(100%);
        background-color: var(--baby-blue);
    }

    .open {
        transform: translateY(0);
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
    .overlay,
    .returning {
        width: 100%;
        transition: all 0.25s ease;
    }

    .overlay.dark {
        opacity: 1;
        z-index: 1;
    }

    .gesture-bar {
        border: 2px solid var(--color-dark-grey);
        border-radius: var(--btn-radius);
        margin-top: 1rem;
        max-width: 50px;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
    }

    .dragging {
        transition: none;
    }
</style>

<div class="overlay"></div>
<div class="slide-pop-up">

    <div class="gesture-bar"></div>
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

        this.popUp.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
        this.popUp.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
        this.popUp.addEventListener('touchend', this.handleTouchEnd.bind(this), false);

        this.overlay.addEventListener('click', () => {
            this.closeSlideUpModal();
        });

        this.getContent();

        document.addEventListener('open-modal', (el) => {
            setTimeout(() => {
                this.openSlideUpModal(el);
            }, 30);
        });

        document.addEventListener('close-modal', () => {
            this.closeSlideUpModal();
        });
    }

    disconnectedCallback() {
        document.removeEventListener('open-modal', this.openSlideUpModal);
        document.removeEventListener('close-modal', this.closeSlideUpModal);

        this.popUp.removeEventListener('touchstart', this.handleTouchStart);
        this.popUp.removeEventListener('touchmove', this.handleTouchMove);
        this.popUp.removeEventListener('touchend', this.handleTouchEnd);
    }

    static get observedAttributes() {
        return ['content'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'content') {
            this.updateContent(newValue);
        }
    }

    updateContent(newContent) {
        const contentContainer = this.shadowRoot.querySelector('.modal-content');
        contentContainer.innerHTML = newContent;
    }

    openSlideUpModal() {
        this.popUp.classList.add('open');
        this.overlay.classList.add('dark');
    }

    closeSlideUpModal() {
        this.popUp.style.transform = '';
        this.popUp.classList.remove('open');
        this.overlay.classList.remove('dark');

        setTimeout(() => {
            this.remove('slideup-modal');
        }, 350);
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

    handleTouchStart(e) {
        this.initialY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (this.initialY === null) {
            return;
        }

        e.preventDefault();

        let currentY = e.touches[0].clientY;
        let diffY = currentY - this.initialY;

        if (diffY > 0) {
            this.popUp.classList.add('dragging');
            this.popUp.style.transform = `translateY(${diffY}px)`;
        }
    }

    handleTouchEnd(e) {
        let currentY = e.changedTouches[0].clientY;
        let diffY = currentY - this.initialY;

        this.popUp.classList.remove('dragging');

        if (diffY > this.popUp.clientHeight * 0.35) {
            this.closeSlideUpModal();
        } else {
            this.popUp.classList.add('returning');
            this.popUp.style.transform = 'translateY(0)';
        }
    }
}

customElements.define('slideup-modal', SlideUpModal);