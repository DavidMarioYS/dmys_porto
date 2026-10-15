// ==========================================================
// portfolio-data.ts
// Satu-satunya tempat untuk mengedit KONTEN portofolio.
// - Fakta yang sama di kedua bahasa (link, tag, flag featured) ada di `projectBase`.
// - Teks yang berbeda per bahasa ada di `dict[lang].projectText`.
// Dengan begitu tag/link tidak perlu diduplikasi dan tidak bisa saling berbeda.
// ==========================================================

export type Lang = "id" | "en";
export type ProjectType = "enterprise" | "personal";

export interface RepoLink {
  label: string;
  url: string;
}

// Data yang tidak bergantung bahasa
export interface ProjectBase {
  id: string;
  type: ProjectType;
  tags: string[];
  featured?: boolean; // tampil lebih dulu pada tab-nya
  demo?: string;
  github?: string; // satu repo
  repos?: RepoLink[]; // beberapa repo (override `github`)
  image?: string; // opsional: path di /public, mis. "/projects/aimg-restore.png"
}

export interface ProjectText {
  title: string;
  desc: string;
  detail?: string; // hanya untuk studi kasus enterprise
}

// Bentuk akhir yang dipakai komponen (gabungan base + text)
export type Project = ProjectBase & ProjectText;

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  desc: string;
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  desc: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface Dictionary {
  nav: {
    home: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
  };
  hero: {
    badgeOpen: string;
    badgeDefault: string;
    titleLine1: string;
    titleLine2: string;
    desc: string;
    ctaProfile: string;
    ctaGithub: string;
    ctaLinkedin: string;
  };
  stats: {
    enterprise: string;
    personal: string;
    gpa: string;
  };
  sectionExp: {
    titleExp: string;
    subExp: string;
    titleEdu: string;
    subEdu: string;
    highlight: string;
  };
  sectionProj: {
    title: string;
    sub: string;
    btnDemo: string;
    btnRepo: string;
    btnCaseStudy: string;
    tabEnterprise: string;
    tabPersonal: string;
    tabsLabel: string;
    showMore: string;
    showLess: string;
    closeModal: string;
    detailTitle: string;
    ipNote: string;
  };
  sectionSkills: { title: string; desc: string };
  sectionContact: { title: string; desc: string; btnEmail: string };
  footer: string;
  skillsData: SkillCategory[];
  experienceData: ExperienceItem[];
  educationData: EducationItem[];
  projectText: Record<string, ProjectText>;
}

// ==========================================================
// PROFIL & LINK (tidak bergantung bahasa)
// ==========================================================
export const profile = {
  name: "David Mario Yohanes Samosir",
  brand: "HANES",
  email: "davidmario484@gmail.com",
  github: "https://github.com/DavidMarioYS",
  linkedin: "https://linkedin.com/in/david-mario-yohanes-samosir",
  siteUrl: "https://dmys-porto.vercel.app",
  // Ubah ke false jika sedang tidak mencari peluang baru.
  openToWork: true,
} as const;

