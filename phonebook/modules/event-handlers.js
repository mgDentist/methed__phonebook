import { addContactPage} from "./renders.js"; 
import { addContactData, removeStorage } from "./data-managers.js";

export const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
        contact.addEventListener('mouseenter', () => {
            logo.textContent = contact.phoneLink.textContent;
        });
    });

    allRow.forEach(contact => {
        contact.addEventListener('mouseleave', () => {
            logo.textContent = text;
        });
    });
};

export const modalControl = (btnAdd, formOverlay) => {
    const closeBtn = document.querySelector('.close');

    const openModal = () => {
        formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', e => {
        const target = e.target;
        if (target === formOverlay || target === closeBtn) {
            closeModal();
        }
    });

    return {
        closeModal,
    };
};

export const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
        document.querySelectorAll('.delete').forEach(del => {
            del.classList.toggle('is-visible');
        });
    });

    list.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('.del-icon')) {
            const contactRow = target.closest('.contact');
            const phone = contactRow.querySelector('a').textContent;
            removeStorage(phone);
            contactRow.remove();
        }
    });
};

export const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newContact = Object.fromEntries(formData);
        addContactPage(newContact, list);
        addContactData(newContact);
        form.reset();
        closeModal();
    });
};