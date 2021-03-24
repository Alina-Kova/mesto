class UserInfo {
    constructor(userName, aboutUser){
        this._userName = document.querySelector(userName);
        this._aboutUser = document.querySelector(aboutUser);
    }

//метод, возвращающий данные пользователя в форму
    getUserInfo() {
        const info = {
            name: this._userName.textContent,
            about: this._aboutUser.textContent
        };
        return info;
    }

//метод, который принимает и добавляет данные пользователя в форму
    setUserInfo(name, about) {
        this._userName.textContent = name;
        this._aboutUser.textContent = about;
    }
};

export default UserInfo;
