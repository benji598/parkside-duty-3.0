const circleBtnTemplate = document.createElement('template');
circleBtnTemplate.innerHTML = /*html*/ `

<style>

</style>


<div class="icon-circle">
    <slot name="icon-slot"></slot> <!-- Slot for specific icon -->
</div>

`;

class circleBtn extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(circleBtnTemplate.content.cloneNode(true));
    }
}

customElements.define('circle-icon-btn', circleBtn);