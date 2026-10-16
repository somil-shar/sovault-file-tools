import glob

favicon_tags = """    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="apple-touch-icon" href="favicon.png">"""

files = glob.glob("*.html")
updated = 0

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    if '<link rel="icon"' not in content:
        if "</title>" in content:
            parts = content.split("</title>", 1)
            new_content = parts[0] + "</title>\n" + favicon_tags + parts[1]
            with open(file, "w", encoding="utf-8") as f:
                f.write(new_content)
            updated += 1
            print(f"Updated {file}")

print(f"Total HTML files updated: {updated}")
