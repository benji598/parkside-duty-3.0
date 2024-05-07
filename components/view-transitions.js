const ViewTransitionsTemplate = document.createElement('template');
ViewTransitionsTemplate.innerHTML = /*html*/ `

<style>
    :host {
        view-transition-name: main;
        contain: layout;
    }



    /* Keyframes for Slide-In and Slide-Out */
    /* @keyframes slide-in-right {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }

        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slide-out-left {
        0% {
            transform: translateX(0);
            opacity: 1;
        }

        100% {
            transform: translateX(-100%);
            opacity: 0;
        }
    }

    /* View Transitions Setup */
    /* [view-transition*='same-origin'] .page-enter-active {
        animation: slide-in-right 0.5s ease-out;
    }

    [view-transition*='same-origin'] .page-leave-active {
        animation: slide-out-left 0.5s ease-in;
    } */
</style>

<div view-transition="same-origin">
    <slot></slot>
</div>


`;

class ViewTransitions extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(ViewTransitionsTemplate.content.cloneNode(true));
  }
}

customElements.define('view-transitions', ViewTransitions);
