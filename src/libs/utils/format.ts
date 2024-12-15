export function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();

	return `${year}.${addZero(month)}.${addZero(day)} ${addZero(hour)}:${addZero(minute)}`;
}

function addZero(data: string | number) {
	const targetData = typeof data === 'number' ? `${data}` : data;

	return targetData.padStart(2, '0');
}
