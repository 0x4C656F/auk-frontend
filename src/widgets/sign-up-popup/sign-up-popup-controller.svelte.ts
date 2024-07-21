const createSignUpPopup = () => {
	let isOpen = $state(false);

	const toggle = () => {
		isOpen = !isOpen;
	};

	return {
		get isOpen() {
			return isOpen;
		},
		toggle
	};
};
export const signUpPopupController = createSignUpPopup();
