import { useEffect, useRef, useState } from 'react';

export function ScrapedImage() {
    const [data, setData] = useState(null);
    const hasRan = useRef(false);
    useEffect(() => {
        if (!hasRan.current) {
            fetch('/api/scrape_prociv')
                .then((res) => res.json())
                .then((res) => setData(res))
                // eslint-disable-next-line no-console
                .catch((err) => console.log(err));
            hasRan.current = true;
        }
    }, [hasRan.current]);

    return (
        <div>
            {!data ? (
                <div style={{ display: 'grid', placeItems: 'center' }}>
                    <p>Loading...</p>
                </div>
            ) : !data && hasRan.current ? (
                <div style={{ display: 'grid', placeItems: 'center' }}>
                    <p>Reaload page</p>
                </div>
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.blob} />
            )}
        </div>
    );
}
