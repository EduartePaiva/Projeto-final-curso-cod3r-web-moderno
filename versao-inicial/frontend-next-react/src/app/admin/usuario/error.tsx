'use client'; // Error components must be Client components

import { useEffect } from 'react';
import NavLinks from '../NavLinks';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <>
            <NavLinks navAtiva='usuario' />
            <div className='tab-content p-3 bg-white user-admin'>
                <h2 >Something went wrong!</h2>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </button>
            </div>

        </>
    );
}
