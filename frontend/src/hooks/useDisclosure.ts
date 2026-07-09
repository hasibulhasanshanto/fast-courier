import { useCallback, useState } from "react";

/**
 * Simple open/close state for modals, drawers, popovers, etc.
 */
export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return { isOpen, open, close, toggle, setIsOpen } as const;
}
