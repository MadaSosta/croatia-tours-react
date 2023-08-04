import { Dispatch, SetStateAction, RefObject} from 'react';

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

export { handleHeaderScroll }