'use strict';

import NewAdvertController from "./controllers/NewAdvertController.js";
import MessageController from "./controllers/MessageController.js"

window.addEventListener('DOMContentLoaded', () => {

    const FormElement = document.querySelector('.new-ad__form');
    new NewAdvertController(FormElement);

    const MessageElement = document.querySelector('.control-message');
    new MessageController(MessageElement);
})