const ManageDutiesTemplate = document.createElement('template');
ManageDutiesTemplate.innerHTML = /*html*/ `


<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="m640-120-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-29 72-24 143t48 135H80Zm600-80q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z" />
</svg>

`;

class ManageDuties extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(ManageDutiesTemplate.content.cloneNode(true));
    }
}

customElements.define('manage-duties-icon', ManageDuties);