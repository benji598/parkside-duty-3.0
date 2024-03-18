const SendBtnTemplate = document.createElement('template');
SendBtnTemplate.innerHTML = /*html*/ `
<style>
    a {
        text-decoration: var(--anchor-decoration);
    }

    h3,
    p {
        font-size: 1rem;
        margin: 0;
    }
</style>

<btn-design>
    <div class="icon" slot="icon"></div>
    <span slot="label"></span>
</btn-design>
`;

class SendBtn extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open',
        });
        shadowRoot.appendChild(SendBtnTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.getInfo();
    }

    createAndAppendModal() {
        const modal = document.createElement('slideup-modal');
        modal.setAttribute(
            'content',
            ` <form-container title='' icon='' form='<send-options></send-options>'>
</form-container>`
        );
        document.body.appendChild(modal);
    }

    openSlideUpModal() {
        if (!document.querySelector('slideup-modal')) {
            this.createAndAppendModal();
        }

        this.dispatchEvent(
            new CustomEvent('open-modal', {
                bubbles: true,
                composed: true,
            })
        );
    }

    messageDetails(obj) {
        this.dispatchEvent(
            new CustomEvent('message-details', {
                bubbles: true,
                composed: true,
                detail: obj,
            })
        );
    }

    getInfo() {
        const firstName = this.getAttribute('firstName');
        const lastName = this.getAttribute('lastName');
        const dutyName = this.getAttribute('dutyName');
        const number = this.getAttribute('number');
        const icon = this.getAttribute('icon');
        const duty_message = this.getAttribute('duty_message');
        const cover_message = this.getAttribute('cover_message');
        const meeting_1 = this.getAttribute('meeting_1');
        const meeting_2 = this.getAttribute('meeting_2');

        this.shadowRoot.querySelector('.icon').innerHTML = icon;

        this.addEventListener('click', function() {
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
            this.openSlideUpModal();

            this.messageDetails({
                firstName,
                lastName,
                dutyName,
                number,
                duty_message,
                cover_message,
                meeting_1,
                meeting_2,
            });
        });
    }
}

customElements.define('send-button', SendBtn);