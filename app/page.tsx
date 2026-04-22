"use client";

import React, { useRef, useState } from "react";

// 1. Data Projek Lengkap (13 Projek)
const projectData = [
  { title: "SmrtPhn", desc: "AI Recommender untuk spesifikasi smartphone berdasarkan kebutuhan teknis.", github: "https://github.com/DavidMarioYS/SmartPhn", demo: "https://smart-phn-syqd.vercel.app/", tags: ["Local LLM", "Python"] },
  { title: "DMNet-app", desc: "Networking utility tool untuk membantu profesional IT dan pelajar.", github: "https://github.com/DavidMarioYS/DMNet-app", demo: "https://dm-net-app.vercel.app/", tags: ["Networking", "Vercel"] },
  { title: "Kai Chatbot", desc: "Asisten AI interaktif dengan antarmuka chatbot.", github: "https://github.com/DavidMarioYS/kai-chatbot", demo: "https://davidmarioys.github.io/kai-chatbot/", tags: ["Chatbot", "AI"] },
  { title: "Jadwal Piket", desc: "Generator otomatis pembagian jadwal piket mingguan.", github: "https://github.com/DavidMarioYS/Jadwal-Piket-Mingguan-Generator", demo: "https://davidmarioys.github.io/Jadwal-Piket-Mingguan-Generator/", tags: ["Automation", "Web"] },
  { title: "Toba Welder", desc: "Sistem deteksi kualitas las menggunakan Computer Vision.", github: "https://github.com/DavidMarioYS/Toba-Welder", tags: ["Computer Vision", "AI"] },
  { title: "CV Analysis n8n", desc: "Otomasi scoring CV menggunakan n8n dan Google Gemini.", github: "https://github.com/DavidMarioYS/Automation-CV-Analysis-Scoring-Pipeline-n8n-Google-Gemini", tags: ["n8n", "Gemini AI"] },
  { title: "Bottle Detection", desc: "Klasifikasi jenis botol (YOLOv8 & MobileNetV2).", github: "https://github.com/DavidMarioYS/Computer-Vision-Project-Deteksi-Klasifikasi-Jenis-Botol-Menggunakan-YOLOv8-dan-MobileNetV2", tags: ["YOLOv8", "Deep Learning"] },
  { title: "Corrosion Thesis", desc: "Segmentasi citra untuk deteksi korosi pipa (Thesis).", github: "https://github.com/DavidMarioYS/Thesis-Project-Corrosion-Pipes-Image-Segmentation", tags: ["Segmentation", "Research"] },
  { title: "KNN Laptop", desc: "Prediksi tipe laptop dengan algoritma KNN.", github: "https://github.com/DavidMarioYS/KNN-Prediksi-Type-Laptop", tags: ["Machine Learning", "Python"] },
  { title: "Greedy THR", desc: "Implementasi algoritma Greedy untuk optimasi pembagian Tunjangan Hari Raya (THR).", github: "https://github.com/DavidMarioYS/Greedy-THR", tags: ["Algorithm", "Python"] },
  { title: "Bangkit Project: NoD", desc: "Sistem rekomendasi Content-Based Filtering. Capstone project di Bangkit Academy.", github: "https://github.com/DavidMarioYS/Bangkit-Project-NoD", tags: ["Machine Learning", "TensorFlow"] },
  { title: "PesoNa Sulawesi", desc: "Sistem rekomendasi destinasi wisata di Sulawesi sesuai preferensi user.", github: "https://github.com/DavidMarioYS/Projek-PesoNa-Sulawesi-Sistem-Rekomendasi-Wisata", tags: ["Recommender", "Web"] },
  { title: "Heart Disease Classification", desc: "Projek klasifikasi penyakit jantung menggunakan algoritma Machine Learning.", github: "https://github.com/DavidMarioYS/Projek_Klasifikasi_Penyakit_Jantung", tags: ["Classification", "Data Science"] }
];

