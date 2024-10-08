export const select = () => {
    const toggleDropdown = (dropdown, isOpen) => {
        const btn = dropdown.querySelector('.dropdown__button');
        const list = dropdown.querySelector('.dropdown__list');
        btn.setAttribute('aria-expanded', isOpen);
        list.setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
            dropdown.classList.add('visible');
            btn.classList.add('active');
        } else {
            dropdown.classList.remove('visible');
            btn.classList.remove('active');
        }
    };

    const setupDropdown = dropdown => {
        const dropdownBtn = dropdown.querySelector('.dropdown__button');
        const dropdownList = dropdown.querySelector('.dropdown__list');
        const dropdownItems = dropdownList.querySelectorAll('.dropdown__list-item');
        const dropdownInput = dropdown.querySelector('.dropdown__input');

        // Установка ARIA атрибутов
        dropdown.setAttribute('role', 'listbox');
        dropdownItems.forEach(item => item.setAttribute('role', 'option'));

        dropdownBtn.addEventListener('click', () => {
            const isOpen = dropdownBtn.getAttribute('aria-expanded') === 'true';
            toggleDropdown(dropdown, !isOpen);
        });

        dropdownList.addEventListener('click', e => {
            if (e.target.classList.contains('dropdown__list-item')) {
                const selectedItem = e.target;
                dropdownItems.forEach(item => {
                    item.removeAttribute('aria-checked');
                });
                selectedItem.setAttribute('aria-checked', 'true');
                dropdownBtn.innerHTML = selectedItem.innerHTML;
                dropdownInput.value = selectedItem.dataset.value;
                toggleDropdown(dropdown, false);
                dropdownInput.dispatchEvent(new Event('change'));
            }
        });
    };

    const closeAllDropdownsOnClickOutside = e => {
        document.querySelectorAll('.dropdown.visible').forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                toggleDropdown(dropdown, false);
            }
        });
    };

    const closeAllDropdownsOnEscape = e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown.visible').forEach(dropdown => {
                toggleDropdown(dropdown, false);
            });
        }
    };

    // Инициализация
    document.querySelectorAll('.dropdown').forEach(setupDropdown);
    document.addEventListener('click', closeAllDropdownsOnClickOutside);
    document.addEventListener('keydown', closeAllDropdownsOnEscape);
};
