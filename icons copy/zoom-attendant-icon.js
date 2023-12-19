const ZoomAttendantIconTemplate = document.createElement('template');
ZoomAttendantIconTemplate.innerHTML = /*html*/ `




<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Z" />
</svg>

`;

class ZoomAttendantIcon extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(ZoomAttendantIconTemplate.content.cloneNode(true));
    }
}

customElements.define('zoom-attendant-icon', ZoomAttendantIcon);