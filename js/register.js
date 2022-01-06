'use strict';

import MessageController from "./controllers/MessageController.js";
import RegisterController from "./controllers/RegisterController.js";

window.addEventListener('DOMContentLoaded', () => {
    const FormElement = document.querySelector('.auth__form')
    new RegisterController(FormElement);

    const MessageElement = document.querySelector('.control-message');
    new MessageController(MessageElement);
})