/* =========================================================
   SoVault CORE APPLICATION SCRIPT
========================================================= */

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const { PDFDocument, degrees } = PDFLib;
const { jsPDF } = window.jspdf;

// Global drag prevention
window.addEventListener("dragover", e => e.preventDefault());
window.addEventListener("drop", e => e.preventDefault());

/* =========================================================
   ICONS
========================================================= */
const ICONS = {
    pdf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    merge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="8" y="2" width="13" height="13" rx="2"></rect><path d="M5 8v11a2 2 0 0 0 2 2h11"></path><line x1="14" y1="5.5" x2="14" y2="11.5"></line><line x1="11" y1="8.5" x2="17" y2="8.5"></line></svg>`,
    split: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>`,
    compress: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>`,
    rotate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>`,
    extract: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
    text: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`,
    metadata: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
    resize: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>`,
    convert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 3h5v5"></path><path d="M4 20L21 3"></path><path d="M21 16v5h-5"></path><path d="M15 15l6 6"></path><path d="M4 4l5 5"></path></svg>`,
    crop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path></svg>`,
    zip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 2v20"></path><path d="M14 2v20"></path><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="10" y1="6" x2="14" y2="6"></line><line x1="10" y1="10" x2="14" y2="10"></line><line x1="10" y1="14" x2="14" y2="14"></line><line x1="10" y1="18" x2="14" y2="18"></line></svg>`,
    print: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`,
    camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
    upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`
};

/* =========================================================
   TOOLS CATALOG
========================================================= */
const tools = [
    // PDF Category
    { id: "merge", name: "PDF Merger", category: "pdf", icon: ICONS.merge, desc: "Combine multiple PDF documents into a single consolidated PDF.", file: "index.html" },
    { id: "split", name: "PDF Splitter", category: "pdf", icon: ICONS.split, desc: "Extract specific pages or break a PDF into separate files.", file: "split.html" },
    { id: "compress", name: "PDF Compressor", category: "pdf", icon: ICONS.compress, desc: "Reduce PDF document size using optimized rendering and image compression.", file: "compress.html" },
    { id: "rotate", name: "PDF Rotator", category: "pdf", icon: ICONS.rotate, desc: "Rotate pages 90°, 180° or 270° with a single click.", file: "rotate.html" },
    { id: "extract", name: "Page Extractor", category: "pdf", icon: ICONS.extract, desc: "Select specific pages or page ranges to build a clean new PDF.", file: "extract.html" },
    { id: "text", name: "Text Extractor", category: "pdf", icon: ICONS.text, desc: "Extract clean, formatted text from any readable PDF document.", file: "text.html" },
    { id: "metadata", name: "PDF Metadata", category: "pdf", icon: ICONS.metadata, desc: "Inspect and update PDF title, author, subject, and keywords.", file: "metadata.html" },

    // Image Category
    { id: "image-compress", name: "Image Compressor", category: "image", icon: ICONS.compress, desc: "Compress JPG, PNG, and WebP images with fine-tuned quality control.", file: "image-compress.html" },
    { id: "resize", name: "Image Resizer", category: "image", icon: ICONS.resize, desc: "Resize single or multiple images with proportional aspect ratio preservation.", file: "resize.html" },
    { id: "convert", name: "Image Converter", category: "image", icon: ICONS.convert, desc: "Convert seamlessly between JPG, PNG, and WebP formats.", file: "convert.html" },
    { id: "crop", name: "Image Cropper", category: "image", icon: ICONS.crop, desc: "Crop images precisely with automatic dimensions detection.", file: "crop.html" },

    // Converters & ZIP
    { id: "pdf-jpg", name: "PDF → JPG", category: "conv", icon: ICONS.image, desc: "Render PDF pages into high-resolution JPG images.", file: "pdf-jpg.html" },
    { id: "jpg-pdf", name: "Images → PDF", category: "conv", icon: ICONS.pdf, desc: "Convert photos and graphics into a multi-page PDF document.", file: "jpg-pdf.html" },
    { id: "screenshot", name: "Screenshot → PDF", category: "conv", icon: ICONS.camera, desc: "Turn captures into print-ready or auto-fitted PDFs.", file: "screenshot.html" },
    { id: "images-zip", name: "Images → ZIP", category: "conv", icon: ICONS.zip, desc: "Package multiple image files into a clean compressed ZIP.", file: "images-zip.html" },
    { id: "pdf-zip", name: "PDF → ZIP", category: "conv", icon: ICONS.zip, desc: "Package multiple PDF documents into a clean compressed ZIP.", file: "pdf-zip.html" },
    { id: "print", name: "Print to PDF", category: "conv", icon: ICONS.print, desc: "Format raw text or notes into a printable document view.", file: "print.html" }
];

let currentTool = "merge";
let isHome = true;
const state = {};

/* =========================================================
   NAVIGATION HELPERS
========================================================= */
function scrollToSection(sectionId, filterCategory = null){
    const el = document.getElementById(sectionId);
    if(el){
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        // If on another page, navigate to home with anchor
        window.location.href = `index.html#${sectionId}`;
    }
}

function toggleMobileMenu(){
    const drawer = document.getElementById("mobileDrawer");
    if(drawer){
        drawer.classList.toggle("open");
    }
}

