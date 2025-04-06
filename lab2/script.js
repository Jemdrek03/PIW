'use strict';

// Pobieramy wszystkie potrzebne elementy DOM
const taskInput = document.getElementById('taskInput');
const taskDesc = document.getElementById('taskDesc');
const prioritySelect = document.getElementById('prioritySelect');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const incompleteOnlyCheckbox = document.getElementById('incompleteOnly');
const sortSelect = document.getElementById('sortSelect');
const toggleCaseBtn = document.getElementById('toggleCase');
let caseSensitive = false;

toggleCaseBtn.addEventListener('click', () => {
    caseSensitive = !caseSensitive;
    toggleCaseBtn.innerHTML = caseSensitive ? '🔠 Case-sensitive' : '🔡 Case-insensitive';
    renderTasks();
});


// Obsługa filtrów i sortowania
incompleteOnlyCheckbox.addEventListener('change', renderTasks);
sortSelect.addEventListener('change', renderTasks);
filterSelect.addEventListener('change', renderTasks);
searchInput.addEventListener('input', renderTasks);

// Cofanie ostatniego usunięcia (Ctrl+Z)
let deletedTask = null;
let taskToDelete = null;

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'z' && deletedTask) {
        taskList.appendChild(deletedTask);
        deletedTask = null;
    }
});

// Potwierdzenie usunięcia zadania przez modal
document.getElementById('confirmDelete').addEventListener('click', () => {
    if (taskToDelete) {
        deletedTask = taskToDelete;
        taskToDelete.remove();
        taskToDelete = null;
        bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();
    }
});

// Dodawanie nowego zadania
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const title = taskInput.value.trim();
    const desc = taskDesc.value.trim();
    const priority = prioritySelect.value;

    if (!title) return; // Nie dodajemy pustego tytułu

    // Tworzymy nowy kafelek zadania
    const card = document.createElement('div');
    card.dataset.createdAt = Date.now(); // Data dodania (timestamp)
    card.className = `task-card ${priority}`;
    card.dataset.priority = priority;
    card.dataset.text = title + ' ' + desc; // Do wyszukiwania

    // Przycisk do usuwania
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn-close';
    closeBtn.setAttribute('aria-label', 'Usuń');
    closeBtn.addEventListener('click', () => {
        taskToDelete = card;
        document.getElementById('modalTaskText').textContent = `Czy na pewno chcesz usunąć zadanie: "${title}"?`;
        new bootstrap.Modal(document.getElementById('confirmModal')).show();
    });

    // Tytuł zadania
    const titleEl = document.createElement('div');
    titleEl.className = 'task-title';
    titleEl.textContent = title;

    // Loader (kółko) – widoczny tylko przy zaznaczeniu
    const loader = document.createElement('span');
    loader.className = 'loader-icon';
    loader.style.display = 'none';

    //  Ikona checka – pokazuje się po loaderze
    const checkIcon = document.createElement('span');
    checkIcon.className = 'check-icon';
    checkIcon.innerHTML = '✔️';
    checkIcon.style.display = 'none';

    // Loader i check przed tytułem
    titleEl.prepend(checkIcon);
    titleEl.prepend(loader);


    // Ikona przed tytułem
    titleEl.prepend(checkIcon);


    // Zaznaczanie jako wykonane przez kliknięcie
    titleEl.addEventListener('click', () => {
        card.classList.toggle('completed');

        const desc = card.querySelector('.task-desc');
        const check = titleEl.querySelector('.check-icon');
        const loader = titleEl.querySelector('.loader-icon');

        if (desc) {
            desc.classList.toggle('completed-text');
        }

        if (card.classList.contains('completed')) {
            // Pokaż loader
            loader.style.display = 'inline-block';
            check.style.display = 'none';

            //  Po sekundzie zamień na checka
            setTimeout(() => {
                loader.style.display = 'none';
                check.style.display = 'inline-block';
                check.classList.add('show-check');
            }, 1000);

            const date = new Date().toLocaleString();
            const doneInfo = document.createElement('div');
            doneInfo.className = 'done-info';
            doneInfo.textContent = `Zrobione: ${date}`;
            card.appendChild(doneInfo);
        } else {
            loader.style.display = 'none';
            check.style.display = 'none';
            check.classList.remove('show-check');
            card.querySelector('.done-info')?.remove();
        }
    });




    // Opis zadania
    const descEl = document.createElement('div');
    descEl.className = 'task-desc';
    descEl.textContent = desc;

    // Składamy kafelek
    card.appendChild(closeBtn);
    card.appendChild(titleEl);
    if (desc) card.appendChild(descEl);
    taskList.appendChild(card);

    // Reset formularza
    taskInput.value = '';
    taskDesc.value = '';
}

