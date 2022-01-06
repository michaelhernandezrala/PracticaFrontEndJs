import DataService from '../services/DataService.js';
import PubSub from '../services/PubSub.js';

export default class LoginController {
    constructor(DOMElement) {
        this.DOMElement = DOMElement;
        this.addEventsListeners();
    }

    addEventsListeners() {
        // Validate the form
        this.DOMElement.addEventListener('submit', async (e) => {
            e.preventDefault()
            // Check validity
            if (this.DOMElement.checkValidity()) {
                const data = new FormData(this.DOMElement);
                const username = data.get('username');
                const password = data.get('password');
                const url = new URLSearchParams(window.location.href);
                const next = url.get('next') || '/';
                try {
                    await DataService.authUser({ username, password });
                    location.href = next;
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error);
                }
            } else {
                PubSub.publish(PubSub.events.SHOW_ERROR, 'All the fiels must be filled')
            }
        });

        // Validate if all inputs are filled
        this.DOMElement.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                if (this.DOMElement.checkValidity()) {
                    this.DOMElement.querySelector('button').removeAttribute('disabled');
                } else {
                    this.DOMElement.querySelector('button').setAttribute('disabled', true);
                }
            })
        })
    }
}