type Route = {
	name: string;
	path: string;
	pathRegExp?: RegExp;
	isPrivate: boolean;
	generator?: (id: number) => string;
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
		generator: (id: number) => `/posts/${id}`,
	},
};
