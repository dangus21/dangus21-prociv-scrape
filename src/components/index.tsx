import { useEffect, useRef, useState } from 'react';

export function ScrapedImage() {
    const [data, setData] = useState(null);
    const hasRan = useRef(false);
    useEffect(() => {
        if (!hasRan.current) {
            fetch('/api/scrape_prociv')
                .then((res) => {
                    return res.json();
                })
                .then((res) => setData(res.blob))
                // eslint-disable-next-line no-console
                .catch((err) => console.log(err));
            hasRan.current = true;
        }
    }, [hasRan.current]);

    return (
        <div>
            {!data ? (
                <p>Loading...</p>
            ) : data.status !== 200 ? (
                'Reload page'
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data} />
            )}
        </div>
    );
}