/* =========================================================
   TOAST & COMMON HELPERS
========================================================= */
function toast(message){
    const el = document.getElementById("toast");
    if(!el) return;
    el.innerHTML = `<span>${escapeHTML(message)}</span>`;
    el.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

function formatBytes(bytes){
    if(!bytes || bytes <= 0) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return (bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0) + " " + units[i];
}

function downloadBlob(blob, filename){
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function downloadBytes(bytes, filename, type="application/pdf"){
    downloadBlob(new Blob([bytes], {type}), filename);
}

function escapeHTML(value){
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function readBuffer(file){
    return file.arrayBuffer();
}

function readDataURL(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function loadImage(file){
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
        img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
        img.src = url;
    });
}

/* =========================================================
   SIDEBAR RENDERING WITH LINKS
========================================================= */
function renderNav(activeId = currentTool, filter = ""){
    const query = filter.toLowerCase().trim();

    const pdfNav = document.getElementById("navGroupPdf");
    const imgNav = document.getElementById("navGroupImg");
    const convNav = document.getElementById("navGroupConv");

    const renderGroup = (cat) => {
        return tools
            .filter(t => t.category === cat && (!query || t.name.toLowerCase().includes(query) || t.desc.toLowerCase().includes(query)))
            .map(tool => {
                const isActive = tool.id === activeId;
                const linkHref = tool.file;
                return `
                    <a
                        href="${linkHref}"
                        class="tool-btn ${isActive ? "active" : ""}">
                        ${tool.icon}
                        <span>${tool.name}</span>
                    </a>
                `;
            }).join("");
    };

    if(pdfNav) pdfNav.innerHTML = renderGroup("pdf");
    if(imgNav) imgNav.innerHTML = renderGroup("image");
    if(convNav) convNav.innerHTML = renderGroup("conv");
}

function filterTools(query){
    renderNav(currentTool, query);
}

/* =========================================================
   UPLOAD COMPONENT
========================================================= */
function uploadHTML(id, accept, multiple=false){
    return `
        <div class="dropzone" id="${id}Drop">
            <div class="upload-icon-wrap">
                ${ICONS.upload}
            </div>
            <h3>Choose files or drop them here</h3>
            <p>${multiple ? "Multiple files allowed • Processed in local memory" : "Single document • Processed in local memory"}</p>
            <input class="file-input" id="${id}" type="file" accept="${accept}" ${multiple ? "multiple" : ""}>
        </div>
        <div class="file-list-wrap" id="${id}ListWrap" style="display:none;">
            <div class="file-list-header">
                <span>Selected Files</span>
                <button class="clear-all-btn" onclick="clearFiles('${id}')">Clear all</button>
            </div>
            <div class="file-list" id="${id}List"></div>
        </div>
    `;
}

function setupUpload(inputId, callback){
    const input = document.getElementById(inputId);
    const drop = document.getElementById(inputId + "Drop");
    if(!input || !drop) return;

    drop.addEventListener("click", () => input.click());
    input.addEventListener("click", e => e.stopPropagation());

    input.addEventListener("change", () => {
        if(input.files && input.files.length){
            callback([...input.files]);
        }
        input.value = "";
    });

    ["dragenter", "dragover"].forEach(event => {
        drop.addEventListener(event, e => {
            e.preventDefault();
            drop.classList.add("drag");
        });
    });

    ["dragleave", "drop"].forEach(event => {
        drop.addEventListener(event, e => {
            e.preventDefault();
            drop.classList.remove("drag");
        });
    });

    drop.addEventListener("drop", e => {
        if(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length){
            callback([...e.dataTransfer.files]);
        }
    });
}

async function renderFiles(listId, files){
    const list = document.getElementById(listId);
    const wrap = document.getElementById(listId + "Wrap");
    if(!list) return;

    if(!files || !files.length){
        list.innerHTML = "";
        if(wrap) wrap.style.display = "none";
        return;
    }

    if(wrap) wrap.style.display = "block";

    list.innerHTML = files.map((file, index) => {
        const isImg = file.type.startsWith("image/");
        const iconSvg = isImg ? ICONS.image : ICONS.pdf;
        return `
            <div class="file-item">
                <div class="file-info">
                    <div class="file-preview" id="thumb_${listId}_${index}">
                        ${iconSvg}
                    </div>
                    <div class="file-details">
                        <div class="file-name" title="${escapeHTML(file.name)}">${escapeHTML(file.name)}</div>
                        <div class="file-meta">${formatBytes(file.size)}</div>
                    </div>
                </div>
                <button class="remove-btn" title="Remove" onclick="removeFile('${listId}', ${index})">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
    }).join("");

    files.forEach((file, index) => {
        if(file.type.startsWith("image/")){
            const reader = new FileReader();
            reader.onload = e => {
                const thumb = document.getElementById(`thumb_${listId}_${index}`);
                if(thumb) thumb.innerHTML = `<img src="${e.target.result}" alt="thumb">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

function removeFile(listId, index){
    const key = listId.replace("List", "");
    if(!state[key]) return;
    state[key].splice(index, 1);
    renderFiles(listId, state[key]);
    const input = document.getElementById(key);
    if(input) input.value = "";
}

function clearFiles(key){
    state[key] = [];
    renderFiles(key + "List", []);
    const input = document.getElementById(key);
    if(input) input.value = "";
}

function updateFileList(key, listId, newFiles, isMultiple = true) {
    if(!state[key]) state[key] = [];
    if(isMultiple){
        const existingMap = new Set(state[key].map(f => f.name + "_" + f.size));
        const added = newFiles.filter(f => !existingMap.has(f.name + "_" + f.size));
        state[key] = [...state[key], ...added];
    } else {
        state[key] = newFiles.slice(0, 1);
    }
    renderFiles(listId, state[key]);
}

/* =========================================================
   PROGRESS COMPONENT
========================================================= */
function progressHTML(){
    return `
        <div class="progress-wrap" id="progressWrap">
            <div class="progress-header">
                <span id="progressText">Processing document...</span>
                <span id="progressPercent" style="font-family:var(--mono);">0%</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" id="progressBar"></div>
            </div>
        </div>
    `;
}

function setProgress(value, text="Processing document..."){
    const wrap = document.getElementById("progressWrap");
    const bar = document.getElementById("progressBar");
    const label = document.getElementById("progressText");
    const percent = document.getElementById("progressPercent");
    if(!wrap || !bar) return;
    wrap.style.display = "block";
    const clamped = Math.min(100, Math.max(0, Math.round(value)));
    bar.style.width = clamped + "%";
    if(label) label.textContent = text;
    if(percent) percent.textContent = clamped + "%";
}

function hideProgress(){
    const wrap = document.getElementById("progressWrap");
    if(wrap) wrap.style.display = "none";
}

/* =========================================================
   PAGE RANGE PARSER
========================================================= */
function parsePages(value, total){
    if(!value || !value.trim()){
        return Array.from({length: total}, (_, i) => i + 1);
    }

    const result = new Set();
    const parts = value.split(",");

    for(let part of parts){
        part = part.trim();
        if(!part) continue;

        if(part.includes("-")){
            const range = part.split("-").map(p => p.trim());
            let start = Number(range[0]);
            let end = Number(range[1]);

            if(isNaN(start) || isNaN(end)) continue;
            if(start > end) [start, end] = [end, start];

            for(let i = start; i <= end; i++){
                if(i >= 1 && i <= total) result.add(i);
            }
        } else {
            const n = Number(part);
            if(!isNaN(n) && n >= 1 && n <= total) result.add(n);
        }
    }

    return [...result].sort((a, b) => a - b);
}

/* =========================================================
   TOOL HTML BUILDER
========================================================= */
function getToolHTML(id){
    switch(id){
        case "merge":
            return `
                ${uploadHTML("mergeFiles", ".pdf", true)}
                <div class="btn-row">
                    <button class="btn btn-primary" id="mergePDFs">
                        ${ICONS.merge}
                        <span>Merge Selected PDFs</span>
                    </button>
                </div>
                ${progressHTML()}
                <div class="info-box">
                    ${ICONS.metadata}
                    <div>Select two or more PDF files. Documents will be merged in the exact order shown above.</div>
                </div>
            `;

        case "split":
            return `
                ${uploadHTML("splitFile", ".pdf", false)}
                <div class="options">
                    <div class="field">
                        <label>Pages to Split <span class="field-badge">Range or Comma</span></label>
                        <input id="splitPages" placeholder="e.g. 1, 3, 5-7 (leave blank for all)">
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="splitPDF">
                        ${ICONS.split}
                        <span>Split PDF</span>
                    </button>
                </div>
                ${progressHTML()}
                <div class="info-box">
                    ${ICONS.metadata}
                    <div>Leaving the input empty exports every single page as a standalone PDF, bundled in a ZIP archive.</div>
                </div>
            `;

        case "compress":
            return `
                ${uploadHTML("compressFile", ".pdf", false)}
                <div class="options">
                    <div class="field">
                        <label>Compression Preset</label>
                        <select id="compressQuality">
                            <option value="0.5">Maximum (Smallest file size)</option>
                            <option value="0.65" selected>Balanced (Recommended)</option>
                            <option value="0.82">High Quality (Sharper text)</option>
                        </select>
                    </div>
                    <div class="field">
                        <label>Render Scale</label>
                        <select id="compressScale">
                            <option value="0.85">0.85× (Aggressive shrink)</option>
                            <option value="1" selected>1.0× (Native resolution)</option>
                            <option value="1.25">1.25× (Crisp)</option>
                        </select>
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="compressPDF">
                        ${ICONS.compress}
                        <span>Compress PDF</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "rotate":
            return `
                ${uploadHTML("rotateFile", ".pdf", false)}
                <div class="options">
                    <div class="field">
                        <label>Rotation Direction</label>
                        <select id="rotation">
                            <option value="90">90° Clockwise</option>
                            <option value="180">180° Flip Upside-Down</option>
                            <option value="270">90° Counter-Clockwise</option>
                        </select>
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="rotatePDF">
                        ${ICONS.rotate}
                        <span>Rotate Pages</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "extract":
            return `
                ${uploadHTML("extractFile", ".pdf", false)}
                <div class="options">
                    <div class="field">
                        <label>Pages to Extract <span class="field-badge">Required</span></label>
                        <input id="extractPages" placeholder="e.g. 1, 3, 5-8">
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="extractPDF">
                        ${ICONS.extract}
                        <span>Extract to New PDF</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "text":
            return `
                ${uploadHTML("textPDF", ".pdf", false)}
                <div class="btn-row">
                    <button class="btn btn-primary" id="extractText">
                        ${ICONS.text}
                        <span>Extract Text</span>
                    </button>
                </div>
                ${progressHTML()}
                <div class="field" style="margin-top:22px;">
                    <label>Extracted Plain Text</label>
                    <textarea id="textOutput" placeholder="Extracted text will appear here with page separators..."></textarea>
                </div>
            `;

        case "metadata":
            return `
                ${uploadHTML("metadataFile", ".pdf", false)}
                <div class="options">
                    <div class="field">
                        <label>Document Title</label>
                        <input id="metaTitle" placeholder="Document title">
                    </div>
                    <div class="field">
                        <label>Author</label>
                        <input id="metaAuthor" placeholder="Author / Creator name">
                    </div>
                    <div class="field">
                        <label>Subject</label>
                        <input id="metaSubject" placeholder="Document subject">
                    </div>
                    <div class="field">
                        <label>Keywords</label>
                        <input id="metaKeywords" placeholder="Keywords, comma-separated">
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="editMetadata">
                        ${ICONS.metadata}
                        <span>Save Updated Metadata</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "image-compress":
            return `
                ${uploadHTML("compressImage", "image/*", true)}
                <div class="options">
                    <div class="field">
                        <label>Compression Quality <span class="field-badge" id="imgQualityVal">75%</span></label>
                        <input id="imageQuality" type="range" min="0.1" max="1" step="0.05" value="0.75" oninput="document.getElementById('imgQualityVal').textContent = Math.round(this.value * 100) + '%'">
                    </div>
                    <div class="field">
                        <label>Output Format</label>
                        <select id="imageOutput">
                            <option value="image/jpeg" selected>JPG (Standard photo)</option>
                            <option value="image/webp">WebP (Modern high efficiency)</option>
                        </select>
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="compressImages">
                        ${ICONS.compress}
                        <span>Compress Images</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "resize":
            return `
                ${uploadHTML("resizeImage", "image/*", true)}
                <div class="options">
                    <div class="field">
                        <label>Width (pixels)</label>
                        <input id="resizeWidth" type="number" placeholder="Leave empty for proportional">
                    </div>
                    <div class="field">
                        <label>Height (pixels)</label>
                        <input id="resizeHeight" type="number" placeholder="Leave empty for proportional">
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="resizeImages">
                        ${ICONS.resize}
                        <span>Resize Images</span>
                    </button>
                </div>
                ${progressHTML()}
                <div class="info-box">
                    ${ICONS.metadata}
                    <div>Enter either dimension to scale proportionally, or enter both for explicit sizing.</div>
                </div>
            `;

        case "convert":
            return `
                ${uploadHTML("convertImage", "image/*", true)}
                <div class="options">
                    <div class="field">
                        <label>Convert Target Format</label>
                        <select id="convertFormat">
                            <option value="image/jpeg" selected>JPG</option>
                            <option value="image/png">PNG</option>
                            <option value="image/webp">WebP</option>
                        </select>
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="convertImages">
                        ${ICONS.convert}
                        <span>Convert Images</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "crop":
            return `
                ${uploadHTML("cropImage", "image/*", false)}
                <div class="options">
                    <div class="field">
                        <label>X (Left offset)</label>
                        <input id="cropX" type="number" value="0">
                    </div>
                    <div class="field">
                        <label>Y (Top offset)</label>
                        <input id="cropY" type="number" value="0">
                    </div>
                    <div class="field">
                        <label>Width (px)</label>
                        <input id="cropW" type="number" placeholder="Image width">
                    </div>
                    <div class="field">
                        <label>Height (px)</label>
                        <input id="cropH" type="number" placeholder="Image height">
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="cropImageBtn">
                        ${ICONS.crop}
                        <span>Crop Image</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "pdf-jpg":
            return `
                ${uploadHTML("pdfJpgFiles", ".pdf", true)}
                <div class="options">
                    <div class="field">
                        <label>JPG Quality <span class="field-badge" id="jpgQualityVal">90%</span></label>
                        <input id="jpgQuality" type="range" min="0.5" max="1" step="0.05" value="0.9" oninput="document.getElementById('jpgQualityVal').textContent = Math.round(this.value * 100) + '%'">
                    </div>
                    <div class="field">
                        <label>Render Scale</label>
                        <select id="jpgScale">
                            <option value="1">1.0× (Standard)</option>
                            <option value="1.5">1.5×</option>
                            <option value="2" selected>2.0× (Sharp / High-Res)</option>
                            <option value="3">3.0× (Ultra crisp)</option>
                        </select>
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="convertPDFJPG">
                        ${ICONS.image}
                        <span>Convert to JPG</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "jpg-pdf":
            return `
                ${uploadHTML("jpgPdfFiles", "image/*", true)}
                <div class="options">
                    <div class="field">
                        <label>Page Size</label>
                        <select id="pageSize">
                            <option value="a4" selected>A4</option>
                            <option value="letter">Letter</option>
                            <option value="fit">Fit to Image Size</option>
                        </select>
                    </div>
                    <div class="field">
                        <label>Orientation</label>
                        <select id="orientation">
                            <option value="auto" selected>Auto Match</option>
                            <option value="portrait">Portrait</option>
                            <option value="landscape">Landscape</option>
                        </select>
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="createJPGPDF">
                        ${ICONS.pdf}
                        <span>Create PDF Document</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "screenshot":
            return `
                ${uploadHTML("screenshotFiles", "image/*", true)}
                <div class="options">
                    <div class="field">
                        <label>Page Layout</label>
                        <select id="screenshotPage">
                            <option value="fit" selected>Fit to Image Dimensions</option>
                            <option value="a4">Standard A4 Page</option>
                        </select>
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="screensToPDF">
                        ${ICONS.camera}
                        <span>Generate PDF</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "images-zip":
            return `
                ${uploadHTML("zipImages", "image/*", true)}
                <div class="btn-row">
                    <button class="btn btn-primary" id="imagesToZip">
                        ${ICONS.zip}
                        <span>Package Images to ZIP</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "pdf-zip":
            return `
                ${uploadHTML("zipPDFs", ".pdf", true)}
                <div class="btn-row">
                    <button class="btn btn-primary" id="pdfsToZip">
                        ${ICONS.zip}
                        <span>Package PDFs to ZIP</span>
                    </button>
                </div>
                ${progressHTML()}
            `;

        case "print":
            return `
                <div class="field">
                    <label>Document Body</label>
                    <textarea id="printContent" placeholder="Type or paste the notes or text you want to print as PDF..."></textarea>
                </div>
                <div class="options">
                    <div class="field">
                        <label>Document Header Title</label>
                        <input id="printTitle" value="My Document">
                    </div>
                    <div class="field">
                        <label>Base Font Size (px)</label>
                        <input id="printSize" type="number" value="16">
                    </div>
                </div>
                <div class="btn-row">
                    <button class="btn btn-primary" id="printPDF">
                        ${ICONS.print}
                        <span>Open Print Dialog</span>
                    </button>
                </div>
                <div class="info-box">
                    ${ICONS.metadata}
                    <div>Opens browser native print preview. Choose "Save as PDF" to export.</div>
                </div>
            `;
    }
    return "";
}

/* =========================================================
   TOOL BINDINGS & EXECUTION
========================================================= */
function bindTool(id){
    switch(id){
        case "merge":
            state.mergeFiles = [];
            setupUpload("mergeFiles", files => updateFileList("mergeFiles", "mergeFilesList", files, true));
            const btnMerge = document.getElementById("mergePDFs");
            if(btnMerge) btnMerge.onclick = mergePDFs;
            break;

        case "split":
            state.splitFile = [];
            setupUpload("splitFile", files => updateFileList("splitFile", "splitFileList", files, false));
            const btnSplit = document.getElementById("splitPDF");
            if(btnSplit) btnSplit.onclick = splitPDF;
            break;

        case "compress":
            state.compressFile = [];
            setupUpload("compressFile", files => updateFileList("compressFile", "compressFileList", files, false));
            const btnComp = document.getElementById("compressPDF");
            if(btnComp) btnComp.onclick = compressPDF;
            break;

        case "rotate":
            state.rotateFile = [];
            setupUpload("rotateFile", files => updateFileList("rotateFile", "rotateFileList", files, false));
            const btnRot = document.getElementById("rotatePDF");
            if(btnRot) btnRot.onclick = rotatePDF;
            break;

        case "extract":
            state.extractFile = [];
            setupUpload("extractFile", files => updateFileList("extractFile", "extractFileList", files, false));
            const btnExt = document.getElementById("extractPDF");
            if(btnExt) btnExt.onclick = extractPDF;
            break;

        case "text":
            state.textPDF = [];
            setupUpload("textPDF", files => updateFileList("textPDF", "textPDFList", files, false));
            const btnText = document.getElementById("extractText");
            if(btnText) btnText.onclick = extractPDFText;
            break;

        case "metadata":
            state.metadataFile = [];
            setupUpload("metadataFile", async files => {
                updateFileList("metadataFile", "metadataFileList", files, false);
                if(files.length > 0){
                    try {
                        const pdf = await PDFDocument.load(await readBuffer(files[0]));
                        const t = document.getElementById("metaTitle");
                        const a = document.getElementById("metaAuthor");
                        const s = document.getElementById("metaSubject");
                        const k = document.getElementById("metaKeywords");
                        if(t) t.value = pdf.getTitle() || "";
                        if(a) a.value = pdf.getAuthor() || "";
                        if(s) s.value = pdf.getSubject() || "";
                        if(k) k.value = pdf.getKeywords() || "";
                    } catch(e){}
                }
            });
            const btnMeta = document.getElementById("editMetadata");
            if(btnMeta) btnMeta.onclick = editMetadata;
            break;

        case "image-compress":
            state.compressImage = [];
            setupUpload("compressImage", files => updateFileList("compressImage", "compressImageList", files, true));
            const btnImgComp = document.getElementById("compressImages");
            if(btnImgComp) btnImgComp.onclick = compressImages;
            break;

        case "resize":
            state.resizeImage = [];
            setupUpload("resizeImage", async files => {
                updateFileList("resizeImage", "resizeImageList", files, true);
                if(files.length > 0){
                    try {
                        const img = await loadImage(files[0]);
                        const wIn = document.getElementById("resizeWidth");
                        const hIn = document.getElementById("resizeHeight");
                        if(wIn && !wIn.value) wIn.value = img.width;
                        if(hIn && !hIn.value) hIn.value = img.height;
                    } catch(e){}
                }
            });
            const btnResize = document.getElementById("resizeImages");
            if(btnResize) btnResize.onclick = resizeImages;
            break;

        case "convert":
            state.convertImage = [];
            setupUpload("convertImage", files => updateFileList("convertImage", "convertImageList", files, true));
            const btnConv = document.getElementById("convertImages");
            if(btnConv) btnConv.onclick = convertImages;
            break;

        case "crop":
            state.cropImage = [];
            setupUpload("cropImage", async files => {
                updateFileList("cropImage", "cropImageList", files, false);
                if(files.length > 0){
                    try {
                        const img = await loadImage(files[0]);
                        const wIn = document.getElementById("cropW");
                        const hIn = document.getElementById("cropH");
                        if(wIn) wIn.value = img.width;
                        if(hIn) hIn.value = img.height;
                    } catch(e){}
                }
            });
            const btnCrop = document.getElementById("cropImageBtn");
            if(btnCrop) btnCrop.onclick = cropImage;
            break;

        case "pdf-jpg":
            state.pdfJpgFiles = [];
            setupUpload("pdfJpgFiles", files => updateFileList("pdfJpgFiles", "pdfJpgFilesList", files, true));
            const btnPdfJpg = document.getElementById("convertPDFJPG");
            if(btnPdfJpg) btnPdfJpg.onclick = convertPDFToJPG;
            break;

        case "jpg-pdf":
            state.jpgPdfFiles = [];
            setupUpload("jpgPdfFiles", files => updateFileList("jpgPdfFiles", "jpgPdfFilesList", files, true));
            const btnJpgPdf = document.getElementById("createJPGPDF");
            if(btnJpgPdf) btnJpgPdf.onclick = createJPGPDF;
            break;

        case "screenshot":
            state.screenshotFiles = [];
            setupUpload("screenshotFiles", files => updateFileList("screenshotFiles", "screenshotFilesList", files, true));
            const btnScreen = document.getElementById("screensToPDF");
            if(btnScreen) btnScreen.onclick = screensToPDF;
            break;

        case "images-zip":
            state.zipImages = [];
            setupUpload("zipImages", files => updateFileList("zipImages", "zipImagesList", files, true));
            const btnImgZip = document.getElementById("imagesToZip");
            if(btnImgZip) btnImgZip.onclick = imagesToZip;
            break;

        case "pdf-zip":
            state.zipPDFs = [];
            setupUpload("zipPDFs", files => updateFileList("zipPDFs", "zipPDFsList", files, true));
            const btnPdfZip = document.getElementById("pdfsToZip");
            if(btnPdfZip) btnPdfZip.onclick = pdfsToZip;
            break;

        case "print":
            const btnPrint = document.getElementById("printPDF");
            if(btnPrint) btnPrint.onclick = printToPDF;
            break;
    }
}

/* =========================================================
   TOOL IMPLEMENTATIONS
========================================================= */

// MERGE
async function mergePDFs(){
    if(!state.mergeFiles?.length || state.mergeFiles.length < 2){
        toast("Please select at least 2 PDF files to merge.");
        return;
    }

    const btn = document.getElementById("mergePDFs");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Processing...`; }

    try {
        const output = await PDFDocument.create();

        for(let i = 0; i < state.mergeFiles.length; i++){
            setProgress(
                (i / state.mergeFiles.length) * 100,
                `Merging document ${i + 1} of ${state.mergeFiles.length}...`
            );

            const file = state.mergeFiles[i];
            const source = await PDFDocument.load(await readBuffer(file));
            const pages = await output.copyPages(source, source.getPageIndices());
            pages.forEach(page => output.addPage(page));
        }

        const bytes = await output.save();
        downloadBytes(bytes, "merged-document.pdf");
        setProgress(100, "Done!");
        toast("PDFs merged successfully!");
    } catch(err) {
        console.error(err);
        toast("Error merging PDFs: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// SPLIT
async function splitPDF(){
    if(!state.splitFile?.length){
        toast("Please select a PDF file.");
        return;
    }

    const btn = document.getElementById("splitPDF");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Splitting...`; }

    try {
        const file = state.splitFile[0];
        const pdf = await PDFDocument.load(await readBuffer(file));
        const total = pdf.getPageCount();

        const pages = parsePages(document.getElementById("splitPages").value, total);
        if(!pages.length){
            toast("No valid pages found to split.");
            return;
        }

        const base = file.name.replace(/\.pdf$/i, "");
        const isSingle = pages.length === 1;
        const zip = isSingle ? null : new JSZip();

        for(let idx = 0; idx < pages.length; idx++){
            const pageNumber = pages[idx];
            setProgress(
                (idx / pages.length) * 100,
                `Extracting page ${pageNumber} of ${total}...`
            );

            const output = await PDFDocument.create();
            const copied = await output.copyPages(pdf, [pageNumber - 1]);
            output.addPage(copied[0]);
            const bytes = await output.save();
            const filename = `${base}-page-${pageNumber}.pdf`;

            if(isSingle){
                downloadBytes(bytes, filename);
            } else {
                zip.file(filename, bytes);
            }
        }

        if(!isSingle){
            setProgress(95, "Bundling archive...");
            const zipBlob = await zip.generateAsync({ type: "blob" });
            downloadBlob(zipBlob, `${base}-split.zip`);
        }

        setProgress(100, "Done!");
        toast("PDF split successfully!");
    } catch(err) {
        console.error(err);
        toast("Error splitting PDF: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// COMPRESS PDF
async function compressPDF(){
    if(!state.compressFile?.length){
        toast("Please select a PDF file.");
        return;
    }

    const btn = document.getElementById("compressPDF");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Compressing...`; }

    try {
        const file = state.compressFile[0];
        const quality = Number(document.getElementById("compressQuality").value) || 0.65;
        const scale = Number(document.getElementById("compressScale").value) || 1;

        const pdf = await pdfjsLib.getDocument({
            data: await readBuffer(file)
        }).promise;

        let output = null;

        for(let i = 1; i <= pdf.numPages; i++){
            setProgress(
                ((i - 1) / pdf.numPages) * 100,
                `Compressing page ${i} of ${pdf.numPages}...`
            );

            const page = await pdf.getPage(i);
            const origViewport = page.getViewport({ scale: 1 });
            const renderViewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");
            canvas.width = renderViewport.width;
            canvas.height = renderViewport.height;

            const context = canvas.getContext("2d");
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, canvas.width, canvas.height);

            await page.render({
                canvasContext: context,
                viewport: renderViewport
            }).promise;

            const image = canvas.toDataURL("image/jpeg", quality);
            const orientation = origViewport.width >= origViewport.height ? "landscape" : "portrait";
            const pageSizePt = [origViewport.width, origViewport.height];

            if(i === 1){
                output = new jsPDF({
                    orientation,
                    unit: "pt",
                    format: pageSizePt
                });
            } else {
                output.addPage(pageSizePt, orientation);
            }

            output.addImage(image, "JPEG", 0, 0, origViewport.width, origViewport.height);
        }

        output.save(file.name.replace(/\.pdf$/i, "") + "-compressed.pdf");
        setProgress(100, "Done!");
        toast("PDF compressed successfully!");
    } catch(err) {
        console.error(err);
        toast("Error compressing PDF: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// ROTATE
async function rotatePDF(){
    if(!state.rotateFile?.length){
        toast("Please select a PDF file.");
        return;
    }

    const btn = document.getElementById("rotatePDF");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Rotating...`; }

    try {
        const file = state.rotateFile[0];
        const pdf = await PDFDocument.load(await readBuffer(file));
        const rotation = Number(document.getElementById("rotation").value) || 90;

        pdf.getPages().forEach(page => {
            const currentAngle = page.getRotation().angle || 0;
            page.setRotation(degrees((currentAngle + rotation) % 360));
        });

        const bytes = await pdf.save();
        downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-rotated.pdf");
        toast("PDF rotated successfully!");
    } catch(err) {
        console.error(err);
        toast("Error rotating PDF: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// EXTRACT
async function extractPDF(){
    if(!state.extractFile?.length){
        toast("Please select a PDF file.");
        return;
    }

    const btn = document.getElementById("extractPDF");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Extracting...`; }

    try {
        const file = state.extractFile[0];
        const pdf = await PDFDocument.load(await readBuffer(file));

        const pages = parsePages(document.getElementById("extractPages").value, pdf.getPageCount());

        if(!pages.length){
            toast("Please specify valid page numbers (e.g. 1, 3, 5-8).");
            return;
        }

        const output = await PDFDocument.create();
        const copied = await output.copyPages(pdf, pages.map(p => p - 1));
        copied.forEach(page => output.addPage(page));

        const bytes = await output.save();
        downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-extracted.pdf");
        toast("Pages extracted successfully!");
    } catch(err) {
        console.error(err);
        toast("Error extracting pages: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// EXTRACT TEXT
async function extractPDFText(){
    if(!state.textPDF?.length){
        toast("Please select a PDF file.");
        return;
    }

    const btn = document.getElementById("extractText");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Extracting...`; }

    try {
        const file = state.textPDF[0];
        const pdf = await pdfjsLib.getDocument({
            data: await readBuffer(file)
        }).promise;

        let output = "";

        for(let i = 1; i <= pdf.numPages; i++){
            setProgress(
                ((i - 1) / pdf.numPages) * 100,
                `Reading page ${i} of ${pdf.numPages}...`
            );

            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            let pageText = "";
            for(let j = 0; j < content.items.length; j++){
                const item = content.items[j];
                pageText += item.str;
                pageText += item.hasEOL ? "\n" : " ";
            }

            output += `--- Page ${i} ---\n\n` + pageText.trim() + "\n\n";
        }

        const outElem = document.getElementById("textOutput");
        if(outElem) outElem.value = output.trim();

        setProgress(100, "Done!");
        if(!output.trim().replace(/--- Page \d+ ---/g, "").trim()){
            toast("No selectable text found. (Document may be scanned).");
        } else {
            toast("Text extracted successfully!");
        }
    } catch(err) {
        console.error(err);
        toast("Error extracting text: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// METADATA
async function editMetadata(){
    if(!state.metadataFile?.length){
        toast("Please select a PDF file.");
        return;
    }

    const btn = document.getElementById("editMetadata");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Saving...`; }

    try {
        const file = state.metadataFile[0];
        const pdf = await PDFDocument.load(await readBuffer(file));

        pdf.setTitle(document.getElementById("metaTitle").value || "");
        pdf.setAuthor(document.getElementById("metaAuthor").value || "");
        pdf.setSubject(document.getElementById("metaSubject").value || "");

        const keywordsVal = document.getElementById("metaKeywords").value || "";
        const keywords = keywordsVal.split(",").map(k => k.trim()).filter(Boolean);
        pdf.setKeywords(keywords);

        const bytes = await pdf.save();
        downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-metadata.pdf");
        toast("Metadata updated successfully!");
    } catch(err) {
        console.error(err);
        toast("Error updating metadata: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// IMAGE COMPRESSOR
async function compressImages(){
    if(!state.compressImage?.length){
        toast("Please select images.");
        return;
    }

    const btn = document.getElementById("compressImages");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Compressing...`; }

    try {
        const quality = Number(document.getElementById("imageQuality").value) || 0.75;
        const type = document.getElementById("imageOutput").value || "image/jpeg";
        const extension = type === "image/webp" ? "webp" : "jpg";

        const isSingle = state.compressImage.length === 1;
        const zip = isSingle ? null : new JSZip();

        for(let i = 0; i < state.compressImage.length; i++){
            setProgress(
                (i / state.compressImage.length) * 100,
                `Compressing image ${i + 1} of ${state.compressImage.length}...`
            );

            const file = state.compressImage[i];
            const image = await loadImage(file);
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");

            if(type === "image/jpeg"){
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(image, 0, 0);

            const blob = await new Promise(resolve => canvas.toBlob(resolve, type, quality));
            const filename = file.name.replace(/\.[^.]+$/, "") + "-compressed." + extension;

            if(isSingle){
                downloadBlob(blob, filename);
            } else {
                zip.file(filename, blob);
            }
        }

        if(!isSingle){
            setProgress(95, "Creating ZIP...");
            const zipBlob = await zip.generateAsync({ type: "blob" });
            downloadBlob(zipBlob, "compressed-images.zip");
        }

        setProgress(100, "Done!");
        toast("Images compressed successfully!");
    } catch(err) {
        console.error(err);
        toast("Error compressing images: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// RESIZE IMAGES
async function resizeImages(){
    if(!state.resizeImage?.length){
        toast("Please select images.");
        return;
    }

    const btn = document.getElementById("resizeImages");
    const origHTML = btn ? btn.innerHTML : "";

    const wInput = Number(document.getElementById("resizeWidth").value);
    const hInput = Number(document.getElementById("resizeHeight").value);

    if(!wInput && !hInput){
        toast("Please specify at least width or height.");
        return;
    }

    if(btn){ btn.disabled = true; btn.innerHTML = `Resizing...`; }

    try {
        const isSingle = state.resizeImage.length === 1;
        const zip = isSingle ? null : new JSZip();

        for(let i = 0; i < state.resizeImage.length; i++){
            setProgress(
                (i / state.resizeImage.length) * 100,
                `Resizing image ${i + 1} of ${state.resizeImage.length}...`
            );

            const file = state.resizeImage[i];
            const image = await loadImage(file);

            let width = wInput;
            let height = hInput;

            if(width && !height){
                height = Math.round(image.height * (width / image.width));
            } else if(!width && height){
                width = Math.round(image.width * (height / image.height));
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            const mime = file.type === "image/jpeg" ? "image/jpeg" : file.type === "image/webp" ? "image/webp" : "image/png";
            const ext = mime === "image/jpeg" ? "jpg" : mime === "image/webp" ? "webp" : "png";

            if(mime === "image/jpeg"){
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, width, height);
            }
            ctx.drawImage(image, 0, 0, width, height);

            const blob = await new Promise(resolve => canvas.toBlob(resolve, mime, 0.92));
            const filename = file.name.replace(/\.[^.]+$/, "") + "-resized." + ext;

            if(isSingle){
                downloadBlob(blob, filename);
            } else {
                zip.file(filename, blob);
            }
        }

        if(!isSingle){
            setProgress(95, "Creating ZIP...");
            const zipBlob = await zip.generateAsync({ type: "blob" });
            downloadBlob(zipBlob, "resized-images.zip");
        }

        setProgress(100, "Done!");
        toast("Images resized successfully!");
    } catch(err) {
        console.error(err);
        toast("Error resizing images: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// CONVERT IMAGES
async function convertImages(){
    if(!state.convertImage?.length){
        toast("Please select images.");
        return;
    }

    const btn = document.getElementById("convertImages");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Converting...`; }

    try {
        const type = document.getElementById("convertFormat").value;
        const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[type] || "jpg";

        const isSingle = state.convertImage.length === 1;
        const zip = isSingle ? null : new JSZip();

        for(let i = 0; i < state.convertImage.length; i++){
            setProgress(
                (i / state.convertImage.length) * 100,
                `Converting image ${i + 1} of ${state.convertImage.length}...`
            );

            const file = state.convertImage[i];
            const image = await loadImage(file);
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");

            if(type === "image/jpeg"){
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(image, 0, 0);

            const blob = await new Promise(resolve => canvas.toBlob(resolve, type, 0.95));
            const filename = file.name.replace(/\.[^.]+$/, "") + "." + extension;

            if(isSingle){
                downloadBlob(blob, filename);
            } else {
                zip.file(filename, blob);
            }
        }

        if(!isSingle){
            setProgress(95, "Creating ZIP...");
            const zipBlob = await zip.generateAsync({ type: "blob" });
            downloadBlob(zipBlob, "converted-images.zip");
        }

        setProgress(100, "Done!");
        toast("Images converted successfully!");
    } catch(err) {
        console.error(err);
        toast("Error converting images: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// CROP IMAGE
async function cropImage(){
    if(!state.cropImage?.length){
        toast("Please select an image.");
        return;
    }

    const btn = document.getElementById("cropImageBtn");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Cropping...`; }

    try {
        const file = state.cropImage[0];
        const image = await loadImage(file);

        let x = Number(document.getElementById("cropX").value) || 0;
        let y = Number(document.getElementById("cropY").value) || 0;
        let width = Number(document.getElementById("cropW").value);
        let height = Number(document.getElementById("cropH").value);

        if(!width) width = image.width - x;
        if(!height) height = image.height - y;

        x = Math.max(0, Math.min(x, image.width - 1));
        y = Math.max(0, Math.min(y, image.height - 1));
        width = Math.max(1, Math.min(width, image.width - x));
        height = Math.max(1, Math.min(height, image.height - y));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

        const mime = file.type === "image/jpeg" ? "image/jpeg" : file.type === "image/webp" ? "image/webp" : "image/png";
        const ext = mime === "image/jpeg" ? "jpg" : mime === "image/webp" ? "webp" : "png";

        const blob = await new Promise(resolve => canvas.toBlob(resolve, mime, 0.95));
        downloadBlob(blob, file.name.replace(/\.[^.]+$/, "") + "-cropped." + ext);
        toast("Image cropped successfully!");
    } catch(err) {
        console.error(err);
        toast("Error cropping image: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// PDF TO JPG
async function convertPDFToJPG(){
    if(!state.pdfJpgFiles?.length){
        toast("Please select a PDF file.");
        return;
    }

    const btn = document.getElementById("convertPDFJPG");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Converting...`; }

    try {
        const quality = Number(document.getElementById("jpgQuality").value) || 0.9;
        const scale = Number(document.getElementById("jpgScale").value) || 2;

        for(const file of state.pdfJpgFiles){
            const pdf = await pdfjsLib.getDocument({
                data: await readBuffer(file)
            }).promise;

            const base = file.name.replace(/\.pdf$/i, "");
            const isSingle = pdf.numPages === 1 && state.pdfJpgFiles.length === 1;
            const zip = isSingle ? null : new JSZip();

            for(let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++){
                setProgress(
                    ((pageNumber - 1) / pdf.numPages) * 100,
                    `Rendering page ${pageNumber} of ${pdf.numPages}...`
                );

                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale });
                const canvas = document.createElement("canvas");
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const context = canvas.getContext("2d");
                context.fillStyle = "#ffffff";
                context.fillRect(0, 0, canvas.width, canvas.height);

                await page.render({
                    canvasContext: context,
                    viewport
                }).promise;

                const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
                const filename = `${base}-page-${pageNumber}.jpg`;

                if(isSingle){
                    downloadBlob(blob, filename);
                } else {
                    zip.file(filename, blob);
                }
            }

            if(!isSingle){
                setProgress(95, "Zipping images...");
                const zipBlob = await zip.generateAsync({ type: "blob" });
                downloadBlob(zipBlob, `${base}-images.zip`);
            }
        }

        setProgress(100, "Done!");
        toast("PDF converted successfully!");
    } catch(err) {
        console.error(err);
        toast("Error converting PDF: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// JPG TO PDF
async function createJPGPDF(){
    if(!state.jpgPdfFiles?.length){
        toast("Please select images.");
        return;
    }

    const btn = document.getElementById("createJPGPDF");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Creating PDF...`; }

    try {
        const size = document.getElementById("pageSize").value;
        const selectedOrientation = document.getElementById("orientation").value;
        let pdf = null;

        for(let i = 0; i < state.jpgPdfFiles.length; i++){
            setProgress(
                (i / state.jpgPdfFiles.length) * 100,
                `Processing image ${i + 1} of ${state.jpgPdfFiles.length}...`
            );

            const file = state.jpgPdfFiles[i];
            const img = await loadImage(file);
            const data = await readDataURL(file);

            let orientation = selectedOrientation;
            if(orientation === "auto"){
                orientation = img.width >= img.height ? "landscape" : "portrait";
            }

            const imgFormat = file.type === "image/png" ? "PNG" : file.type === "image/webp" ? "WEBP" : "JPEG";

            if(i === 0){
                pdf = new jsPDF({
                    orientation,
                    unit: size === "fit" ? "px" : "mm",
                    format: size === "fit" ? [img.width, img.height] : size
                });
            } else {
                pdf.addPage(
                    size === "fit" ? [img.width, img.height] : size,
                    orientation
                );
            }

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
            const width = img.width * ratio;
            const height = img.height * ratio;

            pdf.addImage(
                data,
                imgFormat,
                (pageWidth - width) / 2,
                (pageHeight - height) / 2,
                width,
                height
            );
        }

        setProgress(100, "Done!");
        pdf.save("images-to-pdf.pdf");
        toast("PDF created successfully!");
    } catch(err) {
        console.error(err);
        toast("Error creating PDF: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// SCREENSHOT TO PDF
async function screensToPDF(){
    if(!state.screenshotFiles?.length){
        toast("Please select images.");
        return;
    }

    const btn = document.getElementById("screensToPDF");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Creating PDF...`; }

    try {
        const size = document.getElementById("screenshotPage").value;
        let pdf = null;

        for(let i = 0; i < state.screenshotFiles.length; i++){
            setProgress(
                (i / state.screenshotFiles.length) * 100,
                `Processing capture ${i + 1} of ${state.screenshotFiles.length}...`
            );

            const file = state.screenshotFiles[i];
            const image = await loadImage(file);
            const data = await readDataURL(file);

            const orientation = image.width >= image.height ? "landscape" : "portrait";
            const imgFormat = file.type === "image/png" ? "PNG" : file.type === "image/webp" ? "WEBP" : "JPEG";

            if(i === 0){
                pdf = new jsPDF({
                    orientation,
                    unit: size === "fit" ? "px" : "mm",
                    format: size === "fit" ? [image.width, image.height] : "a4"
                });
            } else {
                pdf.addPage(
                    size === "fit" ? [image.width, image.height] : "a4",
                    orientation
                );
            }

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const ratio = Math.min(pageWidth / image.width, pageHeight / image.height);
            const width = image.width * ratio;
            const height = image.height * ratio;

            pdf.addImage(
                data,
                imgFormat,
                (pageWidth - width) / 2,
                (pageHeight - height) / 2,
                width,
                height
            );
        }

        setProgress(100, "Done!");
        pdf.save("screenshots.pdf");
        toast("PDF created successfully!");
    } catch(err) {
        console.error(err);
        toast("Error creating PDF: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// IMAGES TO ZIP
async function imagesToZip(){
    if(!state.zipImages?.length){
        toast("Please select images.");
        return;
    }

    const btn = document.getElementById("imagesToZip");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Zipping...`; }

    try {
        const zip = new JSZip();
        const usedNames = new Set();

        state.zipImages.forEach(file => {
            let filename = file.name;
            let counter = 1;
            while(usedNames.has(filename)){
                const dotIdx = file.name.lastIndexOf(".");
                if(dotIdx !== -1){
                    filename = file.name.substring(0, dotIdx) + `_${counter}` + file.name.substring(dotIdx);
                } else {
                    filename = `${file.name}_${counter}`;
                }
                counter++;
            }
            usedNames.add(filename);
            zip.file(filename, file);
        });

        setProgress(50, "Generating ZIP...");
        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, "images.zip");
        setProgress(100, "Done!");
        toast("ZIP created successfully!");
    } catch(err) {
        console.error(err);
        toast("Error creating ZIP: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// PDF TO ZIP
async function pdfsToZip(){
    if(!state.zipPDFs?.length){
        toast("Please select PDFs.");
        return;
    }

    const btn = document.getElementById("pdfsToZip");
    const origHTML = btn ? btn.innerHTML : "";
    if(btn){ btn.disabled = true; btn.innerHTML = `Zipping...`; }

    try {
        const zip = new JSZip();
        const usedNames = new Set();

        state.zipPDFs.forEach(file => {
            let filename = file.name;
            let counter = 1;
            while(usedNames.has(filename)){
                const dotIdx = file.name.lastIndexOf(".");
                if(dotIdx !== -1){
                    filename = file.name.substring(0, dotIdx) + `_${counter}` + file.name.substring(dotIdx);
                } else {
                    filename = `${file.name}_${counter}`;
                }
                counter++;
            }
            usedNames.add(filename);
            zip.file(filename, file);
        });

        setProgress(50, "Generating ZIP...");
        const blob = await zip.generateAsync({ type: "blob" });
        downloadBlob(blob, "pdf-files.zip");
        setProgress(100, "Done!");
        toast("ZIP created successfully!");
    } catch(err) {
        console.error(err);
        toast("Error creating ZIP: " + err.message);
    } finally {
        if(btn){ btn.disabled = false; btn.innerHTML = origHTML; }
    }
}

// PRINT TO PDF
function printToPDF(){
    const content = document.getElementById("printContent")?.value || "";
    const title = document.getElementById("printTitle")?.value || "My Document";
    const fontSize = Number(document.getElementById("printSize")?.value) || 16;

    if(!content.trim()){
        toast("Enter some content first.");
        return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if(!printWindow){
        toast("Please allow popups to open the print dialog.");
        return;
    }

    const safeTitle = escapeHTML(title);
    const safeContent = escapeHTML(content);

    const html =
        "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        "<meta charset='UTF-8'>" +
        "<title>" + safeTitle + "</title>" +
        "<style>" +
        "body{font-family:'Plus Jakarta Sans',Arial,sans-serif;padding:48px;line-height:1.75;font-size:" + fontSize + "px;white-space:pre-wrap;color:#0f172a;}" +
        "@media print{body{padding:0;}}" +
        "</style>" +
        "</head>" +
        "<body>" + safeContent + "</body>" +
        "</html>";

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    setTimeout(() => {
        try {
            printWindow.focus();
            printWindow.print();
        } catch(e){
            console.error(e);
        }
    }, 300);
}

/* =========================================================
   PAGE INITIALIZATION
========================================================= */
function initPage(toolId, isHomePage = false){
    currentTool = toolId;
    isHome = isHomePage;

    const tool = tools.find(t => t.id === toolId) || tools[0];

    // Set page title if on a dedicated page
    if(!isHomePage){
        document.title = `${tool.name} — SoVault`;
    }

    // Render tool header & body
    const titleEl = document.getElementById("toolTitle");
    const descEl = document.getElementById("toolDescription");
    const bodyEl = document.getElementById("toolBody");

    if(titleEl) titleEl.textContent = tool.name;
    if(descEl) descEl.textContent = tool.desc;
    if(bodyEl) bodyEl.innerHTML = getToolHTML(tool.id);

    hideProgress();
    bindTool(tool.id);
    renderNav(tool.id);
}
