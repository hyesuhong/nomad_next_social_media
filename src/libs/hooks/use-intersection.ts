import { useCallback, useEffect, useMemo, useRef } from 'react';

export type IntersectionHandler = (
	entries: IntersectionObserverEntry[],
	observer: IntersectionObserver
) => void;

type marginType = number | string;

/// number => px, string => px or %
export type IntersectionMargin =
	| [marginType]
	| [marginType, marginType]
	| [marginType, marginType, marginType]
	| [marginType, marginType, marginType, marginType];

export interface IntersectionOption {
	root?: HTMLElement;
	rootMargin?: IntersectionMargin;
	thresholds?: number | number[]; // 0 ~ 1
}

export interface IUseIntersection extends IntersectionOption {
	callbackIntersection: IntersectionHandler;
}

export const useIntersection = <T extends HTMLElement>({
	root,
	rootMargin,
	thresholds,
	callbackIntersection,
}: IUseIntersection) => {
	const ref = useRef<T>(null);
	const marginString = rootMargin ? getIntersectionMargin(rootMargin) : '0px';
	const intersectionOpt = useMemo(
		() => ({
			root: root || null,
			rootMargin: marginString,
			threshold: thresholds || 0,
		}),
		[marginString, root, thresholds]
	);

	const intersectionHandler = useCallback(callbackIntersection, [
		callbackIntersection,
	]);

	useEffect(() => {
		const observer = !ref.current
			? undefined
			: new IntersectionObserver(intersectionHandler, intersectionOpt);

		if (observer && ref.current) observer.observe(ref.current);

		return () => {
			observer?.disconnect();
		};
	}, [ref, intersectionHandler, intersectionOpt]);
	return ref;
};

const getIntersectionMargin = (marginOption: IntersectionMargin) => {
	const setMarginAllString = marginOption.map((margin) =>
		typeof margin === 'number' ? `${margin}px` : margin
	);

	return setMarginAllString.join(' ');
};
