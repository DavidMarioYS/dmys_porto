import React from "react";

// Data Lengkap 10 Projek
const projectData = [
  {
    title: "SmrtPhn",
    desc: "AI Recommender untuk spesifikasi smartphone berdasarkan kebutuhan teknis.",
    github: "https://github.com/DavidMarioYS/SmartPhn",
    demo: "https://smart-phn-syqd.vercel.app/",
    tags: ["Local LLM", "Python"]
  },
  {
    title: "DMNet-app",
    desc: "Networking utility tool untuk membantu profesional IT dan pelajar.",
    github: "https://github.com/DavidMarioYS/DMNet-app",
    demo: "https://dm-net-app.vercel.app/",
    tags: ["Networking", "Vercel"]
  },
  {
    title: "Kai Chatbot",
    desc: "Asisten AI interaktif dengan antarmuka chatbot.",
    github: "https://github.com/DavidMarioYS/kai-chatbot",
    demo: "https://davidmarioys.github.io/kai-chatbot/",
    tags: ["Chatbot", "AI"]
  },
  {
    title: "Jadwal Piket",
    desc: "Generator otomatis pembagian jadwal piket mingguan.",
    github: "https://github.com/DavidMarioYS/Jadwal-Piket-Mingguan-Generator",
    demo: "https://davidmarioys.github.io/Jadwal-Piket-Mingguan-Generator/",
    tags: ["Automation", "Web"]
  },
  {
    title: "Toba Welder",
    desc: "Sistem Kwitansi dan Struk Pembayaran",
    github: "https://github.com/DavidMarioYS/Toba-Welder",
    tags: ["Automation", "AI"]
  },
  {
    title: "CV Analysis n8n",
    desc: "Otomasi scoring CV menggunakan n8n dan Google Gemini.",
    github: "https://github.com/DavidMarioYS/Automation-CV-Analysis-Scoring-Pipeline-n8n-Google-Gemini",
    tags: ["n8n", "Gemini AI"]
  },
  {
    title: "Bottle Detection",
    desc: "Klasifikasi jenis botol (YOLOv8 & MobileNetV2).",
    github: "https://github.com/DavidMarioYS/Computer-Vision-Project-Deteksi-Klasifikasi-Jenis-Botol-Menggunakan-YOLOv8-dan-MobileNetV2",
    tags: ["YOLOv8", "Deep Learning"]
  },
  {
    title: "Corrosion Thesis",
    desc: "Segmentasi citra untuk deteksi korosi pipa (Thesis).",
    github: "https://github.com/DavidMarioYS/Thesis-Project-Corrosion-Pipes-Image-Segmentation",
    tags: ["Segmentation", "Research"]
  },
  {
    title: "PesoNa",
    desc: "Sistem rekomendasi destinasi wisata sesuai preferensi user.",
    github: "https://github.com/DavidMarioYS/Projek-Akhir-PesoNa---Sistem-Rekomendasi-Wisata",
    tags: ["Recommender", "Web"]
  },
  {
    title: "KNN Laptop",
    desc: "Prediksi tipe laptop dengan algoritma KNN.",
    github: "https://github.com/DavidMarioYS/KNN-Prediksi-Type-Laptop",
    tags: ["Machine Learning", "Python"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      
      {/* NAVBAR (Kayu Terang & Alam) */}
      <header className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter text-stone-800">
            HANES<span className="text-emerald-600">.</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-stone-600">
            <a href="#home" className="hover:text-emerald-600 transition">Home</a>
            <a href="#projects" className="hover:text-emerald-600 transition">Projects</a>
            <a href="#skills" className="hover:text-emerald-600 transition">Skills</a>
          </nav>
          <a href="mailto:emailmu@gmail.com" className="border-2 border-emerald-600 text-emerald-700 px-5 py-2 rounded-full text-sm font-bold hover:bg-emerald-600 hover:text-white transition">
            Let's Talk
          </a>
        </div>
      </header>

      <main>
        {/* ================= HERO SECTION (Overlay Stone Hangat) ================= */}
        <section id="home" className="relative pt-40 pb-20 flex flex-col justify-center min-h-svh bg-[url('/me.jpeg')] bg-cover bg-position-[80%_center] md:bg-center bg-no-repeat bg-scroll md:bg-fixed">
          
          {/* Overlay Gradasi Pastel Hangat: dari warna stone (kayu pucat) ke transparan */}
          <div className="absolute inset-0 bg-linear-to-r from-stone-50 via-stone-50/90 to-transparent z-0"></div>

          {/* Konten Teks */}
          <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
            <p className="text-emerald-700 font-bold tracking-widest text-sm mb-4 uppercase">
              NICE TO CONNECT WITH YOU.
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-stone-800 leading-tight mb-6 tracking-tight">
              I build <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">Intelligent</span> <br />
              Systems & Networks.
            </h1>
            <p className="max-w-xl text-lg text-stone-600 mb-10 leading-relaxed font-medium">
              Building systems that are not only connected but also intelligent. Specializing in IT networking optimization, AI and machine learning implementation, and designing seamless automation architectures based on n8n and APIs.
            </p>
            
            <div className="flex gap-4">
              <a href="#projects" className="bg-linear-to-r from-emerald-600 to-teal-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition shadow-lg shadow-emerald-200/50">
                View Work
              </a>
              <a href="https://github.com/DavidMarioYS" target="_blank" rel="noopener noreferrer" className="bg-white text-stone-800 px-8 py-3 rounded-full font-bold hover:bg-stone-100 transition border border-stone-300 shadow-sm">
                GitHub Profile
              </a>
            </div>
          </div>
        </section>

        {/* ================= PROJECTS SECTION ================= */}
        <section id="projects" className="py-24 px-6 bg-white border-y border-stone-200">
          <div className="max-w-screen mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 tracking-tight">Featured Projects</h2>
              <div className="w-20 h-1.5 bg-emerald-500 rounded-full"></div>
            </div>

            {/* Grid 5 Kolom - Nuansa Pastel Nature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {projectData.map((project, index) => (
                <div key={index} className="group flex flex-col bg-stone-50/50 rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition duration-300">
                  <div className="p-6 flex-1">
                    {/* Badge Tags - Hijau Daun Pastel */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tIndex) => (
                        <span key={tIndex} className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-black text-stone-800 mb-2 group-hover:text-emerald-600 transition line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-3 font-medium">
                      {project.desc}
                    </p>
                  </div>

                  <div className="p-4 pt-0 mt-auto flex flex-col gap-2">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl text-center hover:bg-emerald-700 transition shadow-md shadow-emerald-100">
                        Live Demo &rarr;
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-white text-stone-600 text-xs font-bold rounded-xl text-center border border-stone-300 hover:bg-stone-100 transition">
                      View Repository
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SKILLS SECTION ================= */}
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
                <div key={index} className="bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-center text-center hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-50 transition">
                  <span className="font-bold text-stone-700">{skill}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 text-center text-stone-500 text-sm border-t border-stone-200 bg-white">
        <p className="font-medium">© {new Date().getFullYear()} David Mario Yohanes Samosir. All rights reserved.</p>
      </footer>

    </div>
  );
}