import puppeteer from 'puppeteer';

export async function getStaticProps() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--start-maximized', // you can also use '--start-fullscreen'
        ],
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(
        'http://www.prociv.pt/pt-pt/SITUACAOOPERACIONAL/Paginas/default.aspx?cID=11'
    );

    await page.waitForFunction(
        () =>
            (
                document.querySelector(
                    '#listOcorrenciasDetails tbody'
                ) as HTMLElement
            ).childElementCount || 0 > 0
    );

    await page.evaluate(() => {
        const element = document.querySelector('#listOcorrenciasDetails tbody');
        if (element) {
            element.scrollIntoView();
        }
    });

    const isElementVisible = async (
        page: puppeteer.Page,
        cssSelector: string
    ) => {
        let visible = true;
        await page
            .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
            .catch(() => {
                visible = false;
            });
        return visible;
    };

    let loadMoreVisible = await isElementVisible(
        page,
        '#listOcorrenciasDetails > table > tfoot > tr > th > span'
    );
    while (loadMoreVisible) {
        await page
            .click('#listOcorrenciasDetails > table > tfoot > tr > th > span')
            .catch((e) => {
                // eslint-disable-next-line no-console
                console.log(e);
            });
        await page.evaluate(() => {
            const element = document.querySelector(
                '#listOcorrenciasDetails > table > tfoot > tr > th > span'
            );
            if (element) {
                element.scrollIntoView();
            }
        });
        loadMoreVisible = await isElementVisible(
            page,
            '#listOcorrenciasDetails > table > tfoot > tr > th > span'
        );
    }

    const screenshot = await page.screenshot({ encoding: 'base64' });
    await browser.close();

    return {
        props: { blob: `data:image/jpeg;base64,${screenshot}` },
        // will be passed to the page component as props
    };
}

export default function Home(props) {
    return <div>{!props ? <p>Loading...</p> : <img src={props.blob} />}</div>;
}
