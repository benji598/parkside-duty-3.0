const SlideInTrayTemplate = document.createElement('template');
SlideInTrayTemplate.innerHTML = /*html*/ `

<style>
    .tray {
        position: fixed;
        display: grid;
        top: 0;
        width: 80%;
        right: -100%;
        height: 100%;
        z-index: 1;
        transform: translateX: -100% 0;
        transition: all 0.3s ease-in-out;
        background-color: var(--baby-blue);
    }

    .slide-in {
        right: 0%;
        transform: translateX: 0;
    }

    .dark {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100vw;
        height: 100vh;
    }

    logout-btn {
        margin-top: auto;
    }
</style>


<div class="tray">
    <logout-btn></logout-btn>
    <button class="close">close</button>
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
    document.addEventListener('slide-in', (el) => {
      console.log(el);
      setTimeout(() => {
        this.slideIn();
      }, 10);
    });
    this.close();
  }

  slideIn() {
    this.shadowRoot.querySelector('.tray').classList.add('slide-in');
    this.shadowRoot.querySelector('.overlay').classList.add('dark');
  }

  close() {
    this.shadowRoot.querySelector('.close').addEventListener('click', () => {
      this.shadowRoot.querySelector('.tray').classList.remove('slide-in');
      this.shadowRoot.querySelector('.overlay').classList.remove('dark');
      setTimeout(() => {
        this.remove('slide-in-tray');
      }, 350);
    });
  }
}

customElements.define('slide-in-tray', SlideInTray);
