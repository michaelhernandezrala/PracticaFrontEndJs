'use strict';

import HeaderController from "./controllers/HeaderController.js";
import DataService from "./services/DataService.js";

window.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.querySelector('.header__buttons');
    const isAuthorized = DataService.isAuthenticed();
    const headerController = new HeaderController(headerElement, isAuthorized);
    headerController.showButtons();
})

