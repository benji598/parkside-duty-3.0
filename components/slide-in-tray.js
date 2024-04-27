const SlideInTrayTemplate = document.createElement('template');
SlideInTrayTemplate.innerHTML = /*html*/ `

<style>
    .tray {
        position: fixed;
        display: grid;
        top: 0;
        width: 90%;
        right: -100%;
        height: 100%;
        z-index: 1;
        border-radius: var(--btn-radius) 0 0 var(--btn-radius);
        transform: translateX: -100% 0;
        transition: all 0.3s ease-in-out;
        background-color: var(--baby-blue);
    }

    .slide-in {
        right: 0%;
        transform: translateX: 0;
    }

    .inner-wrapper {
        display: grid;
        width: 100%;
        margin: 1rem;
        border-radius: var(--btn-radius);
        background-color: var(--color-white);
    }

    .gesture-bar {
        border: 2px solid var(--color-dark-grey);
        border-radius: var(--btn-radius);
        margin-left: 1rem;
        height: 100%;
        max-height: 50px;
        justify-content: center;
        margin-bottom: auto;
        margin-top: auto;
    }

    .flex-box {
        display: flex;
    }

    .dark {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
    }


    .dragging {
        transition: none;
    }
</style>


<div class="tray">
    <close-btn></close-btn>
    <div class="flex-box">
        <div class="gesture-bar"></div>
        <div class="inner-wrapper">
            <div class="content"><img src="https://picsum.photos/500/500"></div>
            <logout-btn></logout-btn>
        </div>
    </div>
</div>
<div class="overlay"></div>
<slot></slot>

`;

class SlideInTray extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(SlideInTrayTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    document.addEventListener('slide-in', () => {
      setTimeout(() => this.slideIn(), 10);
    });

    this.SlideIn = this.shadowRoot.querySelector('.tray');
    this.overlay = this.shadowRoot.querySelector('.overlay');
    this.shadowRoot.querySelector('close-btn').addEventListener('click', this.closeSlideInTray.bind(this));

    this.SlideIn.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    this.SlideIn.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    this.SlideIn.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
  }

  disconnectedCallback() {
    this.SlideIn.removeEventListener('touchstart', this.handleTouchStart);
    this.SlideIn.removeEventListener('touchmove', this.handleTouchMove);
    this.SlideIn.removeEventListener('touchend', this.handleTouchEnd);
  }

  slideIn() {
    this.SlideIn.classList.add('slide-in');
    this.overlay.classList.add('dark');
  }

  closeSlideInTray() {
    this.SlideIn.style.transform = '';
    this.SlideIn.classList.remove('slide-in');
    this.overlay.classList.remove('dark');
    setTimeout(() => {
      this.remove();
    }, 350);
  }

  handleTouchStart(e) {
    this.initialX = e.touches[0].clientX;
  }

  handleTouchMove(e) {
    if (this.initialX === null) {
      return;
    }

    e.preventDefault();

    let currentX = e.touches[0].clientX;
    let diffX = currentX - this.initialX;

    if (diffX > 0) {
      this.SlideIn.classList.add('dragging');
      this.SlideIn.style.transform = `translateX(${diffX}px)`;
    }
  }

  handleTouchEnd(e) {
    let currentX = e.changedTouches[0].clientX;
    let diffX = currentX - this.initialX;

    this.SlideIn.classList.remove('dragging');

    if (diffX > this.SlideIn.clientWidth * 0.35) {
      this.closeSlideInTray();
    } else {
      this.SlideIn.classList.add('slide-in');
      this.SlideIn.style.transform = 'translateX(0)';
    }
  }
}

customElements.define('slide-in-tray', SlideInTray);
