import os

tools_seo = {
    'split.html': ('Free Online PDF Splitter — Split PDF Pages & Ranges | SoVault', 'Split PDF pages online for free. Extract specific pages or separate entire documents with 100% private in-browser processing. Zero cloud uploads.', 'split pdf, extract pdf pages, separate pdf, split pdf online free, break pdf into pages'),
    'compress.html': ('Free PDF Compressor Online — Reduce PDF File Size | SoVault', 'Compress PDF files online without losing quality. Reduce PDF file size directly in your browser with zero server uploads and total confidentiality.', 'compress pdf, reduce pdf size, shrink pdf, pdf compressor online, compress pdf free'),
    'rotate.html': ('Rotate PDF Pages Online Free — 90, 180, 270 Degrees | SoVault', 'Rotate PDF pages clockwise or upside-down online. Permanently save rotated PDF documents in seconds with zero uploads.', 'rotate pdf, rotate pdf pages, flip pdf, turn pdf online free'),
    'extract.html': ('Extract PDF Pages Online — Custom Page Range Extractor | SoVault', 'Extract pages from PDF documents easily. Choose custom page numbers or ranges and download a new PDF instantly.', 'extract pdf pages, select pdf pages, extract pages from pdf online'),
    'text.html': ('Extract Text from PDF Free — PDF to Text Extractor | SoVault', 'Extract clean, readable text from PDF documents instantly inside your browser. No registration required, copy or export text.', 'extract text from pdf, pdf to text, pdf text extractor, copy text from pdf online'),
    'metadata.html': ('PDF Metadata Editor — View and Edit PDF Title & Author | SoVault', 'Inspect and edit PDF metadata properties including title, author, subject, and keywords with zero server uploads.', 'pdf metadata editor, edit pdf properties, view pdf metadata, change pdf author'),
    'image-compress.html': ('Free Image Compressor — Compress JPG, PNG, WebP Online | SoVault', 'Compress images online with adjustable quality control. Reduce image file size without quality loss in your browser.', 'compress image, compress jpg, compress png, image compressor online free, reduce photo size'),
    'resize.html': ('Free Image Resizer Online — Resize Photos by Dimensions | SoVault', 'Resize JPG, PNG, and WebP images by exact pixel width and height with aspect ratio lock. Batch resize supported.', 'resize image, photo resizer, resize image online free, change picture dimensions'),
    'convert.html': ('Image Converter Online — Convert JPG, PNG, WebP Free | SoVault', 'Convert images between JPG, PNG, and WebP formats instantly with zero quality loss and no server uploads.', 'image converter, convert jpg to png, convert png to jpg, webp converter online'),
    'crop.html': ('Online Image Cropper — Crop Photos & Graphics Free | SoVault', 'Crop pictures and photos accurately in your browser. Select custom coordinates and export in full resolution.', 'crop image, crop photo online, image cropper free, trim picture'),
    'pdf-jpg.html': ('PDF to JPG Converter Online — Render PDF as Images | SoVault', 'Convert PDF pages into high-resolution JPG images. Download single pages or all pages packaged in a ZIP.', 'pdf to jpg, convert pdf to image, pdf to picture, pdf to jpg free online'),
    'jpg-pdf.html': ('JPG & Images to PDF Converter Online Free | SoVault', 'Convert photos, JPG, PNG, and WebP images into a single professional PDF document. Fast and completely private.', 'jpg to pdf, convert image to pdf, photos to pdf, pictures to pdf online free'),
    'screenshot.html': ('Screenshot to PDF Converter — Turn Captures into PDF | SoVault', 'Convert desktop and mobile screenshots into clean, print-ready PDF files with automated margins and orientation.', 'screenshot to pdf, convert capture to pdf, save screenshot as pdf'),
    'images-zip.html': ('Images to ZIP Converter — Package Photos into ZIP Archive | SoVault', 'Compress multiple images into a single zip archive for easy emailing and file sharing without server uploads.', 'images to zip, zip photos online, compress pictures to zip file'),
    'pdf-zip.html': ('PDF to ZIP Archiver — Bundle PDF Files into Single Archive | SoVault', 'Archive multiple PDF documents into a clean ZIP file instantly inside your browser. Fast local compression.', 'pdf to zip, bundle pdfs, zip multiple pdf files online'),
    'print.html': ('Print to PDF Document Generator — Clean Printable PDF | SoVault', 'Format text, notes, and records into a clean, printable PDF document ready for printing or archiving.', 'print to pdf, create printable pdf, text to printable document')
}

workspace = r"c:\Users\Owner\OneDrive\Desktop\New folder (2)"

for filename, (title, desc, keywords) in tools_seo.items():
    filepath = os.path.join(workspace, filename)
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the section between <title> and <link rel="preconnect"
    start_pos = content.find('<title>')
    end_pos = content.find('<link rel="preconnect"')

    if start_pos != -1 and end_pos != -1:
        new_head = f"""<title>{title}</title>
    <!-- Favicon & Icons -->
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="apple-touch-icon" href="favicon.png">
    <link rel="manifest" href="site.webmanifest">

    <!-- Primary SEO Meta Tags -->
    <meta name="description" content="{desc}">
    <meta name="keywords" content="{keywords}">
    <meta name="author" content="SoVault">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="https://SoVault.io/{filename}">
    <meta name="theme-color" content="#4f46e5">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://SoVault.io/{filename}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{desc}">
    <meta property="og:image" content="https://SoVault.io/favicon.png">
    <meta property="og:site_name" content="SoVault">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://SoVault.io/{filename}">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{desc}">
    <meta name="twitter:image" content="https://SoVault.io/favicon.png">

    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "{title}",
      "url": "https://SoVault.io/{filename}",
      "description": "{desc}",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": {{
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }}
    }}
    </script>

    """
        updated_content = content[:start_pos] + new_head + content[end_pos:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Applied SEO to {filename}")

print("All tool pages successfully enriched with SEO tags!")
