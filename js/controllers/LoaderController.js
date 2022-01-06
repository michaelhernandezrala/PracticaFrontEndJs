
import PubSub from "../services/PubSub.js";
import { loaderView } from "../view.js";

export default class LoaderController {

    constructor(DOMElement) {
        this.DOMElement = DOMElement
        this.DOMElement.innerHTML = loaderView();
        PubSub.subscribe(PubSub.events.SHOW_LOADING, () => {
            this.showLoader()
        })
        PubSub.subscribe(PubSub.events.HIDE_LOADING, () => {
            this.hideLoader()
        })
    }

    hideLoader() {
        this.DOMElement.style.display = 'none'
    }

    showLoader() {
        this.DOMElement.style.display = 'initial'
    }

}
