class Api {
    constructor(options) {
        this._options = options;
    }
    getProfile() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: this._options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => { console.log(err); });
    }

    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: this._options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addProfile(data) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    addCard(data) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    addLike(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._options.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
            .catch(err => console.log(err));
    }
    deleteLike(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._options.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
            .catch(err => console.log(err));
    }
    addAvatar(avatar) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: avatar.link
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
            .catch(err => console.log(err));
    }
    getUserAndCard() {
        const promises = [this.getProfile(), this.getInitialCards()];
        return Promise.all(promises);
    }
}
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
        authorization: '1eff360a-a05c-459a-b944-dc645f17e291',
        'Content-Type': 'application/json'
    }
});
export default api