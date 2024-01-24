const AdminBtnsTemplate = document.createElement('template');
AdminBtnsTemplate.innerHTML = /*html*/ `
<style>

</style>


<btn-design>
    <div class="icon" slot="icon"></div>
    <span class="title" slot="title"></span>
</btn-design>

`;

class AdminBtns extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open',
        });
        shadowRoot.appendChild(AdminBtnsTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.updateAttributes();
        this.addEventListener('click', this.onButtonClick.bind(this));
    }

    onButtonClick() {
        // When the button is clicked, create and append the modal with its content
        const newModalContent = this.getAttribute('modal-content');
        this.createAndAppendModal(newModalContent);
    }

    createAndAppendModal(newModalContent) {
        // Check if the modal already exists in the DOM
        let modal = document.querySelector('slideup-modal');

        if (modal) {
            modal.setAttribute('content', newModalContent);
            // Update the content of the existing modal
        } else {
            // Create a new modal
            modal = document.createElement('slideup-modal');
            modal.setAttribute('content', newModalContent);
            document.body.appendChild(modal);
        }

        // Open the modal (if you have specific logic to open it)
        this.openSlideUpModal();
    }

    openSlideUpModal() {
        this.dispatchEvent(
            new CustomEvent('open-modal', {
                bubbles: true,
                composed: true,
            })
        );
    }

    updateAttributes() {
        const icon = this.getAttribute('icon');
        const title = this.getAttribute('title');

        this.shadowRoot.querySelector('.icon').innerHTML = icon;
        this.shadowRoot.querySelector('.title').textContent = title;
    }
}

customElements.define('admin-button', AdminBtns);