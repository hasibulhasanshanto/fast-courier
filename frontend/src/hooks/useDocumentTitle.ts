import { useEffect } from "react";

/**
 * Sets `document.title` for the current page. Restores the previous
 * title on unmount so back/forward navigation feels natural.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
