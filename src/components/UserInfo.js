class UserInfo {
    constructor({ id, userName, aboutUser, userAvatar }) {
        this._id = id;
        this._userName = document.querySelector(userName);
        this._aboutUser = document.querySelector(aboutUser);
        this._userAvatar = document.querySelector(userAvatar);
    }

    //метод, возвращающий данные пользователя в форму
    getUserInfo() {
        const info = {
            _id: this._id,
            name: this._userName.textContent,
            about: this._aboutUser.textContent,
            avatar: this._userAvatar.src
        };
        return info;
    }

    //метод, который принимает и добавляет данные пользователя в форму
    setUserInfo(id, name, about, avatar) {
        this._id = id;
        this._userName.textContent = name;
        this._aboutUser.textContent = about;
        this._userAvatar.src = avatar
    }

};

export default UserInfo;