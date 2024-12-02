export const USERNAME_VALIDATION = {
	required: 'Username is required.',
	min: {
		value: 5,
		message: 'Username should be at least 5 characters.',
	},
	unique: 'This username is already taken. Please try other one.',
};

export const EMAIL_VALIDATION = {
	required: 'Email address is required.',
	format: 'Invalid email format.',
	unique: 'There is an account registered with this email.',
};

const PASSWORD_REGEXP = /([a-zA-Z]*\d+)/;
export const PASSWORD_VALIDATION = {
	required: 'Password is required.',
	min: {
		value: 8,
		message: 'Password should be at least 8 characters.',
	},
	regexp: {
		value: PASSWORD_REGEXP,
		message: 'Password should contain at least one number.',
	},
	confirm: {
		empty: 'Confirmd password is required.',
		not_match: 'Passwords must be same.',
	},
};
