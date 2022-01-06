'use strict';

import MessageController from "./controllers/MessageController.js";
import LoginController from "./controllers/LoginController.js";

window.addEventListener('DOMContentLoaded', () => {
    const FormElement = document.querySelector('.auth__form')
    new LoginController(FormElement);

    const MessageElement = document.querySelector('.control-message');
    new MessageController(MessageElement);
})