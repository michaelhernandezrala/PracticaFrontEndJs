import DataService from '../services/DataService.js';
import PubSub from '../services/PubSub.js';

export default class RegisterController {
    constructor(DOMElement) {
        this.DOMElement = DOMElement;
        this.addEventsListeners();
    }

    // Check if all password are equal
    checkIfAllPasswordsAreEqual() {
        const passwords = this.DOMElement.querySelectorAll('input[type="password"]');
        const equalPasswords = [];

        for (const password of passwords) {
            if (equalPasswords.includes(password.value) === false) {
                equalPasswords.push(password.value);
            }
        }

        if (equalPasswords.length === 1) {
            for (const password of passwords) {
                password.setCustomValidity('');
            }
        } else {
            for (const password of passwords) {
                password.setCustomValidity('The passwords are not equal');
            }
        }
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

                try {
                    await DataService.registerUser({ username, password });
                    location.href = '/login.html';
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error);
                }
            } else {
                PubSub.publish(PubSub.events.SHOW_ERROR, 'All the fiels must be filled')
            }
        });

        // Validate if all passwords al equal
        this.DOMElement.querySelectorAll('input[type="password"]').forEach(input => {
            input.addEventListener('input', () => {
                this.checkIfAllPasswordsAreEqual();
            })
        })

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