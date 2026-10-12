"use client";

import React, { useRef, useState, useEffect } from "react";

// ==========================================
// KAMUS TERJEMAHAN (DICTIONARY)
// ==========================================
const dict = {
  id: {
    nav: { home: "Beranda", experience: "Pengalaman", projects: "Projek", skills: "Keahlian", contact: "Kontak" },
    sectionExp: {
      titleExp: "Pengalaman",
      subExp: "Perjalanan karier dan magang profesional.",
      titleEdu: "Pendidikan",
      subEdu: "Latar belakang akademik dan sertifikasi.",
      highlight: "Sorotan:",
    },
    sectionProj: {
      title: "Karya & Portofolio",
      sub: "Eksplorasi solusi enterprise dan riset open-source saya.",
      btnDemo: "Live Demo",
      btnRepo: "Repositori GitHub",
      btnCaseStudy: "Lihat Studi Kasus",
      tabEnterprise: "🏢 Enterprise & NDA",
      tabPersonal: "💻 Open Source & Riset",
      closeModal: "Tutup"
    },
    sectionSkills: {
      title: "Keahlian Utama",
      desc: "Sebagai seorang AI Engineer, saya mengombinasikan keahlian di bidang Artificial Intelligence, Robotic Process Automation (RPA), dan Infrastruktur IT untuk merancang serta mengimplementasikan ekosistem digital end-to-end yang tangguh dan otomatis.",
    },
    footer: "Hak cipta dilindungi undang-undang.",
    
    skillsData: [
      { title: "AI & Machine Learning", items: ["Machine Learning", "Deep Learning", "YOLO", "Image Annotation", "Riset Model AI", "Dev Model AI ke Web & Mobile"] },
      { title: "Robotic Process Automation", items: ["Microsoft Power Automate", "Automation Anywhere", "UiPath"] },
      { title: "Intelligent Automation", items: ["Python", "n8n", "Docker", "API Integration", "Go (Golang 1.25)", "ETL Pipeline", "Self-Healing Architecture", "Rate Limiting"] },
      { title: "ERP & System Integration", items: ["Dynamics 365 BC (OData V4)", "Google Workspace APIs", "DingTalk REST API", "WhatsApp API", "xlwings", "pandas"] },
      { title: "IT Infrastructure", items: ["Mikrotik & Subnet IP", "Instalasi OS (Win, Linux, Mac)", "Instalasi Software", "Instalasi WiFi"] }
    ],

    experienceData: [
      { role: "ERP AI Specialist", company: "Allure (Divisi AI ERP)", period: "Jun 2025 - Sekarang", desc: "Merancang ekosistem otomasi skala enterprise dengan arsitektur 3-Layer (Python/FastAPI) dan microservices n8n. Terintegrasi dengan Microsoft Dynamics 365 dan database manufaktur.", tags: ["FastAPI", "n8n", "Microservices", "ERP"] },
      { role: "AI Engineer (Internship)", company: "PT Dago Engineering", period: "Agt 2024 - Des 2024", desc: "Membangun pipeline Machine Learning end-to-end untuk segmentasi citra. Mengembangkan model Mobile U-Net dan ResNet-50 hingga tahap deployment. Lulus dengan predikat 'Sangat Baik'.", tags: ["Computer Vision", "Deep Learning", "Streamlit"] },
      { role: "Machine Learning Specialist", company: "Bangkit Academy", period: "Feb 2024 - Jul 2024", desc: "Mengembangkan sistem rekomendasi Content-Based Filtering dan mengonversi model H5 ke TFLite/TensorFlow.js. Meraih predikat Distinction Graduate.", tags: ["TensorFlow", "NLP", "Machine Learning"] },
      { role: "IT Support (Internship)", company: "SMA Negeri 1 Cibinong", period: "Jan 2016 - Mei 2016", desc: "Memberikan dukungan teknis dan pemeliharaan komputer. Mengonfigurasi jaringan LAN/WLAN sekolah (TCP/IP) guna meningkatkan konektivitas.", tags: ["LAN-WAN", "TCP/IP", "Maintenance"] }
    ],
    educationData: [
      { degree: "S1 Ilmu Komputer", institution: "Universitas Pendidikan Ganesha", period: "2021 - 2025", gpa: "IPK: 3.96/4.00", desc: "Fokus penelitian pada Deep Learning dan Computer Vision. Mengerjakan Tugas Akhir Analisis Komparatif Model Semantic Segmentation untuk deteksi korosi pipa industri." },
      { degree: "Teknik Komputer dan Jaringan", institution: "SMK Negeri 1 Cibinong", period: "2018 - 2020", gpa: "Sertifikasi BNSP & Cisco", desc: "Membangun pondasi keahlian infrastruktur IT. Meraih Sertifikat Kompetensi BNSP KKNI Level II serta menyelesaikan sertifikasi Cisco CCNA." }
    ],
    projectData: [
      // KATEGORI: ENTERPRISE (Internal Work)
      { 
        type: "enterprise", 
        title: "Pipeline End-to-End AUTO RPO FG", 
        desc: "Orkestrasi Python berskala besar untuk otomasi pembuatan RPO. Melakukan kalkulasi BOM, scrap efficiency, hingga post Master Item ke ERP.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• File Parsing: Script Python membaca dan mengekstrak tabel kompleks dari dokumen manufaktur mentah (.xls/.xlsx) menggunakan library `xlwings` dan `pandas`.\n• Transformasi Data: Menghitung persentase efisiensi bahan (Scrap %) dan meracik ulang struktur Bill of Materials (BOM) agar sesuai dengan skema relational database ERP.\n• Sequential API Posting: Mengeksekusi rangkaian HTTP POST/PATCH terstruktur ke ERP (OData V4) untuk membuat entitas secara berurutan: Master Item -> Routing -> Production BOM -> RPO Header -> RPO Line.\n• Fault Tolerance (Ketahanan): Mengimplementasikan 'Checkpoint System'. Sebelum melakukan POST, script melakukan kueri (GET) untuk mengecek eksistensi data. Jika koneksi terputus di tengah jalan, script dapat di-resume tanpa menyebabkan duplikasi data di ERP.", 
        github: "", 
        demo: "", 
        tags: ["Python", "xlwings", "ERP", "Data Pipeline"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO TO ALU (Otomasi Transfer Order Aluminium)", 
        desc: "Sistem otomasi skala enterprise menghubungkan 25-26 modul Flask REST API dan orkestrasi microservices n8n untuk Transfer Order Aluminium.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• Orkestrasi Microservices: Mengoordinasikan 25-26 modul Flask REST API terpisah melalui 48 node workflow n8n secara terpusat.\n• Multi-Sistem Integration: Mengintegrasikan trigger HTTP terjadwal, autentikasi OAuth2 Google, proxy OData V4 Business Central, serta payload dinamis ke API Bot WhatsApp dalam satu siklus eksekusi.\n• Keandalan Tinggi: Mengotomatiskan siklus eksekusi data logistik manufaktur secara presisi dan real-time.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Flask", "n8n", "Business Central", "WhatsApp API"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO TO ACC 2026 (Otomasi TO & Item Request Aksesoris)", 
        desc: "Sistem otomasi Transfer Order dan Item Request Aksesoris berbasis Flask API dengan arsitektur self-healing dan sparse payload.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• Arsitektur Self-Healing: Mengoperasikan 18 modul Flask API melalui workflow n8n yang mampu mendeteksi dan memulihkan ketidaksinkronan data secara otomatis.\n• Sparse Payload Optimization: Mengoptimalkan transmisi data web secara presisi dengan mengirimkan field wajib ke Business Central dan field opsional hanya jika bernilai nyata.\n• Integritas Transaksi: Menjamin konsistensi data transaksi aksesoris manufaktur secara efisien dan andal.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Flask", "n8n", "Self-Healing", "Business Central"] 
      },
      { 
        type: "enterprise", 
        title: "Pengecekan Hasil Otomasi TO dan RPO FG", 
        desc: "Sistem batch backend menggunakan Golang untuk mengaudit secara silang hasil eksekusi otomasi produksi dengan database ERP.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• Ekstraksi Data: Sistem (ditulis dalam Golang untuk performa konkurensi tinggi) menarik populasi data harian dari sumber produksi.\n• API Integration: Melakukan HTTP GET requests secara paralel via OData V4 API ke endpoint ERP Microsoft Dynamics 365 Business Central.\n• Rekonsiliasi & Logika Bisnis: Membandingkan ID dokumen sumber dengan respons ERP untuk mendeteksi 'Missing Data' atau kegagalan posting.\n• Self-Healing: Jika ditemukan data yang belum ter-posting namun sudah lewat batas waktu (delay threshold), sistem memicu proses re-query cerdas pada hari berikutnya.\n• Reporting: Hasil audit diolah menggunakan library Pandas (Python) / native Go structs menjadi format HTML matriks warna (Merah = Gagal, Hijau = Sukses), lalu dikirim otomatis via Google Workspace Gmail API menggunakan Service Account Auth.", 
        github: "", 
        demo: "", 
        tags: ["Go", "Business Central API", "GCP", "Self-Healing"] 
      },
      { 
        type: "enterprise", 
        title: "Modul ETL DingTalk NCR", 
        desc: "Sistem ekstraksi data dari platform DingTalk dengan penanganan token caching, rate limit, dan operasi Upsert dinamis ke database laporan.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• Authentication: Menggunakan mekanisme OAuth Desktop Authentication untuk merotasi dan melakukan caching akses token dari DingTalk OA API.\n• Resilient Fetching: Membangun fungsi kueri yang dilengkapi paginasi otomatis dan Rate Limiting (Exponential Backoff) untuk menarik ribuan record Non Conformity Record (NCR) tanpa terkena blokir server (429 Too Many Requests).\n• Deep JSON Parsing: Mengekstrak struktur nested JSON untuk mengambil data vital, riwayat persetujuan (approval layers), dan tautan lampiran dokumen.\n• Dynamic Upsert: Melakukan rekonsiliasi data ke spreadsheet menggunakan logika Upsert (Update if exists, Insert if new) berdasar Primary Key, sehingga mencegah duplikasi baris sembari mempertahankan kolom kustom yang ditambahkan manual oleh pengguna.", 
        github: "", 
        demo: "", 
        tags: ["Python", "DingTalk API", "ETL", "JSON Parsing"] 
      },
      { 
        type: "enterprise", 
        title: "Sistem Otomasi AUTO KACA", 
        desc: "Arsitektur 11 skrip Python terintegrasi yang mengatur workflow produksi kaca dari file mentah menjadi Sales Order, lengkap dengan notifikasi WhatsApp.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• State Management: Tidak menggunakan SQL, melainkan mengadopsi Google Sheets API (OAuth2) sebagai 'Single Source of Truth' dan basis data dinamis penggerak alur kerja.\n• Modular Execution: Terdiri dari 11 skrip Python yang dieksekusi berdasarkan trigger perubahan status kolom tanggal (Timestamp validation) di spreadsheet.\n• ETL Process: Mengekstrak dokumen, mentransformasi dimensi/ukuran material, dan memuatnya ke ERP sebagai Work Order (WO) dan Purchase Request (PR).\n• Real-time Alerting: Terintegrasi dengan WhatsApp Web API (menggunakan Selenium/Request) untuk mengirimkan notifikasi interaktif kepada tim manajemen finansial setiap kali satu fase eksekusi berhasil atau gagal.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Google Sheets API", "WhatsApp API", "State Management"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO PANEL (Otomasi Pipeline Item Card, BOM, & RPO)", 
        desc: "State machine Python berskala besar untuk otomasi pembuatan Item Card, BOM, dan RPO di Microsoft Dynamics 365 Business Central.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• State Machine Architecture: Terdiri dari 19 skrip Python terstruktur yang bertindak sebagai state machine canggih untuk otomasi ERP.\n• Date Gates Logic: Memanfaatkan pasangan kolom tanggal di Google Sheets sebagai gerbang logika (gate) untuk membaca status keberhasilan operasi POST API sebelumnya.\n• Controlled Execution: Memastikan baris data produksi hanya dieksekusi ke fase berikutnya jika fase sebelumnya terverifikasi sukses secara otomatis.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Google Sheets API", "Business Central", "Automation"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO NEW DIES (Pembuatan Section, UoM, Routing & BOM)", 
        desc: "Pipeline multiskrip untuk sinkronisasi master data dies secara simultan antar Google Drive, Google Sheets, dan proxy OData V4 ERP.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• Multi-Source Sync: Pipeline 14 skrip yang menyinkronkan pembuatan Section, Item, UoM, Routing, dan BOM secara paralel.\n• ETag Validation: Menangani header HTTP tingkat lanjut, termasuk pengambilan dan penyisipan ETag untuk memvalidasi operasi PATCH (Status=Certified) pada entity ERP.\n• Data Integrity: Menjaga integritas relasional master data manufaktur baru dengan validasi ketat.", 
        github: "", 
        demo: "", 
        tags: ["Python", "OData V4", "Google Drive API", "ERP Integration"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO RPO PCT (Pipeline Otomasi Produksi Kompleks)", 
        desc: "Pipeline data kompleks yang melibatkan puluhan skrip Python, manajemen rate limit otomatis, dan interaksi multi-endpoint Business Central.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• Complex Pipeline: Melibatkan 27 file Python (1 orkestrator, 22 skrip fungsional, dan 4 modul pendukung) untuk memanipulasi 12 Google Sheets serta berinteraksi dengan 11 endpoint API Business Central.\n• Rate Limit Management: Manajemen pembatasan rate limit secara otomatis dengan jeda 60 detik untuk operasi POST/PATCH.\n• Interleaved Execution: Eksekusi wajib berselang-seling karena data turunan di BC harus dibaca kembali sebelum melakukan POST berikutnya.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Google Sheets", "Business Central API", "Rate Limiting"] 
      },
      { 
        type: "enterprise", 
        title: "Automasi Data BC – Planning MRP", 
        desc: "Arsitektur Python runner-worker untuk ekstraksi dan kalkulasi stok berantai (cascading) dari endpoint OData Business Central.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• Runner-Worker Architecture: Menggunakan 8 skrip Python terbagi menjadi peran runner dan worker untuk mengekstrak data manajemen stok.\n• Cascading Calculation: Kalkulasi stok berantai per Item No secara internal, di mana sisa hitungan pada satu baris langsung dialokasikan menjadi modal awal baris berikutnya.\n• MRP Optimization: Meningkatkan kecepatan analisis perencanaan material perusahaan secara akurat.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Business Central", "MRP", "ETL Pipeline"] 
      },
      { 
        type: "enterprise", 
        title: "Get Data Eprod FG (Pipeline ETL MariaDB ke Google Drive)", 
        desc: "Sistem otomatisasi ekstraksi 4 lapis untuk menarik data pesanan produksi mentah dari database eProd ke Google Drive.", 
        detail: "Alur Kerja & Implementasi Teknis:\n• 4-Layer Extraction: Arsitektur sistem yang mencakup Pemicu, Penjadwal, Orkestrator, dan Skrip ETL.\n• Data Transformation: Membersihkan dan mengubah bentuk data pesanan produksi mentah dari MariaDB menjadi format file Excel terstruktur.\n• Automated Upload: Mengunggah laporan operasional menggunakan Google Drive API secara berkala untuk kebutuhan tim Cutting Optimize.", 
        github: "", 
        demo: "", 
        tags: ["Python", "MariaDB", "Google Drive API", "ETL Pipeline"] 
      },
      
      // KATEGORI: PERSONAL (Open Source / Research)
      { type: "personal", title: "BasaNusantara", desc: "Platform interaktif untuk melestarikan dan mengeksplorasi bahasa-bahasa di Nusantara.", github: "https://github.com/DavidMarioYS/BasaNusantara", demo: "https://basanusantara.vercel.app/", tags: ["Web", "Next.js"] },
      { type: "personal", title: "SmrtPhn", desc: "AI Recommender untuk spesifikasi smartphone berdasarkan kebutuhan teknis.", github: "https://github.com/DavidMarioYS/SmartPhn", demo: "https://smart-phn-syqd.vercel.app/", tags: ["Local LLM", "Python"] },
      { type: "personal", title: "DMNet-app", desc: "Networking utility tool untuk membantu profesional IT dan pelajar.", github: "https://github.com/DavidMarioYS/DMNet-app", demo: "https://dm-net-app.vercel.app/", tags: ["Networking", "Vercel"] },
      { type: "personal", title: "Kai Chatbot", desc: "Asisten AI interaktif dengan antarmuka chatbot.", github: "https://github.com/DavidMarioYS/kai-chatbot", demo: "https://davidmarioys.github.io/kai-chatbot/", tags: ["Chatbot", "AI"] },
      { type: "personal", title: "Jadwal Piket", desc: "Generator otomatis pembagian jadwal piket mingguan.", github: "https://github.com/DavidMarioYS/Jadwal-Piket-Mingguan-Generator", demo: "https://davidmarioys.github.io/Jadwal-Piket-Mingguan-Generator/", tags: ["Automation", "Web"] },
      { type: "personal", title: "Toba Welder", desc: "Sistem otomatisasi pemberkasan untuk pembuatan kwitansi dan struk bukti pembayaran.", github: "https://github.com/DavidMarioYS/Toba-Welder", demo: "", tags: ["Automation", "AI"] },
      { type: "personal", title: "CV Analysis n8n", desc: "Otomasi scoring CV menggunakan n8n dan Google Gemini.", github: "https://github.com/DavidMarioYS/Automation-CV-Analysis-Scoring-Pipeline-n8n-Google-Gemini", demo: "", tags: ["n8n", "Gemini AI"] },
      { type: "personal", title: "Bottle Detection", desc: "Klasifikasi jenis botol (YOLOv8 & MobileNetV2).", github: "https://github.com/DavidMarioYS/Computer-Vision-Project-Deteksi-Klasifikasi-Jenis-Botol-Menggunakan-YOLOv8-dan-MobileNetV2", demo: "", tags: ["YOLOv8", "Deep Learning"] },
      { type: "personal", title: "Corrosion Thesis", desc: "Segmentasi citra untuk deteksi korosi pipa (Thesis).", github: "https://github.com/DavidMarioYS/Thesis-Project-Corrosion-Pipes-Image-Segmentation", demo: "", tags: ["Segmentation", "Research"] },
      { type: "personal", title: "KNN Laptop", desc: "Prediksi tipe laptop dengan algoritma KNN.", github: "https://github.com/DavidMarioYS/KNN-Prediksi-Type-Laptop", demo: "", tags: ["Machine Learning", "Python"] },
      { type: "personal", title: "Greedy THR", desc: "Implementasi algoritma Greedy untuk optimasi pembagian Tunjangan Hari Raya (THR).", github: "https://github.com/DavidMarioYS/Greedy-THR", demo: "", tags: ["Algorithm", "Python"] },
      { type: "personal", title: "Bangkit Project: NoD", desc: "Sistem rekomendasi Content-Based Filtering. Capstone project di Bangkit Academy.", github: "https://github.com/DavidMarioYS/Bangkit-Project-NoD", demo: "", tags: ["Machine Learning", "TensorFlow"] },
      { type: "personal", title: "PesoNa Sulawesi", desc: "Sistem rekomendasi destinasi wisata di Sulawesi sesuai preferensi user.", github: "https://github.com/DavidMarioYS/Projek-PesoNa-Sulawesi-Sistem-Rekomendasi-Wisata", demo: "", tags: ["Recommender", "Web"] },
      { type: "personal", title: "Heart Disease Classification", desc: "Projek klasifikasi penyakit jantung menggunakan algoritma Machine Learning.", github: "https://github.com/DavidMarioYS/Projek_Klasifikasi_Penyakit_Jantung", demo: "", tags: ["Classification", "Data Science"] }
    ]
  },
  en: {
    nav: { home: "Home", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Let's Talk" },
    sectionExp: {
      titleExp: "Experience",
      subExp: "Professional career and internship journey.",
      titleEdu: "Education",
      subEdu: "Academic background and certifications.",
      highlight: "Highlight:",
    },
    sectionProj: {
      title: "Works & Portfolios",
      sub: "Exploring my enterprise solutions and open-source research.",
      btnDemo: "Live Demo",
      btnRepo: "GitHub Repository",
      btnCaseStudy: "View Case Study",
      tabEnterprise: "🏢 Enterprise & NDA",
      tabPersonal: "💻 Open Source & Research",
      closeModal: "Close"
    },
    sectionSkills: {
      title: "Core Expertise",
      desc: "As an AI Engineer, I combine my expertise in Artificial Intelligence, Robotic Process Automation (RPA), and IT Infrastructure to design and implement robust, end-to-end automated digital ecosystems.",
    },
    footer: "All rights reserved.",

    skillsData: [
      { title: "AI & Machine Learning", items: ["Machine Learning", "Deep Learning", "YOLO", "Image Annotation", "AI Research", "Web & Mobile AI Dev"] },
      { title: "Robotic Process Automation", items: ["Microsoft Power Automate", "Automation Anywhere", "UiPath"] },
      { title: "Intelligent Automation", items: ["Python", "n8n", "Docker", "API Integration", "Go (Golang 1.25)", "ETL Pipeline", "Self-Healing Architecture", "Rate Limiting"] },
      { title: "ERP & System Integration", items: ["Dynamics 365 BC (OData V4)", "Google Workspace APIs", "DingTalk REST API", "WhatsApp API", "xlwings", "pandas"] },
      { title: "IT Infrastructure", items: ["Mikrotik & Subnetting", "OS (Win, Linux, Mac)", "Software Installation", "WiFi Installation"] }
    ],

    experienceData: [
      { role: "ERP AI Specialist", company: "Allure (AI ERP Division)", period: "Jun 2025 - Present", desc: "Engineered an enterprise-scale automation ecosystem using a 3-Layer Architecture (Python/FastAPI) and n8n microservices. Integrated with Microsoft Dynamics 365 and manufacturing databases.", tags: ["FastAPI", "n8n", "Microservices", "ERP"] },
      { role: "AI Engineer (Internship)", company: "PT Dago Engineering", period: "Aug 2024 - Dec 2024", desc: "Built an end-to-end Machine Learning pipeline for image segmentation. Developed Mobile U-Net and ResNet-50 models through to deployment. Graduated with an 'Outstanding' predicate.", tags: ["Computer Vision", "Deep Learning", "Streamlit"] },
      { role: "Machine Learning Specialist", company: "Bangkit Academy", period: "Feb 2024 - Jul 2024", desc: "Developed a Content-Based Filtering recommendation system and converted H5 models to TFLite/TensorFlow.js. Achieved Distinction Graduate status.", tags: ["TensorFlow", "NLP", "Machine Learning"] },
      { role: "IT Support (Internship)", company: "SMA Negeri 1 Cibinong", period: "Jan 2016 - May 2016", desc: "Provided technical support and computer maintenance. Configured school LAN/WLAN networks (TCP/IP) to optimize connectivity.", tags: ["LAN-WAN", "TCP/IP", "Maintenance"] }
    ],
    educationData: [
      { degree: "B.Sc. in Computer Science", institution: "Universitas Pendidikan Ganesha", period: "2021 - 2025", gpa: "GPA: 3.96/4.00", desc: "Research focused on Deep Learning and Computer Vision. Completed Thesis on Comparative Analysis of Semantic Segmentation Models for industrial pipeline corrosion detection." },
      { degree: "Computer and Network Engineering", institution: "SMK Negeri 1 Cibinong", period: "2018 - 2020", gpa: "BNSP & Cisco Certified", desc: "Built a strong foundation in IT infrastructure. Earned BNSP KKNI Level II Competency Certificate and completed Cisco CCNA certification." }
    ],
    projectData: [
      // KATEGORI: ENTERPRISE (Internal Work)
      { 
        type: "enterprise", 
        title: "End-to-End Pipeline AUTO RPO FG", 
        desc: "Large-scale Python orchestration automating RPO creation. Handles BOM calculation, scrap efficiency, and Master Item posting to ERP.", 
        detail: "Workflow & Technical Implementation:\n• File Parsing: Python scripts read and extract complex tables from raw manufacturing documents (.xls/.xlsx) using `xlwings` and `pandas`.\n• Data Transformation: Calculates material efficiency percentages (Scrap %) and re-engineers Bill of Materials (BOM) structures to fit the relational ERP schema.\n• Sequential API Posting: Executes structured HTTP POST/PATCH sequences to the ERP (OData V4) to create entities chronologically: Master Item -> Routing -> Production BOM -> RPO Header -> RPO Line.\n• Fault Tolerance: Implements a 'Checkpoint System'. Before executing a POST, the script queries (GET) to verify data existence. If disconnected mid-process, the script resumes without causing duplicate ERP entries.", 
        github: "", 
        demo: "", 
        tags: ["Python", "xlwings", "ERP", "Data Pipeline"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO TO ALU (Aluminum Transfer Order Automation)", 
        desc: "Enterprise automation system connecting 25-26 Flask REST API modules and n8n microservices orchestration for Aluminum Transfer Orders.", 
        detail: "Workflow & Technical Implementation:\n• Microservices Orchestration: Coordinates 25-26 separate Flask REST API modules through 48 centralized n8n workflow nodes.\n• Multi-System Integration: Integrates scheduled HTTP triggers, Google OAuth2 authentication, Business Central OData V4 proxy, and dynamic WhatsApp Bot API payloads.\n• High Reliability: Fully automates manufacturing logistics data execution cycles precisely and in real-time.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Flask", "n8n", "Business Central", "WhatsApp API"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO TO ACC 2026 (TO & Accessory Request Automation)", 
        desc: "Transfer Order and Accessory Item Request automation system built with Flask APIs featuring self-healing architecture and sparse payloads.", 
        detail: "Workflow & Technical Implementation:\n• Self-Healing Architecture: Operates 18 Flask API modules via n8n workflows capable of detecting and recovering data out-of-sync states automatically.\n• Sparse Payload Optimization: Optimizes web data transmission precisely by sending mandatory fields to Business Central and optional fields only when they contain actual values.\n• Transaction Integrity: Ensures consistency of manufacturing accessory transactions efficiently and reliably.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Flask", "n8n", "Self-Healing", "Business Central"] 
      },
      { 
        type: "enterprise", 
        title: "TO and RPO FG Automation Audit System", 
        desc: "A backend batch system using Golang to cross-audit production automation execution results with the ERP database.", 
        detail: "Workflow & Technical Implementation:\n• Data Extraction: The system (written in high-concurrency Golang) pulls daily data populations from production sources.\n• API Integration: Executes parallel HTTP GET requests via OData V4 API to Microsoft Dynamics 365 Business Central ERP endpoints.\n• Reconciliation & Logic: Compares source document IDs with ERP responses to detect 'Missing Data' or posting failures.\n• Self-Healing: If unposted data is found past the delay threshold, the system triggers an intelligent re-query process the following day.\n• Reporting: Audit results are processed into an HTML color matrix (Red = Failed, Green = Success) using Pandas/Go structs and dispatched automatically via Gmail API using Service Account Auth.", 
        github: "", 
        demo: "", 
        tags: ["Go", "Business Central API", "GCP", "Self-Healing"] 
      },
      { 
        type: "enterprise", 
        title: "DingTalk NCR ETL Module", 
        desc: "Data extraction module for DingTalk platform featuring token caching, rate limiting handling, and dynamic Upsert operations to spreadsheets.", 
        detail: "Workflow & Technical Implementation:\n• Authentication: Utilizes OAuth Desktop Authentication to rotate and cache access tokens from the DingTalk OA API.\n• Resilient Fetching: Built a query function equipped with automatic pagination and Rate Limiting (Exponential Backoff) to extract thousands of Non Conformity Records (NCR) without encountering 429 Too Many Requests blocks.\n• Deep JSON Parsing: Parses nested JSON structures to extract vital data, approval layers history, and document attachment links.\n• Dynamic Upsert: Reconciles data into a spreadsheet using Upsert logic (Update if exists, Insert if new) based on Primary Keys, preventing row duplication while preserving custom columns added manually by users.", 
        github: "", 
        demo: "", 
        tags: ["Python", "DingTalk API", "ETL", "JSON Parsing"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO KACA Automation System", 
        desc: "11 integrated scripts managing glass production workflows from raw documents to Sales Orders with spreadsheet state management & WhatsApp notifications.", 
        detail: "Workflow & Technical Implementation:\n• State Management: Bypasses SQL databases, adopting Google Sheets API (OAuth2) as the 'Single Source of Truth' and dynamic database driving the workflow.\n• Modular Execution: Comprises 11 Python scripts triggered by date column status changes (Timestamp validation) in the spreadsheet.\n• ETL Process: Extracts documents, transforms material dimensions, and loads them into the ERP as Work Orders (WO) and Purchase Requests (PR).\n• Real-time Alerting: Integrates with WhatsApp Web API to dispatch interactive notifications to the financial management team upon the success or failure of each execution phase.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Google Sheets API", "WhatsApp API", "State Management"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO PANEL (Item Card, BOM, & RPO Pipeline Automation)", 
        desc: "Large-scale Python state machine for automating Item Card, BOM, and RPO creation within Microsoft Dynamics 365 Business Central.", 
        detail: "Workflow & Technical Implementation:\n• State Machine Architecture: Comprises 19 structured Python scripts acting as an advanced state machine for ERP automation.\n• Date Gates Logic: Utilizes Google Sheets date column pairs as logic gates to read success statuses of previous API POST operations.\n• Controlled Execution: Ensures production data rows are only executed to subsequent phases if previous phases verify success automatically.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Google Sheets API", "Business Central", "Automation"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO NEW DIES (Section, UoM, Routing & BOM Creation)", 
        desc: "Multi-script pipeline for simultaneous dies master data synchronization across Google Drive, Google Sheets, and ERP OData V4 proxy.", 
        detail: "Workflow & Technical Implementation:\n• Multi-Source Sync: A 14-script pipeline synchronizing Section, Item, UoM, Routing, and BOM creation in parallel.\n• ETag Validation: Handles advanced HTTP headers, including fetching and inserting ETags to validate PATCH operations (Status=Certified) on ERP entities.\n• Data Integrity: Preserves relational integrity of newly minted manufacturing master data with strict validation.", 
        github: "", 
        demo: "", 
        tags: ["Python", "OData V4", "Google Drive API", "ERP Integration"] 
      },
      { 
        type: "enterprise", 
        title: "AUTO RPO PCT (Complex Production Automation Pipeline)", 
        desc: "Complex data pipeline involving dozens of Python scripts, automated rate limit management, and multi-endpoint Business Central interactions.", 
        detail: "Workflow & Technical Implementation:\n• Complex Pipeline: Involves 27 Python files (1 orchestrator, 22 functional scripts, 4 support modules) manipulating 12 Google Sheets and interacting with 11 Business Central API endpoints.\n• Rate Limit Management: Automated rate limit throttling with a 60-second pause for POST/PATCH operations.\n• Interleaved Execution: Enforces alternating execution because child data in BC must be re-read prior to subsequent POST calls.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Google Sheets", "Business Central API", "Rate Limiting"] 
      },
      { 
        type: "enterprise", 
        title: "BC Data Automation – MRP Planning", 
        desc: "Python runner-worker architecture for inventory data extraction and cascading stock calculations from Business Central OData endpoints.", 
        detail: "Workflow & Technical Implementation:\n• Runner-Worker Architecture: Utilizes 8 Python scripts split into runner and worker roles to extract stock management data.\n• Cascading Calculation: Internal cascading stock calculations per Item No, where remaining counts on one row allocate directly as initial stock for the subsequent row.\n• MRP Optimization: Accelerates company material planning analysis accurately.", 
        github: "", 
        demo: "", 
        tags: ["Python", "Business Central", "MRP", "ETL Pipeline"] 
      },
      { 
        type: "enterprise", 
        title: "Get Data Eprod FG (MariaDB to Google Drive ETL Pipeline)", 
        desc: "4-layer extraction automation system pulling raw production order data from the eProd database to Google Drive.", 
        detail: "Workflow & Technical Implementation:\n• 4-Layer Extraction: System architecture encompassing Trigger, Scheduler, Orchestrator, and ETL Scripts.\n• Data Transformation: Cleans and reshapes raw production order data from MariaDB into structured Excel file formats.\n• Automated Upload: Periodically uploads operational reports using the Google Drive API for Cutting Optimize team usage.", 
        github: "", 
        demo: "", 
        tags: ["Python", "MariaDB", "Google Drive API", "ETL Pipeline"] 
      },
      
      // KATEGORI: PERSONAL (Open Source / Research)
      { type: "personal", title: "BasaNusantara", desc: "Interactive platform to preserve and explore languages across the Nusantara archipelago.", github: "https://github.com/DavidMarioYS/BasaNusantara", demo: "https://basanusantara.vercel.app/", tags: ["Web", "Next.js"] },
      { type: "personal", title: "SmrtPhn", desc: "AI Recommender for smartphone specifications based on technical requirements.", github: "https://github.com/DavidMarioYS/SmartPhn", demo: "https://smart-phn-syqd.vercel.app/", tags: ["Local LLM", "Python"] },
      { type: "personal", title: "DMNet-app", desc: "Networking utility tool designed to assist IT professionals and students.", github: "https://github.com/DavidMarioYS/DMNet-app", demo: "https://dm-net-app.vercel.app/", tags: ["Networking", "Vercel"] },
      { type: "personal", title: "Kai Chatbot", desc: "Interactive AI assistant with a seamless chatbot interface.", github: "https://github.com/DavidMarioYS/kai-chatbot", demo: "https://davidmarioys.github.io/kai-chatbot/", tags: ["Chatbot", "AI"] },
      { type: "personal", title: "Jadwal Piket", desc: "Automated generator for efficient weekly duty scheduling.", github: "https://github.com/DavidMarioYS/Jadwal-Piket-Mingguan-Generator", demo: "https://davidmarioys.github.io/Jadwal-Piket-Mingguan-Generator/", tags: ["Automation", "Web"] },
      { type: "personal", title: "Toba Welder", desc: "Automated document workflow system for generating receipts and payment proofs.", github: "https://github.com/DavidMarioYS/Toba-Welder", demo: "", tags: ["Automation", "AI"] },
      { type: "personal", title: "CV Analysis n8n", desc: "Automated CV scoring pipeline using n8n and Google Gemini.", github: "https://github.com/DavidMarioYS/Automation-CV-Analysis-Scoring-Pipeline-n8n-Google-Gemini", demo: "", tags: ["n8n", "Gemini AI"] },
      { type: "personal", title: "Bottle Detection", desc: "Bottle type classification using YOLOv8 & MobileNetV2.", github: "https://github.com/DavidMarioYS/Computer-Vision-Project-Deteksi-Klasifikasi-Jenis-Botol-Menggunakan-YOLOv8-dan-MobileNetV2", demo: "", tags: ["YOLOv8", "Deep Learning"] },
      { type: "personal", title: "Corrosion Thesis", desc: "Image segmentation for pipeline corrosion detection (Thesis).", github: "https://github.com/DavidMarioYS/Thesis-Project-Corrosion-Pipes-Image-Segmentation", demo: "", tags: ["Segmentation", "Research"] },
      { type: "personal", title: "KNN Laptop", desc: "Laptop type prediction using the KNN algorithm.", github: "https://github.com/DavidMarioYS/KNN-Prediksi-Type-Laptop", demo: "", tags: ["Machine Learning", "Python"] },
      { type: "personal", title: "Greedy THR", desc: "Greedy algorithm implementation for optimizing holiday allowance distribution.", github: "https://github.com/DavidMarioYS/Greedy-THR", demo: "", tags: ["Algorithm", "Python"] },
      { type: "personal", title: "Bangkit Project: NoD", desc: "Content-Based Filtering recommendation system. Bangkit Academy Capstone.", github: "https://github.com/DavidMarioYS/Bangkit-Project-NoD", demo: "", tags: ["Machine Learning", "TensorFlow"] },
      { type: "personal", title: "PesoNa Sulawesi", desc: "Tourism destination recommender system based on user preferences.", github: "https://github.com/DavidMarioYS/Projek-PesoNa-Sulawesi-Sistem-Rekomendasi-Wisata", demo: "", tags: ["Recommender", "Web"] },
      { type: "personal", title: "Heart Disease Classification", desc: "Heart disease classification project using Machine Learning algorithms.", github: "https://github.com/DavidMarioYS/Projek_Klasifikasi_Penyakit_Jantung", demo: "", tags: ["Classification", "Data Science"] }
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const t = dict[lang];

  // State untuk Filter Kategori Projek
  const [activeProjectType, setActiveProjectType] = useState<"enterprise" | "personal">("enterprise");
  // State untuk Pop-up Modal Case Study
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mencegah scroll body saat modal terbuka
  useEffect(() => {
    if (selectedCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCaseStudy]);

  const filteredProjects = t.projectData.filter(p => p.type === activeProjectType);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) {
        const progress = (scrollLeft / maxScrollLeft) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    }
  };

  // Reset scroll progress when changing tabs
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setScrollProgress(0);
    }
  }, [activeProjectType]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans overflow-x-hidden relative">
      
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-40 bg-stone-50/80 backdrop-blur-xl border-b border-stone-200/50 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter text-stone-800">
            HANES<span className="text-emerald-500 animate-pulse">.</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-stone-600">
            <a href="#home" className="hover:text-emerald-600 hover:-translate-y-0.5 transition-all">{t.nav.home}</a>
            <a href="#experience" className="hover:text-emerald-600 hover:-translate-y-0.5 transition-all">{t.nav.experience}</a>
            <a href="#projects" className="hover:text-emerald-600 hover:-translate-y-0.5 transition-all">{t.nav.projects}</a>
            <a href="#skills" className="hover:text-emerald-600 hover:-translate-y-0.5 transition-all">{t.nav.skills}</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-stone-200/80 p-1 rounded-full border border-stone-300 shadow-inner">
              <button 
                type="button"
                onClick={() => setLang("id")} 
                className={`px-3 py-1.5 text-xs font-black rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                  lang === "id" ? "bg-white text-emerald-600 shadow-sm" : "text-stone-400 hover:text-stone-600"
                }`}
              >
                ID
              </button>
              <button 
                type="button"
                onClick={() => setLang("en")} 
                className={`px-3 py-1.5 text-xs font-black rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                  lang === "en" ? "bg-white text-emerald-600 shadow-sm" : "text-stone-400 hover:text-stone-600"
                }`}
              >
                EN
              </button>
            </div>

            <a href="mailto:davidmario484@gmail.com" className="hidden sm:block border-2 border-emerald-500 text-emerald-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300">
              {t.nav.contact}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative pt-40 pb-20 flex flex-col justify-center min-h-svh bg-[url('/me.jpeg')] bg-cover bg-position-[80%_center] md:bg-center bg-no-repeat bg-scroll md:bg-fixed">
          <div className="absolute inset-0 bg-linear-to-r from-stone-50 via-stone-50/95 to-stone-50/10 z-0"></div>
          
          <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
            <div className="inline-block mb-4 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <p className="text-emerald-600 font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> NICE TO CONNECT WITH YOU.
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-stone-800 leading-tight mb-6 tracking-tight">
              AI Engineer & <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-400">Automation Specialist.</span>
            </h1>
            <p className="max-w-xl text-lg text-stone-600 mb-10 leading-relaxed font-medium">
              Specializing in Machine Learning, Deep Learning, and AI model development for web and mobile apps. I build intelligent ecosystems by combining Robotic Process Automation (RPA), workflow automation pipelines, and robust IT Infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#experience" className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-emerald-200/50">
                View Profile
              </a>
              <a href="https://github.com/DavidMarioYS" target="_blank" rel="noopener noreferrer" className="bg-white text-stone-800 px-8 py-3.5 rounded-full font-bold hover:bg-stone-100 hover:shadow-md transition-all duration-300 border border-stone-200">
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience" className="py-24 px-6 bg-stone-100/30 border-y border-stone-200/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-black text-stone-800 mb-2 tracking-tight">{t.sectionExp.titleExp}</h2>
                <p className="text-stone-500 text-sm font-medium mb-4">{t.sectionExp.subExp}</p>
                <div className="w-16 h-1.5 bg-emerald-500 rounded-full"></div>
              </div>
              <div className="border-l-2 border-stone-200 pl-8 space-y-10 ml-2">
                {t.experienceData.map((exp, index) => (
                  <div key={index} className="relative group">
                    <span className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-stone-200 border-4 border-stone-50 group-hover:bg-emerald-500 group-hover:scale-150 transition-all duration-500 shadow-sm"></span>
                    <h3 className="text-xl font-bold text-stone-800 leading-tight mb-1 group-hover:text-emerald-600 transition-colors">{exp.role}</h3>
                    <p className="text-emerald-600 font-bold text-sm mb-3">{exp.company} <span className="text-stone-400 font-medium ml-1">| {exp.period}</span></p>
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, tIndex) => (
                        <span key={tIndex} className="bg-white border border-stone-200 text-stone-500 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider shadow-sm group-hover:border-emerald-200 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-black text-stone-800 mb-2 tracking-tight">{t.sectionExp.titleEdu}</h2>
                <p className="text-stone-500 text-sm font-medium mb-4">{t.sectionExp.subEdu}</p>
                <div className="w-16 h-1.5 bg-teal-500 rounded-full"></div>
              </div>
              <div className="border-l-2 border-stone-200 pl-8 space-y-10 ml-2">
                {t.educationData.map((edu, index) => (
                  <div key={index} className="relative group">
                    <span className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-stone-200 border-4 border-stone-50 group-hover:bg-teal-500 group-hover:scale-150 transition-all duration-500 shadow-sm"></span>
                    <h3 className="text-xl font-bold text-stone-800 leading-tight mb-1 group-hover:text-teal-600 transition-colors">{edu.degree}</h3>
                    <p className="text-teal-600 font-bold text-sm mb-2">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-stone-500 text-xs font-semibold bg-stone-200/50 px-2 py-1 rounded-md">{edu.period}</span>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] px-2.5 py-1 rounded-md font-black uppercase tracking-wider">{edu.gpa}</span>
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-stone-100 shadow-sm group-hover:shadow-md transition-shadow">
                      <span className="font-bold text-stone-800">{t.sectionExp.highlight}</span> {edu.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION - DENGAN FITUR TABS */}
        <section id="projects" className="py-24 pl-6 bg-white border-b border-stone-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-b from-emerald-50 to-transparent rounded-full blur-3xl -mr-64 -mt-32 opacity-60 z-0"></div>

          <div className="max-w-6xl mx-auto pr-6 relative z-10">
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 tracking-tight">{t.sectionProj.title}</h2>
                <div className="w-20 h-1.5 bg-emerald-500 rounded-full"></div>
                <p className="text-stone-500 text-sm font-medium mt-4">{t.sectionProj.sub}</p>
              </div>
              
              <div className="flex flex-col items-end gap-4">
                {/* TABS BUTTONS */}
                <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
                  <button 
                    onClick={() => setActiveProjectType("enterprise")}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${activeProjectType === "enterprise" ? "bg-white text-emerald-600 shadow-sm border border-stone-200" : "text-stone-500 hover:text-stone-800"}`}
                  >
                    {t.sectionProj.tabEnterprise}
                  </button>
                  <button 
                    onClick={() => setActiveProjectType("personal")}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${activeProjectType === "personal" ? "bg-white text-emerald-600 shadow-sm border border-stone-200" : "text-stone-500 hover:text-stone-800"}`}
                  >
                    {t.sectionProj.tabPersonal}
                  </button>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => scroll("left")} className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-stone-400 border border-stone-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-sm hover:-translate-x-1" aria-label="Geser Kiri">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button onClick={() => scroll("right")} className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-stone-400 border border-stone-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-sm hover:translate-x-1" aria-label="Geser Kanan">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            </div>

            <div 
              ref={carouselRef} 
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-6 pb-12 pt-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
              {filteredProjects.map((project, index) => (
                <div 
                  key={index} 
                  className="snap-start shrink-0 w-75 sm:w-85 flex flex-col bg-white rounded-3xl border border-stone-200 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] group overflow-hidden"
                >
                  <div className={`h-28 ${project.type === "enterprise" ? "bg-stone-800" : "bg-stone-100"} group-hover:bg-linear-to-br group-hover:from-emerald-400 group-hover:to-teal-500 transition-all duration-700 relative flex items-center justify-center overflow-hidden`}>
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-lg group-hover:scale-150 transition-transform duration-700"></div>
                    <svg className={`w-10 h-10 ${project.type === "enterprise" ? "text-emerald-500" : "text-stone-300"} group-hover:text-white/90 group-hover:scale-110 transition-all duration-500 relative z-10`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {project.type === "enterprise" ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path>
                      )}
                    </svg>
                  </div>

                  <div className="p-7 flex-1 bg-white relative">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tIndex) => (
                        <span key={tIndex} className="text-[9px] font-black uppercase tracking-widest bg-stone-100 text-stone-500 px-2.5 py-1 rounded-md group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-black text-stone-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-6 line-clamp-3">
                      {project.desc}
                    </p>
                  </div>

                  <div className="p-7 pt-0 mt-auto flex flex-col gap-2 bg-white">
                    {project.type === "enterprise" ? (
                      // Tombol Pop-up Case Study untuk projek internal
                      <button onClick={() => setSelectedCaseStudy(project)} className="w-full py-3 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest rounded-xl text-center border-2 border-emerald-100 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-sm cursor-pointer">
                        {t.sectionProj.btnCaseStudy}
                      </button>
                    ) : (
                      // Tombol Repo / Demo untuk projek personal
                      <>
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-stone-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl text-center hover:bg-emerald-500 transition-all duration-300 shadow-md">
                            {t.sectionProj.btnDemo}
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-transparent text-stone-600 text-xs font-bold uppercase tracking-widest rounded-xl text-center border-2 border-stone-200 hover:border-stone-800 hover:text-stone-800 transition-all duration-300">
                            {t.sectionProj.btnRepo}
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div className="shrink-0 w-6"></div>
            </div>

            <div className="max-w-md mx-auto mt-2 h-1 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 px-6 bg-stone-50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 tracking-tight">{t.sectionSkills.title}</h2>
              <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-6"></div>
              <p className="text-stone-600 leading-relaxed font-medium mb-8">
                {t.sectionSkills.desc}
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.skillsData.map((category, index) => (
                <div key={index} className="bg-white border border-stone-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300 group">
                  <h3 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, sIndex) => (
                      <span key={sIndex} className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-stone-500 text-sm border-t border-stone-200 bg-white">
        <p className="font-medium">© {new Date().getFullYear()} David Mario Yohanes Samosir. {t.footer}</p>
      </footer>

      {/* CASE STUDY MODAL */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setSelectedCaseStudy(null)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 sm:p-10 max-h-[85vh] overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2 flex-wrap">
                  {selectedCaseStudy.tags.map((tag: string, i: number) => (
                    <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={() => setSelectedCaseStudy(null)} className="text-stone-400 hover:text-stone-800 bg-stone-100 p-2 rounded-full transition-colors sticky top-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-stone-800 mb-4 leading-tight">{selectedCaseStudy.title}</h3>
              <p className="text-lg text-stone-600 font-medium mb-6 leading-relaxed border-l-4 border-emerald-500 pl-4">{selectedCaseStudy.desc}</p>
              
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                <h4 className="text-sm font-bold text-stone-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {lang === 'id' ? 'Detail Solusi & Arsitektur' : 'Solution & Architecture Details'}
                </h4>
                
                <div className="text-sm text-stone-600 leading-relaxed whitespace-pre-line space-y-2">
                  {selectedCaseStudy.detail.split('\n').map((line: string, index: number) => {
                    if (line.trim() === '') return null;
                    const isBullet = line.trim().startsWith('•');
                    const text = line.replace('• ', '').trim();
                    return (
                      <p key={index} className={isBullet ? "pl-5 relative before:content-[''] before:absolute before:left-1 before:top-2 before:w-1.5 before:h-1.5 before:bg-emerald-500 before:rounded-full" : "font-bold text-stone-800 mt-4 mb-2"}>
                        {text}
                      </p>
                    );
                  })}
                </div>
                
                <div className="mt-6 pt-4 border-t border-stone-200 text-xs font-semibold text-stone-400 italic">
                  {lang === 'id' 
                    ? '*Sebagai bagian dari IP perusahaan, repositori kode tidak tersedia untuk publik.' 
                    : '*As part of company IP, the code repository is not available to the public.'}
                </div>
              </div>
            </div>
            
            <div className="bg-stone-50 px-8 py-5 border-t border-stone-200 flex justify-end">
              <button onClick={() => setSelectedCaseStudy(null)} className="px-6 py-2.5 bg-stone-800 text-white text-sm font-bold rounded-xl hover:bg-stone-700 transition-colors">
                {t.sectionProj.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}