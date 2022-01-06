export default {

    request: async function(method, url, body) {
        const requestConfig = {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        if (this.isAuthenticed()) {
            const token = localStorage.getItem('AUTH_TOKEN')
            // requestConfig.headers.Authorization = `Bearer ${token}`
            requestConfig.headers['Authorization'] = `Bearer ${token}`
            console.log('Autenticado')
        }
        const response = await fetch(url, requestConfig)
        try {
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            throw error
        }
    },

    delete: async function(url, body={}) {
        return await this.request('DELETE', url, body)
    },

    post: async function(url, body) {
        return await this.request('POST', url, body)
    },

    put: async function(url, body) {
        return await this.request('PUT', url, body)
    },

    parseAdvert: function(advert) {
        advert.date = advert.date || advert.updatedAt
        advert.author = advert.user.username
        advert.canBeDeleted = advert.userId === this.getAuthUserId()
        return advert
    },

    registerUser: async function(credentials) {
        const url = 'http://localhost:8000/auth/register'
        return await this.post(url, credentials);
    },

    authUser: async function(credentials) {
        const url = 'http://localhost:8000/auth/login'
        const data = await this.post(url, credentials)
        const token = data.accessToken
        localStorage.setItem('AUTH_TOKEN', token)
    },

    getAdverts: async function() {
        const url = 'http://localhost:8000/api/adverts?_expand=user'
        const response = await fetch(url)
        if (response.ok) {
            const adverts = await response.json()
            return adverts.map(advert => this.parseAdvert(advert))
        } else {
            throw new Error('Error al recuperar los tweets')
        }
    },

    createAdvert: async function(credentials) {
        const url = 'http://localhost:8000/api/adverts'
        return await this.post(url, credentials)
    },

    deleteAdvert: async function(advertID) {
        const url = `http://localhost:8000/api/adverts/${advertID}`
        return await this.delete(url)
    },

    isAuthenticed: function() {
        return localStorage.getItem('AUTH_TOKEN') !== null;
    },

    getAdvertDetail: async function(advertID) {
        const url = `http://localhost:8000/api/adverts/${advertID}?_expand=user`;
        const response = await fetch(url);
        if (response.ok) {
            const advert = await response.json();
            return this.parseAdvert(advert);
        } else {
            if (response.status === 404) {
                return null;
            } else {
                throw new Error('Error loading the advert');
            }
        }
    },

    getAuthUserId: function() {
        const token = localStorage.getItem('AUTH_TOKEN')
        if (token === null) {
            return null
        }
        const b64Parts = token.split('.')
        if (b64Parts.length !== 3) {
            return null
        }
        const b64Data = b64Parts[1]
        try {
            const userJSON = atob(b64Data)
            const user = JSON.parse(userJSON)
            return user.userId
        } catch (error) {
            console.error('Error while decoding JWT Token', error)
            return null
        }
    },

    removeAuth: function() {
        localStorage.removeItem('AUTH_TOKEN');
    }
}