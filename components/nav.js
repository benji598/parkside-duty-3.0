'use strict';
const navTemplate = document.createElement('template');

navTemplate.innerHTML = /*html*/ `
<style>
    .material-icons {
        font-family: 'Material Icons';
        font-weight: 400;
        font-style: normal;
        font-size: 26px;
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: 'liga';
    }

    a {
        text-decoration: var(--anchor-decoration);
    }

    :host {
        margin-top: auto;
    }

    .icon-bar {
        display: flex;
    }

    .icon-bar {
        background-color: var(--bg-blue);
        justify-content: space-around;
        line-height: 1.4;
        padding: 0.5rem 0rem;
        text-align: center;
    }

    .icon-bar a {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        color: #000;
        text-decoration: var(--anchor-decoration);
    }
</style>



<div class="icon-bar">
    <a class="active" href="index.html">
        <i class="material-icons">groups</i>
        <small>Duties</small>
    </a>

    <a href="rota.html">
        <i class="material-icons"><span class="material-symbols-rounded">library_books</span></i>
        <small>Rota</small>
    </a>

    <a href="counter.html">
        <i class="material-icons">person_add</i>
        <small>Counter</small>
    </a>
</div>


`;

class Nav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(navTemplate.content.cloneNode(true));
  }
}

customElements.define('nav-bar', Nav);
