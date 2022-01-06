'use strict';

import DataService from "../services/DataService.js";
import { advertDetailView } from "../view.js";
import PubSub from "../services/PubSub.js";

export default class AdvertDetailController {

    constructor(DOMElement, advertID) {
        this.DOMElement = DOMElement;
        this.loadAdvert(advertID)
    }

    async loadAdvert(advertID) {
        try {
            PubSub.publish(PubSub.events.SHOW_LOADING)
            const advert = await DataService.getAdvertDetail(advertID);
            PubSub.publish(PubSub.events.HIDE_LOADING)
            this.DOMElement.innerHTML = advertDetailView(advert);
            this.addDeleteButtonEventListener(advert);
        } catch (error) {
            console.log(error)
        }
    }

    addDeleteButtonEventListener(advert) {
        const button = this.DOMElement.querySelector('button');
        if(button) {
            button.addEventListener('click', async (e) => {
                console.log('click')
                const answer = confirm('Are you sure you want to delete the advert?');
                if(answer === true) {
                    button.setAttribute('disabled', 'disabled');
                    try {
                        await DataService.deleteAdvert(advert.id);
                        window.location.href = '/'
                    } catch (error) {
                        button.removeAttribute('disabled') 
                    }
                }
            }, true)
        }
    }
}