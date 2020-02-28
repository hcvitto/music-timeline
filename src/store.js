// import { writable } from 'svelte/store';

const myStore = {
    history: [
        {
            id: 3015298,
            date: "1045",
            description: "Description",
            pos: 1045,
            title: "Guido d'Arezzo inventa le note",
        },
        {
            id: 543565,
            date: "ca  1400",
            description: "Description",
            pos: 1400,
            title: "Qualcuno inventa il rigo musicale",
        }
    ]
};

import { writable } from 'svelte/store';

const createWritableStore = (key, startValue) => {
    const { subscribe, set } = writable(startValue);

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const json = localStorage.getItem(key);
            if (json) {
                set(JSON.parse(json));
            }

            subscribe(current => {
                localStorage.setItem(key, JSON.stringify(current));
            });
        }
    };
}

export const store = createWritableStore('recordStore', myStore);