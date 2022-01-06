'use strict';

import DataService from "../services/DataService.js";
import PubSub from "../services/PubSub.js";
import { advertView } from "../view.js";

export default class AdvertListController {
    constructor(DOMElement) {
        this.DOMElement = DOMElement;
    }

    async renderAdverts() {
        try {
            PubSub.publish(PubSub.events.SHOW_LOADING)
            const adverts = await DataService.getAdverts();
            PubSub.publish(PubSub.events.HIDE_LOADING)
            for (const advert of adverts) {
                const advertElement = document.createElement('article');
                advertElement.innerHTML = advertView(advert);
                this.DOMElement.appendChild(advertElement)
            }
        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error);
        }
    }
}