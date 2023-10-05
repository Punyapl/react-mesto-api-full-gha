export default class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _handleResponse(response, errorMessage) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Ошибка: ${response.status}. Текст ошибки: ${errorMessage}`),
    );
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: "GET",
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о пользователе не были успешно получены",
      );
    });
  }

  updateUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о пользователе не были успешно обновлены на сервере",
      );
    });
  }

  getCardList() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "GET",
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о списке карт не были успешно получены",
      );
    });
  }

  sentCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные добавленной карты не были успешно получены сервером",
      );
    });
  }

  setLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: "PUT",
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о добавлении лайка карточке от попользователе не были успешно обновлены на сервере",
      );
    });
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: "DELETE",
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные об удалении лайка карточке от попользователе не были успешно обновлены на сервере",
      );
    });
  }

  changeLikeStatus(cardId, isLiked) {
    if (isLiked) {
      return this.setLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }

  updateAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((response) => {
      return this._handleResponse(
        response,
        "Фото аватара не было успешно обновлено на сервере",
      );
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    }).then((response) => {
      return this._handleResponse(
        response,
        "Данные о карточке попользователе не были успешно удалены на сервере",
      );
    });
  }
}

export const api = new Api({
  baseUrl: "https://api.mesto-punyapl.nomoredomainsrocks.ru",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});
