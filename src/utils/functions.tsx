import React, {ForwardedRef, useEffect, useRef} from 'react';

/* Модифицированный код нового хука в React-е более поздней версии:
https://stackoverflow.com/questions/62238716/using-ref-current-in-react-forwardref */
export const useForwardRef = <T, >(
  ref: ForwardedRef<T>,
  initialValue: any = null
) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      targetRef.current = ref.current as T;
    }
  }, [ref]);

  return targetRef;
};