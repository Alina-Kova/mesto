class Api {
    constructor() {
    }
    getPersonalInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
            method: 'GET',
            headers: {
                authorization: '06cbf485-9ed1-4992-a1f8-a932823be70b',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
            method: 'GET',
            headers: {
                authorization: '06cbf485-9ed1-4992-a1f8-a932823be70b'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    showUserInfo(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '06cbf485-9ed1-4992-a1f8-a932823be70b',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    addNewCard(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
            method: 'POST',
            headers: {
                authorization: '06cbf485-9ed1-4992-a1f8-a932823be70b',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link: data.link,
                name: data.name
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    showLikesNumber(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-21/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: '06cbf485-9ed1-4992-a1f8-a932823be70b',
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-21/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '06cbf485-9ed1-4992-a1f8-a932823be70b',
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    unlikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-21/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: '06cbf485-9ed1-4992-a1f8-a932823be70b',
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    editAvatar(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '06cbf485-9ed1-4992-a1f8-a932823be70b',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}

export default Api;