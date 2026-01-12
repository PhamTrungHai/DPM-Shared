import { useEffect, useRef } from 'react';

export function useAbortableEffect(effect: (signal: AbortSignal) => void, deps: unknown[] = []) {
    const controllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();

        effect(controllerRef.current.signal);

        return () => controllerRef.current?.abort();
    }, deps);
}
