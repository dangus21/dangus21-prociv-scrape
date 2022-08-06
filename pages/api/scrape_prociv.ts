import puppeteer from 'puppeteer';
// import chromium from 'chrome-aws-lambda';

export default async function scrape(req, res) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox'],
        });
        // const browser = await puppeteer.launch();

        const page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });

        await page.goto(
            'http://www.prociv.pt/pt-pt/SITUACAOOPERACIONAL/Paginas/default.aspx?cID=11'
        );

        try {
            await page.waitForFunction(
                () =>
                    (
                        document.querySelector(
                            '#listOcorrenciasDetails tbody'
                        ) as HTMLElement
                    ).childElementCount || 0 > 0
            );
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }

        await page.evaluate(() => {
            const element = document.querySelector(
                '#listOcorrenciasDetails tbody'
            );
            if (element) {
                element.scrollIntoView();
            }
        });

        const isElementVisible = async (page, cssSelector: string) => {
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
                .click(
                    '#listOcorrenciasDetails > table > tfoot > tr > th > span'
                )
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

        res.json({ blob: `data:image/jpeg;base64,${screenshot}` });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
}
