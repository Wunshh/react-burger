import { useState, useEffect } from 'react';

const useWindowHeight = () => {
    const hasWindow = typeof window !== 'undefined';
    const [windowHeight, setWindowHeight] = useState(hasWindow ? window.innerHeight : 0);

    useEffect(() => {
        function handleResize() {
            setWindowHeight(window.innerHeight);
        }

        if (hasWindow) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    });

    return windowHeight;
}

export default useWindowHeight;