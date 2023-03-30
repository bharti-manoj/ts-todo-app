import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
    const fullList = FullList.instance;
    const template = ListTemplate.instance;

    const addItemForm = document.getElementById('itemEntryForm') as HTMLFormElement;
    addItemForm.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault();
        const input = document.getElementById('newItem') as HTMLInputElement;
        const itemContent: string = input.value.trim();
        input.value = '';
        if (!itemContent.length) return;

        const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;
        const newItem = new ListItem(itemId.toString(), itemContent);

        fullList.addItem(newItem);
        template.render(fullList);
    });

    const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement;
    clearItems.addEventListener('click', (): void => {
        fullList.clearList();
        template.clear();
    });

    fullList.load();
    template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