// ==========================================================
// DATA PROJEK YANG SAMA DI KEDUA BAHASA
// ==========================================================
export const projectBase: ProjectBase[] = [
  // ---------- ENTERPRISE ----------
  { id: "auto-rpo-fg", type: "enterprise", tags: ["Python", "xlwings", "ERP", "Data Pipeline"] },
  { id: "auto-to-alu", type: "enterprise", tags: ["Python", "Flask", "n8n", "Business Central", "WhatsApp API"] },
  { id: "auto-to-acc-2026", type: "enterprise", tags: ["Python", "Flask", "n8n", "Self-Healing", "Business Central"] },
  { id: "audit-to-rpo-fg", type: "enterprise", tags: ["Go", "Business Central API", "GCP", "Self-Healing"] },
  { id: "dingtalk-ncr-etl", type: "enterprise", tags: ["Python", "DingTalk API", "ETL", "JSON Parsing"] },
  { id: "auto-kaca", type: "enterprise", tags: ["Python", "Google Sheets API", "WhatsApp API", "State Management"] },
  { id: "auto-panel", type: "enterprise", tags: ["Python", "Google Sheets API", "Business Central", "Automation"] },
  { id: "auto-new-dies", type: "enterprise", tags: ["Python", "OData V4", "Google Drive API", "ERP Integration"] },
  { id: "auto-rpo-pct", type: "enterprise", tags: ["Python", "Google Sheets", "Business Central API", "Rate Limiting"] },
  { id: "bc-mrp-planning", type: "enterprise", tags: ["Python", "Business Central", "MRP", "ETL Pipeline"] },
  { id: "eprod-fg-etl", type: "enterprise", tags: ["Python", "MariaDB", "Google Drive API", "ETL Pipeline"] },

  // ---------- PERSONAL / OPEN SOURCE ----------
  {
    id: "aimg-restore",
    type: "personal",
    featured: true,
    tags: ["GFPGAN", "Real-ESRGAN", "Gradio", "Next.js"],
    demo: "https://aimg-restore.vercel.app",
    repos: [
      { label: "Frontend Repo (Next.js)", url: "https://github.com/DavidMarioYS/photo-restore-frontend" },
      { label: "Backend Repo (AI)", url: "https://github.com/DavidMarioYS/photo-restore-backend" },
    ],
    // image: "/projects/aimg-restore.png", // aktifkan setelah screenshot ditaruh di /public/projects
  },
  { id: "basanusantara", type: "personal", featured: true, tags: ["Web", "Next.js"], github: "https://github.com/DavidMarioYS/BasaNusantara", demo: "https://basanusantara.vercel.app/" },
  { id: "smrtphn", type: "personal", featured: true, tags: ["Local LLM", "Python"], github: "https://github.com/DavidMarioYS/SmartPhn", demo: "https://smart-phn-syqd.vercel.app/" },
  { id: "cv-analysis-n8n", type: "personal", featured: true, tags: ["n8n", "Gemini AI"], github: "https://github.com/DavidMarioYS/Automation-CV-Analysis-Scoring-Pipeline-n8n-Google-Gemini" },
  { id: "corrosion-thesis", type: "personal", featured: true, tags: ["Segmentation", "Research"], github: "https://github.com/DavidMarioYS/Thesis-Project-Corrosion-Pipes-Image-Segmentation" },
  { id: "bottle-detection", type: "personal", featured: true, tags: ["YOLOv8", "Deep Learning"], github: "https://github.com/DavidMarioYS/Computer-Vision-Project-Deteksi-Klasifikasi-Jenis-Botol-Menggunakan-YOLOv8-dan-MobileNetV2" },
  { id: "dmnet-app", type: "personal", tags: ["Networking", "Vercel"], github: "https://github.com/DavidMarioYS/DMNet-app", demo: "https://dm-net-app.vercel.app/" },
  { id: "kai-chatbot", type: "personal", tags: ["Chatbot", "AI"], github: "https://github.com/DavidMarioYS/kai-chatbot", demo: "https://davidmarioys.github.io/kai-chatbot/" },
  { id: "jadwal-piket", type: "personal", tags: ["Automation", "Web"], github: "https://github.com/DavidMarioYS/Jadwal-Piket-Mingguan-Generator", demo: "https://davidmarioys.github.io/Jadwal-Piket-Mingguan-Generator/" },
  { id: "toba-welder", type: "personal", tags: ["Automation", "AI"], github: "https://github.com/DavidMarioYS/Toba-Welder" },
  { id: "knn-laptop", type: "personal", tags: ["Machine Learning", "Python"], github: "https://github.com/DavidMarioYS/KNN-Prediksi-Type-Laptop" },
  { id: "greedy-thr", type: "personal", tags: ["Algorithm", "Python"], github: "https://github.com/DavidMarioYS/Greedy-THR" },
  { id: "bangkit-nod", type: "personal", tags: ["Machine Learning", "TensorFlow"], github: "https://github.com/DavidMarioYS/Bangkit-Project-NoD" },
  { id: "pesona-sulawesi", type: "personal", tags: ["Recommender", "Web"], github: "https://github.com/DavidMarioYS/Projek-PesoNa-Sulawesi-Sistem-Rekomendasi-Wisata" },
  { id: "heart-disease", type: "personal", tags: ["Classification", "Data Science"], github: "https://github.com/DavidMarioYS/Projek_Klasifikasi_Penyakit_Jantung" },
];

