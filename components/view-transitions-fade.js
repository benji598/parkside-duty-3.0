const ViewTransitionsFadeTemplate = document.createElement('template');
ViewTransitionsFadeTemplate.innerHTML = /*html*/ `
<style>
    @view-transition {
        navigation: auto;
    }
</style>
<slot></slot>
`;

class ViewTransitionsFade extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(ViewTransitionsFadeTemplate.content.cloneNode(true));
    }
}

customElements.define('view-transitions-fade', ViewTransitionsFade);