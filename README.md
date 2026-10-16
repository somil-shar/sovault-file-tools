<div align="center">

# 🚀 SoVault

### *Private, Fast, & Browser-Based PDF & File Utility Suite*

[![Netlify Status](https://api.netlify.com/api/v1/badges/sovault/deploy-status)](https://sovault.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Privacy: Zero Telemetry](https://img.shields.io/badge/Privacy-Zero%20Telemetry-brightgreen.svg)](#-privacy--security)

**[🌐 Live Demo](https://sovault.netlify.app/)** • **[✨ Features](#-key-features)** • **[🛠️ Tech Stack](#️-tech-stack)** • **[🚀 Quickstart](#-getting-started)**

</div>

---

## 📌 Overview

**SoVault** is a lightweight, high-performance web application deployed on Netlify that provides a full suite of PDF and document manipulation tools. 

Unlike traditional web tools, SoVault operates with **Zero Telemetry** and **100% Client-Side Processing**. Your files are processed entirely in your browser using modern JavaScript engines and Canvas APIs—meaning **your sensitive files never touch a server**.

---

## ✨ Key Features

* 📄 **PDF Merging & Splitting:** Combine multiple PDFs into a single file or extract specific pages instantly.
* ⚡ **PDF Compression & Optimization:** Reduce file size while preserving document quality.
* 🔄 **Page Rotation & Reordering:** Reorient individual pages or rearrange page order seamlessly.
* 🖼️ **Image & PDF Conversions:** Convert image formats and convert images to PDF or vice versa.
* 🔒 **100% Client-Side Privacy:** Zero file uploads, zero analytics tracking, zero server logs.

---

## 🔒 Privacy & Security

> **Your files never leave your device.**

* **No Server Uploads:** All processing runs locally using your browser's V8 engine and Canvas 2D API.
* **Zero Telemetry:** No analytics, no user tracking, and no database persistence.
* **Offline Capable:** Works smoothly without sending any document data across the web.

---

## 🛠️ Tech Stack & Dependencies

SoVault leverages powerful web libraries to achieve desktop-class file manipulation directly in the browser:

| Category | Technologies / Libraries Used |
| :--- | :--- |
| **Frontend Core** | HTML5, CSS3, JavaScript (ES6+), Python |
| **PDF Processing** | `PDF-Lib` (v1.17), `PDF.js` (v3.11), `jsPDF` (v2.5) |
| **Archiving & Utilities** | `JSZip` (v3.10), Canvas 2D API |
| **Deployment & Hosting** | [Netlify](https://sovault.netlify.app/) |

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### Prerequisites
* Any modern web browser (Chrome, Firefox, Edge, Safari)
* A simple HTTP server (like VS Code `Live Server`, Python `http.server`, or `http-server` via Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/sovault.git](https://github.com/your-username/sovault.git)
   cd sovault
