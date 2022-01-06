'use strict';

import DataService from "../services/DataService.js";
import PubSub from "../services/PubSub.js";

export default class NewAdvertController {
    constructor(DOMElement) {
        this.DOMElement = DOMElement;
        this.addEventsListeners();
    }

    addEventsListeners() {

        this.DOMElement.addEventListener('submit', async (e) => {
            e.preventDefault();

            const select = this.DOMElement.querySelector('select');
            if (this.DOMElement.checkValidity() && select.value !== '#') {
                const data = new FormData(this.DOMElement);
                const image = data.get('photo');
                const title = data.get('title');
                const description = data.get('description');
                const price = data.get('price');
                const type = data.get('type');

                const advert = {
                    title: title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'), 
                    description: description.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'),
                    price,
                    type
                }

                if (image) {
                    advert.image = image.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                }
                await DataService.createAdvert(advert);
                location.href = '/'
            } else {
                PubSub.publish(PubSub.events.SHOW_ERROR, 'All fields have to be filled except the photo');
            }
        });
    }
}