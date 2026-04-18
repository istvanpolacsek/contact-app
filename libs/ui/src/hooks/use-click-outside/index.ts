import { type RefObject, useEffect } from 'react';

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onClickOutside: () => void,
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = ref.current;

      if (!element) {
        return;
      }

      const isInsideRef =
        event.composedPath().includes(element) ||
        (event.target instanceof Node && element.contains(event.target));

      if (!isInsideRef) {
        onClickOutside();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClickOutside, ref]);
}

export default useClickOutside;
