'use strict';

import MessageController from '../js/controllers/MessageController.js';
import AdvertDetailController from '../js/controllers/AdvertDetailController.js';

window.addEventListener('DOMContentLoaded', () => {

    const messageElement = document.querySelector('.messages');
    new MessageController(messageElement);

    const id = new URLSearchParams(window.location.search).get('id');

    const advertsElement = document.querySelector('.detail__main--info');
    new AdvertDetailController(advertsElement, id);
})