// 2. Data Pengalaman
const experienceData = [
  { role: "ERP AI Specialist", company: "Allure (AI ERP Division)", period: "Jun 2025 - Sekarang", desc: "Merancang ekosistem otomasi skala enterprise dengan arsitektur 3-Layer (Python/FastAPI) dan microservices n8n. Terintegrasi dengan Microsoft Dynamics 365 dan database manufaktur.", tags: ["FastAPI", "n8n", "Microservices", "ERP"] },
  { role: "AI Engineer (Internship)", company: "PT Dago Engineering", period: "Agt 2024 - Des 2024", desc: "Membangun pipeline Machine Learning end-to-end untuk segmentasi citra. Mengembangkan model Mobile U-Net dan ResNet-50 hingga tahap deployment. Lulus dengan predikat 'Sangat Baik'.", tags: ["Computer Vision", "Deep Learning", "Streamlit"] },
  { role: "Machine Learning Specialist", company: "Bangkit Academy", period: "Feb 2024 - Jul 2024", desc: "Mengembangkan sistem rekomendasi Content-Based Filtering dan mengonversi model H5 ke TFLite/TensorFlow.js. Meraih predikat Distinction Graduate.", tags: ["TensorFlow", "NLP", "Machine Learning"] },
  { role: "IT Support (Internship)", company: "SMA Negeri 1 Cibinong", period: "Jan 2016 - Mei 2016", desc: "Memberikan dukungan teknis dan pemeliharaan komputer. Mengonfigurasi jaringan LAN/WLAN sekolah (TCP/IP) guna meningkatkan konektivitas.", tags: ["LAN-WAN", "TCP/IP", "Maintenance"] }
];

