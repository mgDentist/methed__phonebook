import data from './initial-data.js';
import { renderPhoneBook, renderContacts } from './renders.js';
import { getStorage } from './data-managers.js';
import * as handlers from './event-handlers.js';
import { setStorage, removeStorage } from './data-managers.js';

const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const storedContacts = getStorage('contacts');
    if (storedContacts.length === 0) {
        data.forEach(contact => setStorage('contacts', contact));
    }

    const dataToRender = getStorage('contacts');

    const { list, logo, btnAdd, formOverlay, form, btnDel } = renderPhoneBook(app, title);

    const allRow = renderContacts(list, dataToRender);

    const { closeModal } = handlers.modalControl(btnAdd, formOverlay);

    handlers.hoverRow(allRow, logo);
    handlers.deleteControl(btnDel, list);
    handlers.formControl(form, list, closeModal, setStorage, removeStorage);
};

window.phoneBookInit = init;

init('#app', 'Максим');