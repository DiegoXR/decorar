// src/stores/divStore.ts
import { writable } from 'svelte/store';


export function createDivStore() {
    
    const { subscribe, set, update } = writable<HTMLDivElement | null>(null);

    function initialize(text: string = 'Initial text'): void {
        const div: HTMLDivElement = document.createElement('div');
        div.textContent = text;
        document.body.appendChild(div);

        set(div);
    }

    function updateText(newText: string): void {
        update(div => {
            if (div) {
                div.textContent = newText;
            }
            return div;
        });
    }

    // Immediately initialize the store with a div element upon creation
    initialize();

    return {
        subscribe,
        updateText,
    };
}

// export const divStore = createDivStore();
