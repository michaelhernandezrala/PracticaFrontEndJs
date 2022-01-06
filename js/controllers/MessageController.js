'use strict';

import PubSub from "../services/PubSub.js";
import {errorView} from "../view.js";

export default class MessageController {
    constructor(DOMElement) {
        this.DOMElement = DOMElement;
        PubSub.subscribe(PubSub.events.SHOW_ERROR, message => {
            this.showError(message);
        })
    }

    showError(message) {
        this.DOMElement.innerHTML = errorView(message);
    }
}