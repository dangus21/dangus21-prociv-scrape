import { useEffect, useState } from "react";

export default function Home() {
	const [data, setData] = useState(null);
	useEffect(() => {
		fetch('/api/scrape')
			.then((res) => res.json())
			.then((res) => setData(res.blob))
			.catch((err) => console.log(err));
	}, []);
	return (
		<div>
			{!data ? <p>Loading...</p> : <img src={data} />}
		</div>
	);
}
