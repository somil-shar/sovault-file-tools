import asyncio
from playwright.async_api import async_playwright
import json, os

# List of HTML pages in the project folder (assumes .html files in the root)
workspace_dir = os.path.abspath(os.path.dirname(__file__))
pages = [f for f in os.listdir(workspace_dir) if f.endswith('.html')]

async def capture(page_path, browser):
    errors = []
    context = await browser.new_context()
    page = await context.new_page()
    page.on('console', lambda msg: errors.append({"type": msg.type, "text": msg.text}))
    try:
        await page.goto(f'http://localhost:5500/{page_path}', wait_until='load', timeout=15000)
    except Exception as e:
        errors.append({"type": "error", "text": f'Navigation error: {e}'})
    await context.close()
    return errors

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        all_errors = {}
        for page in pages:
            errs = await capture(page, browser)
            if errs:
                all_errors[page] = errs
        # Write errors to a JSON file
        out_path = os.path.join(workspace_dir, 'console_errors.json')
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(all_errors, f, indent=2)
        print(f'Console errors written to {out_path}')

if __name__ == '__main__':
    asyncio.run(main())
