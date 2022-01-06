'use strict';

import AdvertListController from "./controllers/AdvertListController.js";
import LoaderController from "./controllers/LoaderController.js";
import MessageController from "./controllers/MessageController.js";

window.addEventListener('DOMContentLoaded', () => {
    const advertListElement = document.querySelector('.home__main--ads');
    const advertListController = new AdvertListController(advertListElement);
    advertListController.renderAdverts();

    const MessageElement = document.querySelector('.control-message');
    new MessageController(MessageElement);

    const loaderElement = document.querySelector('.loader');
    new LoaderController(loaderElement);
})