// 3. Data Pendidikan
const educationData = [
  { degree: "S1 Ilmu Komputer", institution: "Universitas Pendidikan Ganesha", period: "2021 - 2025", gpa: "GPA: 3.96/4.00", desc: "Fokus penelitian pada Deep Learning dan Computer Vision. Mengerjakan Tugas Akhir Analisis Komparatif Model Semantic Segmentation untuk deteksi korosi pipa industri." },
  { degree: "Teknik Komputer dan Jaringan", institution: "SMK Negeri 1 Cibinong", period: "2018 - 2020", gpa: "Sertifikasi BNSP & Cisco", desc: "Membangun pondasi keahlian infrastruktur IT. Meraih Sertifikat Kompetensi BNSP KKNI Level II serta menyelesaikan sertifikasi Cisco CCNA." }
];

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fungsi menggeser carousel dengan panah
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Fungsi mendeteksi progress bar saat di-swipe/scroll
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      
      if (maxScrollLeft > 0) {
        const progress = (scrollLeft / maxScrollLeft) * 100;
        setScrollProgress(progress);
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans overflow-x-hidden">
      
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-xl border-b border-stone-200/50 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter text-stone-800">
            HANES<span className="text-emerald-500 animate-pulse">.</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-stone-600">
            <a href="#home" className="hover:text-emerald-600 hover:-translate-y-0.5 transition-all">Home</a>
            <a href="#experience" className="hover:text-emerald-600 hover:-translate-y-0.5 transition-all">Experience</a>
            <a href="#projects" className="hover:text-emerald-600 hover:-translate-y-0.5 transition-all">Projects</a>
            <a href="#skills" className="hover:text-emerald-600 hover:-translate-y-0.5 transition-all">Skills</a>
          </nav>
          <a href="mailto:davidmario484@gmail.com" className="border-2 border-emerald-500 text-emerald-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300">
            Let's Talk
          </a>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative pt-40 pb-20 flex flex-col justify-center min-h-svh bg-[url('/me.jpeg')] bg-cover bg-position-[80%_center] md:bg-center bg-no-repeat bg-scroll md:bg-fixed">
          <div className="absolute inset-0 bg-linear-to-r from-stone-50 via-stone-50/95 to-stone-50/10 z-0"></div>
          
          <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
            <div className="inline-block mb-4 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <p className="text-emerald-600 font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Nice to connect with you
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-stone-800 leading-tight mb-6 tracking-tight">
              Bridging IT Infrastructure <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-400">With Intelligent</span> <br />
              Automation.
            </h1>
            <p className="max-w-xl text-lg text-stone-600 mb-10 leading-relaxed font-medium">
              Building systems that are not only connected but also intelligent. Specializing in IT networking optimization, AI and machine learning implementation, and designing seamless automation architectures based on n8n and APIs.
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
                <h2 className="text-3xl font-black text-stone-800 mb-2 tracking-tight">Experience</h2>
                <div className="w-16 h-1.5 bg-emerald-500 rounded-full mb-4"></div>
              </div>
              <div className="border-l-2 border-stone-200 pl-8 space-y-10 ml-2">
                {experienceData.map((exp, index) => (
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
                <h2 className="text-3xl font-black text-stone-800 mb-2 tracking-tight">Education</h2>
                <div className="w-16 h-1.5 bg-teal-500 rounded-full mb-4"></div>
              </div>
              <div className="border-l-2 border-stone-200 pl-8 space-y-10 ml-2">
                {educationData.map((edu, index) => (
                  <div key={index} className="relative group">
                    <span className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-stone-200 border-4 border-stone-50 group-hover:bg-teal-500 group-hover:scale-150 transition-all duration-500 shadow-sm"></span>
                    <h3 className="text-xl font-bold text-stone-800 leading-tight mb-1 group-hover:text-teal-600 transition-colors">{edu.degree}</h3>
                    <p className="text-teal-600 font-bold text-sm mb-2">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-stone-500 text-xs font-semibold bg-stone-200/50 px-2 py-1 rounded-md">{edu.period}</span>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] px-2.5 py-1 rounded-md font-black uppercase tracking-wider">{edu.gpa}</span>
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-stone-100 shadow-sm group-hover:shadow-md transition-shadow">
                      <span className="font-bold text-stone-800">Highlight:</span> {edu.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION (ANIMATED CAROUSEL) */}
        <section id="projects" className="py-24 pl-6 bg-white border-b border-stone-200 overflow-hidden relative">
          {/* Latar Belakang Dekoratif Abstrak */}
          <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-b from-emerald-50 to-transparent rounded-full blur-3xl -mr-64 -mt-32 opacity-60 z-0"></div>

          <div className="max-w-6xl mx-auto pr-6 relative z-10">
            
            {/* Header & Navigasi */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 tracking-tight">Featured Projects</h2>
                <div className="w-20 h-1.5 bg-emerald-500 rounded-full"></div>
                <p className="text-stone-500 text-sm font-medium mt-4">Koleksi {projectData.length} portofolio yang dapat digeser.</p>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => scroll("left")} className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-stone-400 border border-stone-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-200/50 hover:-translate-x-1" aria-label="Geser Kiri">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button onClick={() => scroll("right")} className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-stone-400 border border-stone-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-200/50 hover:translate-x-1" aria-label="Geser Kanan">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>

            {/* Container Carousel */}
            <div 
              ref={carouselRef} 
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-6 pb-12 pt-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
              {projectData.map((project, index) => (
                <div 
                  key={index} 
                  className="snap-start shrink-0 w-75 sm:w-85 flex flex-col bg-white rounded-3xl border border-stone-200 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] group overflow-hidden"
                >
                  {/* Decorative Header Banner */}
                  <div className="h-28 bg-stone-100 group-hover:bg-linear-to-br group-hover:from-emerald-400 group-hover:to-teal-500 transition-all duration-700 relative flex items-center justify-center overflow-hidden">
                    {/* Lingkaran Abstrak dalam Banner */}
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-lg group-hover:scale-150 transition-transform duration-700"></div>
                    
                    {/* Ikon Folder/Tech */}
                    <svg className="w-10 h-10 text-stone-300 group-hover:text-white/90 group-hover:scale-110 transition-all duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>

                  {/* Card Content */}
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

                  {/* Card Actions */}
                  <div className="p-7 pt-0 mt-auto flex flex-col gap-2 bg-white">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-stone-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl text-center group-hover:bg-emerald-500 transition-all duration-300 shadow-md">
                        Live Demo
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-transparent text-stone-600 text-xs font-bold uppercase tracking-widest rounded-xl text-center border-2 border-stone-200 hover:border-stone-800 hover:text-stone-800 transition-all duration-300">
                      GitHub Repo
                    </a>
                  </div>
                </div>
              ))}
              
              <div className="shrink-0 w-6"></div>
            </div>

            {/* Scroll Progress Bar */}
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
              <h2 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 tracking-tight">Core Expertise</h2>
              <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-6"></div>
              <p className="text-stone-600 leading-relaxed font-medium">
                Kombinasi keahlian di bidang infrastruktur jaringan dan kecerdasan buatan, memungkinkan saya untuk membangun sistem end-to-end yang tangguh, otomatis, dan cerdas.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['Python', 'Local RAG', 'LLM Development', 'n8n Automation', 'API Integration', 'IT Networking', 'Cloud Systems', 'Streamlit', 'Next.js'].map((skill, index) => (
                <div key={index} className="bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-center text-center hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  <span className="font-bold text-stone-600 group-hover:text-emerald-600 transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-stone-500 text-sm border-t border-stone-200 bg-white">
        <p className="font-medium">© {new Date().getFullYear()} David Mario Yohanes Samosir. All rights reserved.</p>
      </footer>

    </div>
  );
}