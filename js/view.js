

export function errorView(message) {
    return `<p>${message}</p>`
}

export function advertView(advert) {
    let src = '';
    if(advert.image) {
        src = advert.image;
    } 

    let isMine = '';
    if (advert.canBeDeleted) {
        isMine = '<p class="createdByMe">Created by me</p>'
    }
    const date = new Date(advert.date);
    const dateFormat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return `
    <a href="./detail.html?id=${advert.id}">
    <article class="ad">
    <img src=${src}/> 
    <div class="ad__info">
        <h1 class="ad__info--title">${advert.title}</h1>
        <p class="ad__info--description">${advert.description}</p>
        <p class="ad__info--price"><strong>Price: </strong>${advert.price} €</p>
        <p class="ad__info--category"><strong>Type: </strong>${advert.type}</p>
        <p class="ad__info--published"><strong>Published: </strong>${dateFormat}</p>
    </div>
    ${isMine}
    </article></a>`
}

export function advertDetailView(advert) {
    if (advert == null) {
        return '<h1 class="not_found">404 Not found</h1>'
    }
    const date = new Date(advert.date);
    const dateFormat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    let button = '';
    if (advert.canBeDeleted) {
        button = '<button class="button_delete">Delete</button>'
    }
    return `
        <div class="ad">
        <img src=${advert.image}/>        
        <div class="ad__info">
            <h1 class="ad__info--title">${advert.title}</h1>
            <p class="ad__info--description">${advert.description}</p>
            <p class="ad__info--price"><strong>Price:</strong> ${advert.price} €</p>
            <p class="ad__info--category"><strong>Type:</strong> ${advert.type}</p>
            <p class="ad__info--published"><strong>Date:</strong> ${dateFormat}</p>
        </div>
        ${button}
        </div>`
}

export function notLoggedButtons() {
    return `
    <a href="./login.html">Login</a>
    <a href="./register.html">Sign up</a>
    `
}

export function LoggedButtons() {
    return `
    <a href="./newAd.html">New Advert</a>
    <a class='logout' href="./">Log out</a>
    `
}

export function loaderView() {
    return '<div class="lds-circle"><div></div></div>'
}