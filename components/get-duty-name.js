const GetDutyNameTemplate = document.createElement('template');
GetDutyNameTemplate.innerHTML = /*html*/ `
<style>

</style>

<slot></slot>
`;

class GetDutyName extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(GetDutyNameTemplate.content.cloneNode(true));
        this.dutyId = new URLSearchParams(window.location.search).get('id');
    }

    connectedCallback() {
        this.dutyID();
    }

    async dutyID() {
        const response = await fetch(`/api/duty/${this.dutyId}`);
        const duty = await response.json();
        const dutyName = duty.name;
        this.displayDutyName(dutyName);
    }

    displayDutyName(dutyName) {
        this.dispatchEvent(
            new CustomEvent('duty-name-received', {
                bubbles: true,
                composed: true,
                detail: dutyName,
            })
        );
    }
}
customElements.define('duty-name', GetDutyName);