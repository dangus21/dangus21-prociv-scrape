import { useEffect, useRef, useState } from 'react';

export function ScrapedImage() {
    const [data, setData] = useState(null);
    const hasRan = useRef(false);
    useEffect(() => {
        if (!hasRan.current) {
            fetch('/api/scrape_prociv')
                .then((res) => {
                    // eslint-disable-next-line no-console
                    console.log('LOG ~ file: index.tsx ~ line 10 ~ res', res);
                    return res.json();
                })
                .then((res) => setData(res.blob))
                // eslint-disable-next-line no-console
                .catch((err) => console.log(err));
            hasRan.current = true;
        }
    }, [hasRan.current]);

    // eslint-disable-next-line @next/next/no-img-element
    return <div>{!data ? <p>Loading...</p> : <img src={data} />}</div>;
}