// Odświeżenie listy po filtrach, sortowaniu, wyszukiwaniu
function renderTasks() {
    const filter = filterSelect.value;                        // Priorytet (filtr)
    const searchRaw = searchInput.value;
    const search = caseSensitive ? searchRaw : searchRaw.toLowerCase();

    const onlyIncomplete = incompleteOnlyCheckbox.checked;    // Tylko niewykonane
    const sortType = sortSelect.value;                        // Wybrany sposób sortowania

    let tasks = [...taskList.children];

    // Filtrowanie
    tasks = tasks.filter(task => {
        const priority = task.dataset.priority;
        const text = task.dataset.text;
        const isCompleted = task.classList.contains('completed');

        const matchesPriority = filter === 'all' || filter === priority;
        let matchesSearch = true;
        if (search !== '') {
            matchesSearch = caseSensitive
                ? text.includes(search)
                : text.toLowerCase().includes(search.toLowerCase());
        }

        const matchesCompletion = !onlyIncomplete || !isCompleted;

        return matchesPriority && matchesSearch && matchesCompletion;
    });

    //  Sortowanie według wybranej opcji
    tasks.sort((a, b) => {
        const priorityOrder = { urgent: 3, important: 2, normal: 1 };

        if (sortType === 'priorityHigh') {
            return priorityOrder[b.dataset.priority] - priorityOrder[a.dataset.priority]; // Pilne > Ważne > Normalne
        }
        if (sortType === 'priorityLow') {
            return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority]; // Normalne > ...
        }
        if (sortType === 'dateNewest') {
            return b.dataset.createdAt - a.dataset.createdAt;
        }
        if (sortType === 'dateOldest') {
            return a.dataset.createdAt - b.dataset.createdAt;
        }
        return 0;
    });

    const allTasks = [...taskList.children];

    allTasks.forEach(task => {
        const priority = task.dataset.priority;
        const titleEl = task.querySelector('.task-title');
        const descEl = task.querySelector('.task-desc');
        const text = `${titleEl?.textContent || ''} ${descEl?.textContent || ''}`;

        const isCompleted = task.classList.contains('completed');

        const matchesPriority = filter === 'all' || filter === priority;

        let matchesSearch = true;
        if (search !== '') {
            matchesSearch = caseSensitive
                ? text.includes(search)
                : text.toLowerCase().includes(search.toLowerCase());
        }

        const matchesCompletion = !onlyIncomplete || !isCompleted;

        task.style.display = (matchesPriority && matchesSearch && matchesCompletion) ? '' : 'none';
    });


    // Sortowanie tylko widocznych zadań (opcjonalnie — dla efektu wizualnego)
    const visibleTasks = [...taskList.children].filter(task => task.style.display !== 'none');

    visibleTasks.sort((a, b) => {
        const priorityOrder = { urgent: 3, important: 2, normal: 1 };

        if (sortType === 'priorityHigh') {
            return priorityOrder[b.dataset.priority] - priorityOrder[a.dataset.priority];
        }
        if (sortType === 'priorityLow') {
            return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
        }
        if (sortType === 'dateNewest') {
            return b.dataset.createdAt - a.dataset.createdAt;
        }
        if (sortType === 'dateOldest') {
            return a.dataset.createdAt - b.dataset.createdAt;
        }
        return 0;
    });

// Przenoszenie tylko widocznych zadań w posortowanej kolejności
    visibleTasks.forEach(task => taskList.appendChild(task));

}

// Ustawienie domyślnego sortowania po załadowaniu strony
window.addEventListener('DOMContentLoaded', () => {
    sortSelect.value = 'dateNewest';
    renderTasks();
});
