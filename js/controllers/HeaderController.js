import DataService from "../services/DataService.js";
import { LoggedButtons, notLoggedButtons } from "../view.js";

export default class HeaderController {
    constructor(DOMElement, isAuthorized) {
        this.DOMElement = DOMElement;
        this.isAuthorized = isAuthorized;
    }

    showButtons() {
        if(!this.isAuthorized) {
            this.DOMElement.innerHTML = notLoggedButtons();
        } else {
            this.DOMElement.innerHTML = LoggedButtons();
            this.addEventsListeners();
        }
    }

    addEventsListeners() {
        const logoutButton = document.querySelector('.logout');
        logoutButton.addEventListener('click', e => {
            e.preventDefault();
            DataService.removeAuth();
            location.href = '/';
        })
    }
}