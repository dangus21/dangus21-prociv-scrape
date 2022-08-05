import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({
	width: 1920,
	height: 1080,
});
await page.goto('http://www.prociv.pt/pt-pt/SITUACAOOPERACIONAL/Paginas/default.aspx?cID=11');
await page.waitForFunction(() => (
  document.querySelector('#listOcorrenciasDetails tbody') as HTMLElement).childElementCount || 0 > 0
);
await page.screenshot({ path: 'src/images/prociv.png' });

await browser.close();