import { writable } from 'svelte/store';

export const isOpen = writable(false);

export function openPopup() {
	isOpen.set(true);
}

export function closePopup() {
	isOpen.set(false);
}
