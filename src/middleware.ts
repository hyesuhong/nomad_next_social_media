import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { PAGE_ROUTES } from './libs/constants/routes';
import { getSession } from './libs/utils/session';

export async function middleware(request: NextRequest) {
	const session = await getSession();

	const routeInfo = Object.values(PAGE_ROUTES).find(
		(route) => route.path === request.nextUrl.pathname
	);

	if (!routeInfo) {
		return notFound();
	}

	if (!session.id) {
		if (routeInfo.isPrivate) {
			return NextResponse.redirect(
				new URL(PAGE_ROUTES.login.path, request.url)
			);
		}
	} else {
		if (!routeInfo.isPrivate) {
			return NextResponse.redirect(new URL(PAGE_ROUTES.main.path, request.url));
		}
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
