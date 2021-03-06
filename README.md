# Проект Mesto
------------------------------------------------------------
## Проект создан для практики и закрепления базовых знаний JavaScript.
 
 В основе проекта содержится структурированный и семантически корректный код с использованием семантических тэгов **header, main, section, footer, template**.

 Код написан по правилам **методологии БЭМ**. Файлы и пути к файлам в проекте также организованы по **БЭМ Nested**.

 В проекте задействован **API**, что дает возможность странице взаимодействовать с сервером - как подтягивать из него, так и передавать назад данные.

 В проекте реализовано три модальных окна - *popup*. Одно из низ возникает при нажатии на кнопку *редактировать*.  Внутри модального окна присутствует форма с возможностью редактирования полей. Если в форму внесены изменения и нажата кнопка *сохранить*, то попап закрывается и внесенные изменения сохраняются в секции **profile**. 
 
 Второе окно всплывает при нажатии на кнопку *добавить*. У данного модального окна также имеется форма с возможность внесения названия и ссылки на картинку, в результате чего, после нажатия на кнопку *создать* на странице создается новый блок-карточка **elements_card** .
 
 Третье диалоговое окно возникает при нажатии на картинку в блоке-карточке **elements_card**  и демонстрирует фотография из карточки полностью. Под каждой картинкой имеется подпись, которая соответствует названию карточки. 
 
 Все формы обрабатывается через код JavaScript. *Popup* окна открытваются при нажатии и соответствующие кнопки и закрываются при нажатии на иконку *закрыть* за счёт добавления/удаления модификатора **popup__opened**. Код для открытия/закрытия попапов написан с использованием *стрелочной функции* в комбинации с *вызовом слушателя*. Написаны отдельные функции для возможности закрытия попапов кликом по *overlay* или путем нажатия клавиши *Esc*.
 
 Все модалные окна имеют код валидации форм (подключен отдельным файлом **FormValidator.js**, который создан отдельным классом). Кнопка-submit у форм становится активной только в случае валидности инпутов.
 
 Помимо всплывающих модальных окон в проекте путем написания кода на JavaScript реализованы карточки, появляющиеся на странице по умолчанию. Карточки создаются из указанного в коде массива **initialCards** и перебираются методом **forEach**. 
 
 Каждая карточка, включая созданную через форму добавления карточек, имеет кнопки *лайк* и *удалить*.
 
 
 При переполнении блоков-карточек в блоке **elements_card** и введении длинного текста пользователем в форме через диалоговое окно *popup*, реализовано многоточие в конце:

```css
.elements__card-name {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
```  


Для всех кнопок используется анимация - при наведении мыши кнопки становятся полупрозрачным. Для этого было использовано  свойство **opacity** c псевдоклассом **:hover**: 

```css
.elements__like:hover {
    opacity: 0.5;
}
``` 

Код написан под мобильное и десктопное разрешения экранов с минимальное шириной в 320px и максимальной - 1280px с использованием медиазапросов. Просмотр станицы возможен как на мобильных экранах, так и на широкоформатном дисплее. 

При построении секции *elements* c карточками был применён **grid layout**:

```css
.elements__list {
    display: grid;
    grid-template-columns: 1, 1fr;
    grid-template-rows: repeat(6, 361px);
    flex-wrap: wrap;
    row-gap: 20px;
}
@media screen and (min-width: 1280px) {
    .elements__list {
        column-gap: 17px;
        grid-template-columns: repeat(3, 282px);
        grid-template-rows: repeat(2, 362px);
    }
}
``` 

Одно из примечательных свойств - плавно открывающиеся и плавно закрывающиеся модальные окна - *popup*.
Для реализации данной задачи были применены свойства  **transition** в комбинации с  **opacity**, а ранее применённое к попапам свойства  **display: none** было заменено на  **visibility: hidden; + visibility: visible**;


```css

.popup {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 0.5s, opacity 0.5s linear;
}

.popup_opened {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
}
``` 

На странице есть возмодность изменения аватара пользователя кликом по текущему аватару. Принаведении мышки на текущий аватар появляется иконка редактирования, реализованная c помощью псевдоклассов **.profile__avatar-section::before** и 
**.profile__avatar-section:hover::before** 

Так как страница подключена к серверу и карточки всех пользователей подгружаются с сервера на страницу, для удобства управления собственными карточками создан метод в *классе Card* **_setDeleteButton** , с помощью которого иконка удаления настроена только для карточек текущего пользователя, на чужих карточках она отсутствует. Метод добавляет и удаляет класс *.elements__delete_visible*, в котором содержится свойства **visibility: visible;**

В *классе Card* реализован публичный метод **setLikesNumber**, который позволяет считать и отображать количество поставленных всем карточкам лайков.

При написании кода были задействованы **принципы ООП**. Созданы отдельные классы:
1. *класс Card*, который каждую создает карточку;
2. *класс FormValidator*, который настраивает валидацию форм.
3. *класс Popup*, который который отвечает за открытие и закрытие попапа.
4. *класс PopupWithForm*, который отвечает за эеземпляры формы редактирования профиля, формы создания карточки, а также формы изменения аватара пользователя.
5. *класс PopupWithImage*, который отвечает за открытие попапа с картинкой.
6. *класс PopupWithQuestion*, который отвечает за открытие попапа с переподтверждением об удалении карточки.
7. *класс Section*, который отвечает за отрисовку элементов на странице.
8. *класс UserInfo*, который отвечает за управление отображением информации о пользователе на странице.
9. *класс Api*, который отвечает за взаимодействие страницы с сервером

С проектом можно ознакомиться на GitHub Pages по ссылке: https://alina-kova.github.io/mesto