// ==========================================================
// KAMUS BAHASA
// ==========================================================
export const dict: Record<Lang, Dictionary> = {
  // ------------------------------------------------------
  // BAHASA INDONESIA
  // ------------------------------------------------------
  id: {
    nav: {
      home: "Beranda",
      experience: "Pengalaman",
      projects: "Projek",
      skills: "Keahlian",
      contact: "Kontak",
      openMenu: "Buka menu navigasi",
      closeMenu: "Tutup menu navigasi",
      skipToContent: "Lewati ke konten utama",
    },
    hero: {
      badgeOpen: "Terbuka untuk peluang baru",
      badgeDefault: "Senang berkenalan dengan Anda",
      titleLine1: "AI Engineer &",
      titleLine2: "Automation Specialist.",
      desc: "Berfokus pada Machine Learning, Deep Learning, dan pengembangan model AI untuk aplikasi web dan mobile. Saya membangun ekosistem cerdas dengan memadukan Robotic Process Automation (RPA), pipeline otomasi alur kerja, dan infrastruktur IT yang tangguh.",
      ctaProfile: "Lihat Profil",
      ctaGithub: "GitHub",
      ctaLinkedin: "LinkedIn",
    },
    stats: {
      enterprise: "Sistem Otomasi Enterprise",
      personal: "Projek Open Source & Riset",
      gpa: "IPK S1 (Cum Laude)",
    },
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
      tabEnterprise: "Enterprise & NDA",
      tabPersonal: "Open Source & Riset",
      tabsLabel: "Kategori projek",
      showMore: "Tampilkan semua projek",
      showLess: "Tampilkan lebih sedikit",
      closeModal: "Tutup",
      detailTitle: "Detail Solusi & Arsitektur",
      ipNote: "*Sebagai bagian dari IP perusahaan, repositori kode tidak tersedia untuk publik.",
    },
    sectionSkills: {
      title: "Keahlian Utama",
      desc: "Sebagai seorang AI Engineer, saya mengombinasikan keahlian di bidang Artificial Intelligence, Robotic Process Automation (RPA), dan Infrastruktur IT untuk merancang serta mengimplementasikan ekosistem digital end-to-end yang tangguh dan otomatis.",
    },
    sectionContact: {
      title: "Mari Berdiskusi",
      desc: "Tertarik berkolaborasi, atau punya posisi yang cocok dengan keahlian saya? Silakan hubungi saya lewat email atau LinkedIn.",
      btnEmail: "Kirim Email",
    },
    footer: "Hak cipta dilindungi undang-undang.",

    skillsData: [
      { title: "AI & Machine Learning", items: ["Machine Learning", "Deep Learning", "YOLO", "Image Annotation", "Riset Model AI", "Dev Model AI ke Web & Mobile"] },
      { title: "Robotic Process Automation", items: ["Microsoft Power Automate", "Automation Anywhere", "UiPath"] },
      { title: "Intelligent Automation", items: ["Python", "n8n", "Docker", "API Integration", "Go (Golang 1.25)", "ETL Pipeline", "Self-Healing Architecture", "Rate Limiting"] },
      { title: "ERP & System Integration", items: ["Dynamics 365 BC (OData V4)", "Google Workspace APIs", "DingTalk REST API", "WhatsApp API", "xlwings", "pandas"] },
      { title: "IT Infrastructure", items: ["Mikrotik & Subnet IP", "Instalasi OS (Win, Linux, Mac)", "Instalasi Software", "Instalasi WiFi"] },
    ],

    experienceData: [
      { role: "ERP AI Specialist", company: "Allure (Divisi AI ERP)", period: "Jun 2025 - Sekarang", desc: "Merancang ekosistem otomasi skala enterprise dengan arsitektur 3-Layer (Python/FastAPI) dan microservices n8n. Terintegrasi dengan Microsoft Dynamics 365 dan database manufaktur.", tags: ["FastAPI", "n8n", "Microservices", "ERP"] },
      { role: "AI Engineer (Internship)", company: "PT Dago Engineering", period: "Agt 2024 - Des 2024", desc: "Membangun pipeline Machine Learning end-to-end untuk segmentasi citra. Mengembangkan model Mobile U-Net dan ResNet-50 hingga tahap deployment. Lulus dengan predikat 'Sangat Baik'.", tags: ["Computer Vision", "Deep Learning", "Streamlit"] },
      { role: "Machine Learning Specialist", company: "Bangkit Academy", period: "Feb 2024 - Jul 2024", desc: "Mengembangkan sistem rekomendasi Content-Based Filtering dan mengonversi model H5 ke TFLite/TensorFlow.js. Meraih predikat Distinction Graduate.", tags: ["TensorFlow", "NLP", "Machine Learning"] },
      { role: "IT Support (Internship)", company: "SMA Negeri 1 Cibinong", period: "Jan 2016 - Mei 2016", desc: "Memberikan dukungan teknis dan pemeliharaan komputer. Mengonfigurasi jaringan LAN/WLAN sekolah (TCP/IP) guna meningkatkan konektivitas.", tags: ["LAN-WAN", "TCP/IP", "Maintenance"] },
    ],
    educationData: [
      { degree: "S1 Ilmu Komputer", institution: "Universitas Pendidikan Ganesha", period: "2021 - 2025", gpa: "IPK: 3.96/4.00", desc: "Fokus penelitian pada Deep Learning dan Computer Vision. Mengerjakan Tugas Akhir Analisis Komparatif Model Semantic Segmentation untuk deteksi korosi pipa industri." },
      { degree: "Teknik Komputer dan Jaringan", institution: "SMK Negeri 1 Cibinong", period: "2018 - 2020", gpa: "Sertifikasi BNSP & Cisco", desc: "Membangun pondasi keahlian infrastruktur IT. Meraih Sertifikat Kompetensi BNSP KKNI Level II serta menyelesaikan sertifikasi Cisco CCNA." },
    ],

    projectText: {
      // ---------- ENTERPRISE ----------
      "auto-rpo-fg": {
        title: "Pipeline End-to-End AUTO RPO FG",
        desc: "Orkestrasi Python berskala besar untuk otomasi pembuatan RPO. Melakukan kalkulasi BOM, scrap efficiency, hingga post Master Item ke ERP.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• File Parsing: Script Python membaca dan mengekstrak tabel kompleks dari dokumen manufaktur mentah (.xls/.xlsx) menggunakan library `xlwings` dan `pandas`.\n• Transformasi Data: Menghitung persentase efisiensi bahan (Scrap %) dan meracik ulang struktur Bill of Materials (BOM) agar sesuai dengan skema relational database ERP.\n• Sequential API Posting: Mengeksekusi rangkaian HTTP POST/PATCH terstruktur ke ERP (OData V4) untuk membuat entitas secara berurutan: Master Item -> Routing -> Production BOM -> RPO Header -> RPO Line.\n• Fault Tolerance (Ketahanan): Mengimplementasikan 'Checkpoint System'. Sebelum melakukan POST, script melakukan kueri (GET) untuk mengecek eksistensi data. Jika koneksi terputus di tengah jalan, script dapat di-resume tanpa menyebabkan duplikasi data di ERP.",
      },
      "auto-to-alu": {
        title: "AUTO TO ALU (Otomasi Transfer Order Aluminium)",
        desc: "Sistem otomasi skala enterprise menghubungkan 25-26 modul Flask REST API dan orkestrasi microservices n8n untuk Transfer Order Aluminium.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• Orkestrasi Microservices: Mengoordinasikan 25-26 modul Flask REST API terpisah melalui 48 node workflow n8n secara terpusat.\n• Multi-Sistem Integration: Mengintegrasikan trigger HTTP terjadwal, autentikasi OAuth2 Google, proxy OData V4 Business Central, serta payload dinamis ke API Bot WhatsApp dalam satu siklus eksekusi.\n• Keandalan Tinggi: Mengotomatiskan siklus eksekusi data logistik manufaktur secara presisi dan real-time.",
      },
      "auto-to-acc-2026": {
        title: "AUTO TO ACC 2026 (Otomasi TO & Item Request Aksesoris)",
        desc: "Sistem otomasi Transfer Order dan Item Request Aksesoris berbasis Flask API dengan arsitektur self-healing dan sparse payload.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• Arsitektur Self-Healing: Mengoperasikan 18 modul Flask API melalui workflow n8n yang mampu mendeteksi dan memulihkan ketidaksinkronan data secara otomatis.\n• Sparse Payload Optimization: Mengoptimalkan transmisi data web secara presisi dengan mengirimkan field wajib ke Business Central dan field opsional hanya jika bernilai nyata.\n• Integritas Transaksi: Menjamin konsistensi data transaksi aksesoris manufaktur secara efisien dan andal.",
      },
      "audit-to-rpo-fg": {
        title: "Pengecekan Hasil Otomasi TO dan RPO FG",
        desc: "Sistem batch backend menggunakan Golang untuk mengaudit secara silang hasil eksekusi otomasi produksi dengan database ERP.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• Ekstraksi Data: Sistem (ditulis dalam Golang untuk performa konkurensi tinggi) menarik populasi data harian dari sumber produksi.\n• API Integration: Melakukan HTTP GET requests secara paralel via OData V4 API ke endpoint ERP Microsoft Dynamics 365 Business Central.\n• Rekonsiliasi & Logika Bisnis: Membandingkan ID dokumen sumber dengan respons ERP untuk mendeteksi 'Missing Data' atau kegagalan posting.\n• Self-Healing: Jika ditemukan data yang belum ter-posting namun sudah lewat batas waktu (delay threshold), sistem memicu proses re-query cerdas pada hari berikutnya.\n• Reporting: Hasil audit diolah menggunakan library Pandas (Python) / native Go structs menjadi format HTML matriks warna (Merah = Gagal, Hijau = Sukses), lalu dikirim otomatis via Google Workspace Gmail API menggunakan Service Account Auth.",
      },
      "dingtalk-ncr-etl": {
        title: "Modul ETL DingTalk NCR",
        desc: "Sistem ekstraksi data dari platform DingTalk dengan penanganan token caching, rate limit, dan operasi Upsert dinamis ke database laporan.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• Authentication: Menggunakan mekanisme OAuth Desktop Authentication untuk merotasi dan melakukan caching akses token dari DingTalk OA API.\n• Resilient Fetching: Membangun fungsi kueri yang dilengkapi paginasi otomatis dan Rate Limiting (Exponential Backoff) untuk menarik ribuan record Non Conformity Record (NCR) tanpa terkena blokir server (429 Too Many Requests).\n• Deep JSON Parsing: Mengekstrak struktur nested JSON untuk mengambil data vital, riwayat persetujuan (approval layers), dan tautan lampiran dokumen.\n• Dynamic Upsert: Melakukan rekonsiliasi data ke spreadsheet menggunakan logika Upsert (Update if exists, Insert if new) berdasar Primary Key, sehingga mencegah duplikasi baris sembari mempertahankan kolom kustom yang ditambahkan manual oleh pengguna.",
      },
      "auto-kaca": {
        title: "Sistem Otomasi AUTO KACA",
        desc: "Arsitektur 11 skrip Python terintegrasi yang mengatur workflow produksi kaca dari file mentah menjadi Sales Order, lengkap dengan notifikasi WhatsApp.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• State Management: Tidak menggunakan SQL, melainkan mengadopsi Google Sheets API (OAuth2) sebagai 'Single Source of Truth' dan basis data dinamis penggerak alur kerja.\n• Modular Execution: Terdiri dari 11 skrip Python yang dieksekusi berdasarkan trigger perubahan status kolom tanggal (Timestamp validation) di spreadsheet.\n• ETL Process: Mengekstrak dokumen, mentransformasi dimensi/ukuran material, dan memuatnya ke ERP sebagai Work Order (WO) dan Purchase Request (PR).\n• Real-time Alerting: Terintegrasi dengan WhatsApp Web API (menggunakan Selenium/Request) untuk mengirimkan notifikasi interaktif kepada tim manajemen finansial setiap kali satu fase eksekusi berhasil atau gagal.",
      },
      "auto-panel": {
        title: "AUTO PANEL (Otomasi Pipeline Item Card, BOM, & RPO)",
        desc: "State machine Python berskala besar untuk otomasi pembuatan Item Card, BOM, dan RPO di Microsoft Dynamics 365 Business Central.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• State Machine Architecture: Terdiri dari 19 skrip Python terstruktur yang bertindak sebagai state machine canggih untuk otomasi ERP.\n• Date Gates Logic: Memanfaatkan pasangan kolom tanggal di Google Sheets sebagai gerbang logika (gate) untuk membaca status keberhasilan operasi POST API sebelumnya.\n• Controlled Execution: Memastikan baris data produksi hanya dieksekusi ke fase berikutnya jika fase sebelumnya terverifikasi sukses secara otomatis.",
      },
      "auto-new-dies": {
        title: "AUTO NEW DIES (Pembuatan Section, UoM, Routing & BOM)",
        desc: "Pipeline multiskrip untuk sinkronisasi master data dies secara simultan antar Google Drive, Google Sheets, dan proxy OData V4 ERP.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• Multi-Source Sync: Pipeline 14 skrip yang menyinkronkan pembuatan Section, Item, UoM, Routing, dan BOM secara paralel.\n• ETag Validation: Menangani header HTTP tingkat lanjut, termasuk pengambilan dan penyisipan ETag untuk memvalidasi operasi PATCH (Status=Certified) pada entity ERP.\n• Data Integrity: Menjaga integritas relasional master data manufaktur baru dengan validasi ketat.",
      },
      "auto-rpo-pct": {
        title: "AUTO RPO PCT (Pipeline Otomasi Produksi Kompleks)",
        desc: "Pipeline data kompleks yang melibatkan puluhan skrip Python, manajemen rate limit otomatis, dan interaksi multi-endpoint Business Central.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• Complex Pipeline: Melibatkan 27 file Python (1 orkestrator, 22 skrip fungsional, dan 4 modul pendukung) untuk memanipulasi 12 Google Sheets serta berinteraksi dengan 11 endpoint API Business Central.\n• Rate Limit Management: Manajemen pembatasan rate limit secara otomatis dengan jeda 60 detik untuk operasi POST/PATCH.\n• Interleaved Execution: Eksekusi wajib berselang-seling karena data turunan di BC harus dibaca kembali sebelum melakukan POST berikutnya.",
      },
      "bc-mrp-planning": {
        title: "Automasi Data BC – Planning MRP",
        desc: "Arsitektur Python runner-worker untuk ekstraksi dan kalkulasi stok berantai (cascading) dari endpoint OData Business Central.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• Runner-Worker Architecture: Menggunakan 8 skrip Python terbagi menjadi peran runner dan worker untuk mengekstrak data manajemen stok.\n• Cascading Calculation: Kalkulasi stok berantai per Item No secara internal, di mana sisa hitungan pada satu baris langsung dialokasikan menjadi modal awal baris berikutnya.\n• MRP Optimization: Meningkatkan kecepatan analisis perencanaan material perusahaan secara akurat.",
      },
      "eprod-fg-etl": {
        title: "Get Data Eprod FG (Pipeline ETL MariaDB ke Google Drive)",
        desc: "Sistem otomatisasi ekstraksi 4 lapis untuk menarik data pesanan produksi mentah dari database eProd ke Google Drive.",
        detail:
          "Alur Kerja & Implementasi Teknis:\n• 4-Layer Extraction: Arsitektur sistem yang mencakup Pemicu, Penjadwal, Orkestrator, dan Skrip ETL.\n• Data Transformation: Membersihkan dan mengubah bentuk data pesanan produksi mentah dari MariaDB menjadi format file Excel terstruktur.\n• Automated Upload: Mengunggah laporan operasional menggunakan Google Drive API secara berkala untuk kebutuhan tim Cutting Optimize.",
      },

      // ---------- PERSONAL ----------
      "aimg-restore": {
        title: "AI Photo Restoration",
        desc: "Aplikasi restorasi foto lama: memperbaiki wajah buram dan menaikkan resolusi 2x dengan GFPGAN dan Real-ESRGAN, lengkap dengan slider before/after. Frontend di Vercel, inferensi AI di Hugging Face (Gradio).",
      },
      "basanusantara": { title: "BasaNusantara", desc: "Platform interaktif untuk melestarikan dan mengeksplorasi bahasa-bahasa di Nusantara." },
      "smrtphn": { title: "SmrtPhn", desc: "AI Recommender untuk spesifikasi smartphone berdasarkan kebutuhan teknis." },
      "dmnet-app": { title: "DMNet-app", desc: "Networking utility tool untuk membantu profesional IT dan pelajar." },
      "kai-chatbot": { title: "Kai Chatbot", desc: "Asisten AI interaktif dengan antarmuka chatbot." },
      "jadwal-piket": { title: "Jadwal Piket", desc: "Generator otomatis pembagian jadwal piket mingguan." },
      "toba-welder": { title: "Toba Welder", desc: "Sistem otomatisasi pemberkasan untuk pembuatan kwitansi dan struk bukti pembayaran." },
      "cv-analysis-n8n": { title: "CV Analysis n8n", desc: "Otomasi scoring CV menggunakan n8n dan Google Gemini." },
      "bottle-detection": { title: "Bottle Detection", desc: "Klasifikasi jenis botol (YOLOv8 & MobileNetV2)." },
      "corrosion-thesis": { title: "Corrosion Thesis", desc: "Segmentasi citra untuk deteksi korosi pipa (Thesis)." },
      "knn-laptop": { title: "KNN Laptop", desc: "Prediksi tipe laptop dengan algoritma KNN." },
      "greedy-thr": { title: "Greedy THR", desc: "Implementasi algoritma Greedy untuk optimasi pembagian Tunjangan Hari Raya (THR)." },
      "bangkit-nod": { title: "Bangkit Project: NoD", desc: "Sistem rekomendasi Content-Based Filtering. Capstone project di Bangkit Academy." },
      "pesona-sulawesi": { title: "PesoNa Sulawesi", desc: "Sistem rekomendasi destinasi wisata di Sulawesi sesuai preferensi user." },
      "heart-disease": { title: "Heart Disease Classification", desc: "Projek klasifikasi penyakit jantung menggunakan algoritma Machine Learning." },
    },
  },

  // ------------------------------------------------------
  // ENGLISH
  // ------------------------------------------------------
  en: {
    nav: {
      home: "Home",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Let's Talk",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      skipToContent: "Skip to main content",
    },
    hero: {
      badgeOpen: "Open to new opportunities",
      badgeDefault: "Nice to connect with you",
      titleLine1: "AI Engineer &",
      titleLine2: "Automation Specialist.",
      desc: "Specializing in Machine Learning, Deep Learning, and AI model development for web and mobile apps. I build intelligent ecosystems by combining Robotic Process Automation (RPA), workflow automation pipelines, and robust IT Infrastructure.",
      ctaProfile: "View Profile",
      ctaGithub: "GitHub",
      ctaLinkedin: "LinkedIn",
    },
    stats: {
      enterprise: "Enterprise Automation Systems",
      personal: "Open Source & Research Projects",
      gpa: "B.Sc. GPA (Cum Laude)",
    },
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
      tabEnterprise: "Enterprise & NDA",
      tabPersonal: "Open Source & Research",
      tabsLabel: "Project categories",
      showMore: "Show all projects",
      showLess: "Show fewer projects",
      closeModal: "Close",
      detailTitle: "Solution & Architecture Details",
      ipNote: "*As part of company IP, the code repository is not available to the public.",
    },
    sectionSkills: {
      title: "Core Expertise",
      desc: "As an AI Engineer, I combine my expertise in Artificial Intelligence, Robotic Process Automation (RPA), and IT Infrastructure to design and implement robust, end-to-end automated digital ecosystems.",
    },
    sectionContact: {
      title: "Let's Talk",
      desc: "Interested in collaborating, or have a role that fits my skills? Feel free to reach out by email or LinkedIn.",
      btnEmail: "Send Email",
    },
    footer: "All rights reserved.",

    skillsData: [
      { title: "AI & Machine Learning", items: ["Machine Learning", "Deep Learning", "YOLO", "Image Annotation", "AI Research", "Web & Mobile AI Dev"] },
      { title: "Robotic Process Automation", items: ["Microsoft Power Automate", "Automation Anywhere", "UiPath"] },
      { title: "Intelligent Automation", items: ["Python", "n8n", "Docker", "API Integration", "Go (Golang 1.25)", "ETL Pipeline", "Self-Healing Architecture", "Rate Limiting"] },
      { title: "ERP & System Integration", items: ["Dynamics 365 BC (OData V4)", "Google Workspace APIs", "DingTalk REST API", "WhatsApp API", "xlwings", "pandas"] },
      { title: "IT Infrastructure", items: ["Mikrotik & Subnetting", "OS (Win, Linux, Mac)", "Software Installation", "WiFi Installation"] },
    ],

    experienceData: [
      { role: "ERP AI Specialist", company: "Allure (AI ERP Division)", period: "Jun 2025 - Present", desc: "Engineered an enterprise-scale automation ecosystem using a 3-Layer Architecture (Python/FastAPI) and n8n microservices. Integrated with Microsoft Dynamics 365 and manufacturing databases.", tags: ["FastAPI", "n8n", "Microservices", "ERP"] },
      { role: "AI Engineer (Internship)", company: "PT Dago Engineering", period: "Aug 2024 - Dec 2024", desc: "Built an end-to-end Machine Learning pipeline for image segmentation. Developed Mobile U-Net and ResNet-50 models through to deployment. Graduated with a 'Very Good' rating.", tags: ["Computer Vision", "Deep Learning", "Streamlit"] },
      { role: "Machine Learning Specialist", company: "Bangkit Academy", period: "Feb 2024 - Jul 2024", desc: "Developed a Content-Based Filtering recommendation system and converted H5 models to TFLite/TensorFlow.js. Achieved Distinction Graduate status.", tags: ["TensorFlow", "NLP", "Machine Learning"] },
      { role: "IT Support (Internship)", company: "SMA Negeri 1 Cibinong", period: "Jan 2016 - May 2016", desc: "Provided technical support and computer maintenance. Configured school LAN/WLAN networks (TCP/IP) to optimize connectivity.", tags: ["LAN-WAN", "TCP/IP", "Maintenance"] },
    ],
    educationData: [
      { degree: "B.Sc. in Computer Science", institution: "Universitas Pendidikan Ganesha", period: "2021 - 2025", gpa: "GPA: 3.96/4.00", desc: "Research focused on Deep Learning and Computer Vision. Completed Thesis on Comparative Analysis of Semantic Segmentation Models for industrial pipeline corrosion detection." },
      { degree: "Computer and Network Engineering", institution: "SMK Negeri 1 Cibinong", period: "2018 - 2020", gpa: "BNSP & Cisco Certified", desc: "Built a strong foundation in IT infrastructure. Earned BNSP KKNI Level II Competency Certificate and completed Cisco CCNA certification." },
    ],

    projectText: {
      // ---------- ENTERPRISE ----------
      "auto-rpo-fg": {
        title: "End-to-End Pipeline AUTO RPO FG",
        desc: "Large-scale Python orchestration automating RPO creation. Handles BOM calculation, scrap efficiency, and Master Item posting to ERP.",
        detail:
          "Workflow & Technical Implementation:\n• File Parsing: Python scripts read and extract complex tables from raw manufacturing documents (.xls/.xlsx) using `xlwings` and `pandas`.\n• Data Transformation: Calculates material efficiency percentages (Scrap %) and re-engineers Bill of Materials (BOM) structures to fit the relational ERP schema.\n• Sequential API Posting: Executes structured HTTP POST/PATCH sequences to the ERP (OData V4) to create entities chronologically: Master Item -> Routing -> Production BOM -> RPO Header -> RPO Line.\n• Fault Tolerance: Implements a 'Checkpoint System'. Before executing a POST, the script queries (GET) to verify data existence. If disconnected mid-process, the script resumes without causing duplicate ERP entries.",
      },
      "auto-to-alu": {
        title: "AUTO TO ALU (Aluminum Transfer Order Automation)",
        desc: "Enterprise automation system connecting 25-26 Flask REST API modules and n8n microservices orchestration for Aluminum Transfer Orders.",
        detail:
          "Workflow & Technical Implementation:\n• Microservices Orchestration: Coordinates 25-26 separate Flask REST API modules through 48 centralized n8n workflow nodes.\n• Multi-System Integration: Integrates scheduled HTTP triggers, Google OAuth2 authentication, Business Central OData V4 proxy, and dynamic WhatsApp Bot API payloads.\n• High Reliability: Fully automates manufacturing logistics data execution cycles precisely and in real-time.",
      },
      "auto-to-acc-2026": {
        title: "AUTO TO ACC 2026 (TO & Accessory Request Automation)",
        desc: "Transfer Order and Accessory Item Request automation system built with Flask APIs featuring self-healing architecture and sparse payloads.",
        detail:
          "Workflow & Technical Implementation:\n• Self-Healing Architecture: Operates 18 Flask API modules via n8n workflows capable of detecting and recovering data out-of-sync states automatically.\n• Sparse Payload Optimization: Optimizes web data transmission precisely by sending mandatory fields to Business Central and optional fields only when they contain actual values.\n• Transaction Integrity: Ensures consistency of manufacturing accessory transactions efficiently and reliably.",
      },
      "audit-to-rpo-fg": {
        title: "TO and RPO FG Automation Audit System",
        desc: "A backend batch system using Golang to cross-audit production automation execution results with the ERP database.",
        detail:
          "Workflow & Technical Implementation:\n• Data Extraction: The system (written in high-concurrency Golang) pulls daily data populations from production sources.\n• API Integration: Executes parallel HTTP GET requests via OData V4 API to Microsoft Dynamics 365 Business Central ERP endpoints.\n• Reconciliation & Logic: Compares source document IDs with ERP responses to detect 'Missing Data' or posting failures.\n• Self-Healing: If unposted data is found past the delay threshold, the system triggers an intelligent re-query process the following day.\n• Reporting: Audit results are processed into an HTML color matrix (Red = Failed, Green = Success) using Pandas/Go structs and dispatched automatically via Gmail API using Service Account Auth.",
      },
      "dingtalk-ncr-etl": {
        title: "DingTalk NCR ETL Module",
        desc: "Data extraction module for DingTalk platform featuring token caching, rate limiting handling, and dynamic Upsert operations to spreadsheets.",
        detail:
          "Workflow & Technical Implementation:\n• Authentication: Utilizes OAuth Desktop Authentication to rotate and cache access tokens from the DingTalk OA API.\n• Resilient Fetching: Built a query function equipped with automatic pagination and Rate Limiting (Exponential Backoff) to extract thousands of Non Conformity Records (NCR) without encountering 429 Too Many Requests blocks.\n• Deep JSON Parsing: Parses nested JSON structures to extract vital data, approval layers history, and document attachment links.\n• Dynamic Upsert: Reconciles data into a spreadsheet using Upsert logic (Update if exists, Insert if new) based on Primary Keys, preventing row duplication while preserving custom columns added manually by users.",
      },
      "auto-kaca": {
        title: "AUTO KACA Automation System",
        desc: "11 integrated scripts managing glass production workflows from raw documents to Sales Orders with spreadsheet state management & WhatsApp notifications.",
        detail:
          "Workflow & Technical Implementation:\n• State Management: Bypasses SQL databases, adopting Google Sheets API (OAuth2) as the 'Single Source of Truth' and dynamic database driving the workflow.\n• Modular Execution: Comprises 11 Python scripts triggered by date column status changes (Timestamp validation) in the spreadsheet.\n• ETL Process: Extracts documents, transforms material dimensions, and loads them into the ERP as Work Orders (WO) and Purchase Requests (PR).\n• Real-time Alerting: Integrates with WhatsApp Web API to dispatch interactive notifications to the financial management team upon the success or failure of each execution phase.",
      },
      "auto-panel": {
        title: "AUTO PANEL (Item Card, BOM, & RPO Pipeline Automation)",
        desc: "Large-scale Python state machine for automating Item Card, BOM, and RPO creation within Microsoft Dynamics 365 Business Central.",
        detail:
          "Workflow & Technical Implementation:\n• State Machine Architecture: Comprises 19 structured Python scripts acting as an advanced state machine for ERP automation.\n• Date Gates Logic: Utilizes Google Sheets date column pairs as logic gates to read success statuses of previous API POST operations.\n• Controlled Execution: Ensures production data rows are only executed to subsequent phases if previous phases verify success automatically.",
      },
      "auto-new-dies": {
        title: "AUTO NEW DIES (Section, UoM, Routing & BOM Creation)",
        desc: "Multi-script pipeline for simultaneous dies master data synchronization across Google Drive, Google Sheets, and ERP OData V4 proxy.",
        detail:
          "Workflow & Technical Implementation:\n• Multi-Source Sync: A 14-script pipeline synchronizing Section, Item, UoM, Routing, and BOM creation in parallel.\n• ETag Validation: Handles advanced HTTP headers, including fetching and inserting ETags to validate PATCH operations (Status=Certified) on ERP entities.\n• Data Integrity: Preserves relational integrity of newly minted manufacturing master data with strict validation.",
      },
      "auto-rpo-pct": {
        title: "AUTO RPO PCT (Complex Production Automation Pipeline)",
        desc: "Complex data pipeline involving dozens of Python scripts, automated rate limit management, and multi-endpoint Business Central interactions.",
        detail:
          "Workflow & Technical Implementation:\n• Complex Pipeline: Involves 27 Python files (1 orchestrator, 22 functional scripts, 4 support modules) manipulating 12 Google Sheets and interacting with 11 Business Central API endpoints.\n• Rate Limit Management: Automated rate limit throttling with a 60-second pause for POST/PATCH operations.\n• Interleaved Execution: Enforces alternating execution because child data in BC must be re-read prior to subsequent POST calls.",
      },
      "bc-mrp-planning": {
        title: "BC Data Automation – MRP Planning",
        desc: "Python runner-worker architecture for inventory data extraction and cascading stock calculations from Business Central OData endpoints.",
        detail:
          "Workflow & Technical Implementation:\n• Runner-Worker Architecture: Utilizes 8 Python scripts split into runner and worker roles to extract stock management data.\n• Cascading Calculation: Internal cascading stock calculations per Item No, where remaining counts on one row allocate directly as initial stock for the subsequent row.\n• MRP Optimization: Accelerates company material planning analysis accurately.",
      },
      "eprod-fg-etl": {
        title: "Get Data Eprod FG (MariaDB to Google Drive ETL Pipeline)",
        desc: "4-layer extraction automation system pulling raw production order data from the eProd database to Google Drive.",
        detail:
          "Workflow & Technical Implementation:\n• 4-Layer Extraction: System architecture encompassing Trigger, Scheduler, Orchestrator, and ETL Scripts.\n• Data Transformation: Cleans and reshapes raw production order data from MariaDB into structured Excel file formats.\n• Automated Upload: Periodically uploads operational reports using the Google Drive API for Cutting Optimize team usage.",
      },

      // ---------- PERSONAL ----------
      "aimg-restore": {
        title: "AI Photo Restoration",
        desc: "Old-photo restoration app: repairs blurry faces and upscales 2x using GFPGAN and Real-ESRGAN, with an interactive before/after slider. Frontend on Vercel, AI inference on Hugging Face (Gradio).",
      },
      "basanusantara": { title: "BasaNusantara", desc: "Interactive platform to preserve and explore languages across the Nusantara archipelago." },
      "smrtphn": { title: "SmrtPhn", desc: "AI Recommender for smartphone specifications based on technical requirements." },
      "dmnet-app": { title: "DMNet-app", desc: "Networking utility tool designed to assist IT professionals and students." },
      "kai-chatbot": { title: "Kai Chatbot", desc: "Interactive AI assistant with a seamless chatbot interface." },
      "jadwal-piket": { title: "Jadwal Piket", desc: "Automated generator for efficient weekly duty scheduling." },
      "toba-welder": { title: "Toba Welder", desc: "Automated document workflow system for generating receipts and payment proofs." },
      "cv-analysis-n8n": { title: "CV Analysis n8n", desc: "Automated CV scoring pipeline using n8n and Google Gemini." },
      "bottle-detection": { title: "Bottle Detection", desc: "Bottle type classification using YOLOv8 & MobileNetV2." },
      "corrosion-thesis": { title: "Corrosion Thesis", desc: "Image segmentation for pipeline corrosion detection (Thesis)." },
      "knn-laptop": { title: "KNN Laptop", desc: "Laptop type prediction using the KNN algorithm." },
      "greedy-thr": { title: "Greedy THR", desc: "Greedy algorithm implementation for optimizing holiday allowance distribution." },
      "bangkit-nod": { title: "Bangkit Project: NoD", desc: "Content-Based Filtering recommendation system. Bangkit Academy Capstone." },
      "pesona-sulawesi": { title: "PesoNa Sulawesi", desc: "Tourism destination recommender system based on user preferences." },
      "heart-disease": { title: "Heart Disease Classification", desc: "Heart disease classification project using Machine Learning algorithms." },
    },
  },
};

// ==========================================================
// HELPER: gabungkan data bersama + teks per bahasa
// ==========================================================
export function getProjects(lang: Lang): Project[] {
  const text = dict[lang].projectText;
  return projectBase.map((base) => ({ ...base, ...text[base.id] }));
}
