import { Dispatch, SetStateAction, RefObject} from 'react';

function formatDate(date: Date, options: Intl.DateTimeFormatOptions): string {
    return date.toLocaleDateString('en-GB', options);
  }

  function calculateAverage(array: number[] | undefined) {
    if(!array) return 0;
    const sum = array.reduce((acc, curr) => acc + curr, 0);
    const average = sum / array.length;
    return Number(average.toFixed(1));
    }

const handleHeaderScroll = (
    hasBackground: boolean, 
    setHasBackground: Dispatch<SetStateAction<boolean>>,
    header: RefObject<HTMLDivElement>
) => {
    if (header.current) {
        const headerHeight = header.current.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition > headerHeight && !hasBackground) {
            setHasBackground(true);
        } else if (scrollPosition < headerHeight && hasBackground) {
            setHasBackground(false);
        }
    }
}

export { handleHeaderScroll, formatDate, calculateAverage }