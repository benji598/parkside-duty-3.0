const SendOptionsTemplate = document.createElement('template');
SendOptionsTemplate.innerHTML = /*html*/ `

<style>
    .pop-up-title {
        text-align: center;
        font-weight: 600;
        font-size: 1.3rem;
        line-height: 1.8;
    }

    .btn-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        padding-top: 1rem;
    }

    .whatsapp-btn,
    .sms-btn {
        fill: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid white;
        padding: 0.5rem 0rem;
        border: 2px solid white;
        gap: 0.8rem;
        color: var(--color-black);
        font-weight: 600;
        cursor: pointer;
        border-radius: var(--btn-radius);
    }

    .whatsapp-btn {
        background-color: var(--whatsapp-green);
    }

    .sms-btn {
        background-color: var(--sms-blue);
    }

    .sms-cover-btn,
    .whatsapp-cover-btn {
        background-color: rgb(255, 255, 255, 0);
        border: 2px solid black;
        color: black;
        padding: 0.8rem 0rem;
        cursor: pointer;
        border-radius: var(--btn-radius);
    }



    .whatsapp-btn:active,
    .sms-btn:active,
    .sms-cover-btn:active,
    .whatsapp-cover-btn:active {
        transform: scale(var(--btn-scale));
        transition: var(--btn-transition);
    }
</style>

<div class="pop-up-title">
    Send Reminder to <div class="pop-up-name"></div>
</div>

<div class="btn-container">
    <button class="sms-btn btn">
        <sms-icon></sms-icon>
        <div>SMS</div>
    </button>

    <button class="whatsapp-btn btn">
        <whatsapp-icon></whatsapp-icon>
        <div>WhatsApp</div>
    </button>

    <button class="sms-cover-btn btn">Ask to Cover Duty</button>
    <button class="whatsapp-cover-btn btn">Ask to Cover Duty</button>
</div>
<div class="overlay"></div>

`;

class SendOptions extends HTMLElement {
    constructor() {
        super();
        this.pageTitle;

        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(SendOptionsTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.popUp = this.shadowRoot.querySelector('.slide-pop-up');
        this.whatsapp = this.shadowRoot.querySelector('.whatsapp-btn');
        this.whatsappCoverBtn = this.shadowRoot.querySelector('.whatsapp-cover-btn');
        this.smsBtn = this.shadowRoot.querySelector('.sms-btn');
        this.smsCoverBtn = this.shadowRoot.querySelector('.sms-cover-btn');
        this.cancelBtn = this.shadowRoot.querySelector('.cancel-btn');
        this.overlay = this.shadowRoot.querySelector('.overlay');
        this.popUpName = this.shadowRoot.querySelector('.pop-up-name');

        document.addEventListener('message-details', (obj) => {
            this.popUpName.textContent = `${obj.detail.firstName} ${obj.detail.lastName}`;
            this.btnOption(obj);
        });

        this.cancelButton();
    }

    closeModal() {
        this.dispatchEvent(
            new CustomEvent('close-modal', {
                bubbles: true,
                composed: true,
            })
        );
    }

    btnOption(obj) {
        this.whatsapp.addEventListener('click', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate(30);
            }
            this.whatsApp(obj);
            this.closeModal();
        });

        this.whatsappCoverBtn.addEventListener('click', () => {
            this.whatsappCover(obj);
            this.closeModal();
        });

        this.smsBtn.addEventListener('click', () => {
            this.sms(obj);
            this.closeModal();
        });

        this.smsCoverBtn.addEventListener('click', () => {
            this.smsCover(obj);
            this.closeModal();
        });

        this.overlay.addEventListener('click', () => {
            this.closeModal();
        });
    }

    whatsApp(obj) {
        const message_content = this.parseMessage(obj, obj.detail.duty_message);
        window.location.assign(`whatsapp://send?phone=+${obj.detail.number} &text=${message_content}`);
    }

    whatsappCover(obj) {
        const message_content = this.parseMessage(obj, obj.detail.cover_message);
        window.location.assign(`whatsapp://send?phone= ${obj.detail.number} &text=*${message_content}`);
    }

    sms(obj) {
        const message_content = this.parseMessage(obj, obj.detail.duty_message);
        window.location.assign(`sms:${obj.detail.number}?&body=${message_content}`);
    }

    smsCover(obj) {
        const message_content = this.parseMessage(obj, obj.detail.cover_message);
        window.location.assign(`sms:${obj.detail.number}?&body=${message_content}`);
    }

    parseMessage(obj, message) {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        const currentDate = new Date();
        const currentDayOfWeek = (currentDate.getDay() + 6) % 7;

        const meeting1DayIndex = daysOfWeek.indexOf(obj.detail.meeting_1);
        const meeting2DayIndex = daysOfWeek.indexOf(obj.detail.meeting_2);

        let selectedMeeting;

        if (currentDayOfWeek > meeting2DayIndex || (currentDayOfWeek === meeting2DayIndex && currentDate.getHours() >= 18)) {
            // If it's currently after meeting_2, select meeting_1
            selectedMeeting = obj.detail.meeting_1;
        } else if (
            currentDayOfWeek < meeting2DayIndex && (currentDayOfWeek > meeting1DayIndex || (currentDayOfWeek === meeting1DayIndex && currentDate.getHours() >= 18))
        ) {
            // If it's currently before meeting_2 and after or on meeting_1, select meeting_2
            selectedMeeting = obj.detail.meeting_2;
        } else {
            // If it's currently before both meetings, select the earlier one (meeting_1)
            selectedMeeting = obj.detail.meeting_1;
        }

        let parsedMessage = message
            .replace('{first_name}', obj.detail.firstName)
            .replace('{duty_name}', obj.detail.dutyName)
            .replace('{next_date}', selectedMeeting);

        return parsedMessage;
    }
}

customElements.define('send-options', SendOptions);