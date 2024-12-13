type Route = {
	name: string;
	path: string;
	pathRegExp?: RegExp;
	isPrivate: boolean;
	generator?: <T>(param: T) => string;
};

export const PAGE_ROUTES: Record<string, Route> = {
	main: { path: '/', name: '', isPrivate: true },
	login: { path: '/log-in', name: 'Log in', isPrivate: false },
	signup: { path: '/create-account', name: 'Sign up', isPrivate: false },
	profile: { path: '/profile', name: 'Profile', isPrivate: true },
	post_detail: {
		name: 'A post detail',
		path: '/posts/:id',
		pathRegExp: /(\/posts){1}\/\d+/,
		isPrivate: true,
		generator: (id) => `/posts/${id}`,
	},
	search: {
		name: 'Search',
		path: '/search',
		isPrivate: true,
	},
	users_detail: {
		name: 'A user detail',
		path: '/users/:username',
		pathRegExp: /(\/users){1}\/\w/,
		isPrivate: true,
		generator: (username) => `/users/${username}`,
	},
	users_detail_edit: {
		name: `Edit specify user's profile`,
		path: 'users/:username/edit',
		pathRegExp: /(\/users){1}\/\w\/edit/,
		isPrivate: true,
		generator: (username) => `/users/${username}/edit`,
	},
};
