"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import CaseStudyModal from "./case-study-modal";
import {
  dict,
  getProjects,
  profile,
  type Lang,
  type Project,
  type ProjectType,
} from "./portfolio-data";

const LANG_STORAGE_KEY = "portfolio-lang";
const INITIAL_VISIBLE_PROJECTS = 6;

export default function Home() {
  const [lang, setLang] = useState<Lang>("id");
  const [activeProjectType, setActiveProjectType] = useState<ProjectType>("enterprise");
  const [showAllProjects, setShowAllProjects] = useState(false);
  // Simpan id (bukan objek) agar isi modal ikut berganti bahasa saat toggle ID/EN
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict[lang];
  const projects = useMemo(() => getProjects(lang), [lang]);
  const selectedCaseStudy: Project | null = useMemo(
    () => projects.find((p) => p.id === selectedCaseStudyId) ?? null,
    [projects, selectedCaseStudyId]
  );

  // Pulihkan bahasa pilihan pengunjung (dibaca setelah mount agar tidak memicu hydration mismatch)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "id" || saved === "en") setLang(saved);
    } catch {
      // localStorage bisa diblokir (mode privat); abaikan saja
    }
  }, []);

  // Sinkronkan atribut lang pada <html> dan simpan pilihan
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // abaikan
    }
  }, [lang]);

  // Tutup menu mobile dengan Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeCaseStudy = useCallback(() => setSelectedCaseStudyId(null), []);

  // Projek unggulan tampil lebih dulu; sort stabil menjaga urutan lain tetap seperti di data
  const projectsOfActiveType = useMemo(
    () =>
      projects
        .filter((p) => p.type === activeProjectType)
        .sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
    [projects, activeProjectType]
  );

  const visibleProjects = showAllProjects
    ? projectsOfActiveType
    : projectsOfActiveType.slice(0, INITIAL_VISIBLE_PROJECTS);
  const hasMoreProjects = projectsOfActiveType.length > INITIAL_VISIBLE_PROJECTS;

  // Angka statistik dihitung dari data, jadi selalu sinkron dan tidak ada angka yang dikarang
  const enterpriseCount = projects.filter((p) => p.type === "enterprise").length;
  const personalCount = projects.filter((p) => p.type === "personal").length;

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
  ];

  const handleTabChange = (type: ProjectType) => {
    setActiveProjectType(type);
    setShowAllProjects(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans overflow-x-hidden relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:text-stone-800 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        {t.nav.skipToContent}
      </a>

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 w-full z-40 bg-stone-50/80 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-xl font-black tracking-tighter text-stone-800">
            {profile.brand}
            <span className="text-emerald-500">.</span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex gap-8 text-sm font-semibold text-stone-600">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-emerald-600 hover:-translate-y-0.5 transition-all">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div
              role="group"
              aria-label="Language"
              className="flex items-center bg-stone-200/80 p-1 rounded-full border border-stone-300 shadow-inner"
            >
              {(["id", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`px-3 py-1.5 text-xs font-black rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                    lang === code ? "bg-white text-emerald-600 shadow-sm" : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <a
              href="#contact"
              className="hidden sm:block border-2 border-emerald-500 text-emerald-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300"
            >
              {t.nav.contact}
            </a>

            {/* Tombol hamburger (mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Mobile" className="md:hidden border-t border-stone-200 bg-stone-50/95 backdrop-blur-xl">
            <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {[...navLinks, { href: "#contact", label: t.nav.contact }].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-base font-semibold text-stone-700 hover:text-emerald-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main id="main">
        {/* ================= HERO ================= */}
        <section id="home" className="relative isolate pt-40 pb-20 flex flex-col justify-center min-h-svh scroll-mt-24">
          <Image
            src="/me.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[80%_center] md:object-center -z-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-stone-50 via-stone-50/95 to-stone-50/10 -z-10" />

          <div className="px-6 max-w-6xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <span className="relative flex w-2 h-2" aria-hidden="true">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              <p className="text-emerald-600 font-bold tracking-widest text-xs uppercase">
                {profile.openToWork ? t.hero.badgeOpen : t.hero.badgeDefault}
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-stone-800 leading-tight mb-6 tracking-tight">
              {t.hero.titleLine1} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-400">
                {t.hero.titleLine2}
              </span>
            </h1>

            <p className="max-w-xl text-lg text-stone-600 mb-10 leading-relaxed font-medium">{t.hero.desc}</p>

            <div className="flex flex-wrap gap-4 mb-14">
              <a
                href="#experience"
                className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-emerald-200/50"
              >
                {t.hero.ctaProfile}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-stone-800 px-8 py-3.5 rounded-full font-bold hover:bg-stone-100 hover:shadow-md transition-all duration-300 border border-stone-200"
              >
                {t.hero.ctaGithub}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-stone-800 px-8 py-3.5 rounded-full font-bold hover:bg-stone-100 hover:shadow-md transition-all duration-300 border border-stone-200"
              >
                {t.hero.ctaLinkedin}
              </a>
            </div>

            {/* Ringkasan angka: angka berasal dari data, bukan hardcode */}
            <dl className="grid grid-cols-3 gap-4 max-w-xl">
              {[
                { value: `${enterpriseCount}`, label: t.stats.enterprise },
                { value: `${personalCount}`, label: t.stats.personal },
                { value: "3.96", label: t.stats.gpa },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/80 backdrop-blur border border-stone-200 rounded-2xl px-4 py-3">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl md:text-3xl font-black text-emerald-600 leading-none">{stat.value}</dd>
                  <p className="mt-1 text-[11px] font-semibold text-stone-500 leading-snug" aria-hidden="true">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================= EXPERIENCE & EDUCATION ================= */}
        <section id="experience" className="py-24 px-6 bg-stone-100/30 border-y border-stone-200/50 scroll-mt-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-black text-stone-800 mb-2 tracking-tight">{t.sectionExp.titleExp}</h2>
                <p className="text-stone-500 text-sm font-medium mb-4">{t.sectionExp.subExp}</p>
                <div className="w-16 h-1.5 bg-emerald-500 rounded-full" />
              </div>
              <div className="border-l-2 border-stone-200 pl-8 space-y-10 ml-2">
                {t.experienceData.map((exp) => (
                  <div key={`${exp.company}-${exp.period}`} className="relative group">
                    <span className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-stone-200 border-4 border-stone-50 group-hover:bg-emerald-500 group-hover:scale-150 transition-all duration-500 shadow-sm" />
                    <h3 className="text-xl font-bold text-stone-800 leading-tight mb-1 group-hover:text-emerald-600 transition-colors">{exp.role}</h3>
                    <p className="text-emerald-600 font-bold text-sm mb-3">
                      {exp.company} <span className="text-stone-400 font-medium ml-1">| {exp.period}</span>
                    </p>
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white border border-stone-200 text-stone-500 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider shadow-sm group-hover:border-emerald-200 transition-colors"
                        >
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
                <div className="w-16 h-1.5 bg-teal-500 rounded-full" />
              </div>
              <div className="border-l-2 border-stone-200 pl-8 space-y-10 ml-2">
                {t.educationData.map((edu) => (
                  <div key={`${edu.institution}-${edu.period}`} className="relative group">
                    <span className="absolute -left-10.25 top-1.5 w-4 h-4 rounded-full bg-stone-200 border-4 border-stone-50 group-hover:bg-teal-500 group-hover:scale-150 transition-all duration-500 shadow-sm" />
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

        {/* ================= PROJECTS ================= */}
        <section id="projects" className="py-24 px-6 bg-white border-b border-stone-200 overflow-hidden relative scroll-mt-16">
          <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-b from-emerald-50 to-transparent rounded-full blur-3xl -mr-64 -mt-32 opacity-60 pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 tracking-tight">{t.sectionProj.title}</h2>
                <div className="w-20 h-1.5 bg-emerald-500 rounded-full" />
                <p className="text-stone-500 text-sm font-medium mt-4">{t.sectionProj.sub}</p>
              </div>

              <div role="tablist" aria-label={t.sectionProj.tabsLabel} className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200 self-start sm:self-auto">
                {(
                  [
                    { type: "enterprise", label: t.sectionProj.tabEnterprise },
                    { type: "personal", label: t.sectionProj.tabPersonal },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.type}
                    type="button"
                    role="tab"
                    id={`tab-${tab.type}`}
                    aria-selected={activeProjectType === tab.type}
                    aria-controls="project-grid"
                    onClick={() => handleTabChange(tab.type)}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${
                      activeProjectType === tab.type
                        ? "bg-white text-emerald-600 shadow-sm border border-stone-200"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              id="project-grid"
              role="tabpanel"
              aria-labelledby={`tab-${activeProjectType}`}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleProjects.map((project) => {
                const repoLinks =
                  project.repos ?? (project.github ? [{ label: t.sectionProj.btnRepo, url: project.github }] : []);

                return (
                  <article
                    key={project.id}
                    className="flex flex-col bg-white rounded-3xl border border-stone-200 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] group overflow-hidden"
                  >
                    {project.image ? (
                      <div className="relative h-44 bg-stone-100 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ) : (
                      <div
                        className={`h-28 ${project.type === "enterprise" ? "bg-stone-800" : "bg-stone-100"} group-hover:bg-linear-to-br group-hover:from-emerald-400 group-hover:to-teal-500 transition-all duration-700 relative flex items-center justify-center overflow-hidden`}
                      >
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-lg group-hover:scale-150 transition-transform duration-700" />
                        <svg
                          className={`w-10 h-10 ${project.type === "enterprise" ? "text-emerald-500" : "text-stone-300"} group-hover:text-white/90 group-hover:scale-110 transition-all duration-500 relative z-10`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          {project.type === "enterprise" ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                          )}
                        </svg>
                      </div>
                    )}

                    <div className="p-7 flex-1">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-black uppercase tracking-widest bg-stone-100 text-stone-500 px-2.5 py-1 rounded-md group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-black text-stone-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-stone-500 leading-relaxed line-clamp-4">{project.desc}</p>
                    </div>

                    <div className="p-7 pt-0 mt-auto flex flex-col gap-2">
                      {project.type === "enterprise" ? (
                        <button
                          type="button"
                          onClick={() => setSelectedCaseStudyId(project.id)}
                          className="w-full py-3 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest rounded-xl text-center border-2 border-emerald-100 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-sm cursor-pointer"
                        >
                          {t.sectionProj.btnCaseStudy}
                        </button>
                      ) : (
                        <>
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-3 bg-stone-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl text-center hover:bg-emerald-500 transition-all duration-300 shadow-md"
                            >
                              {t.sectionProj.btnDemo}
                            </a>
                          )}
                          {repoLinks.map((repo) => (
                            <a
                              key={repo.url}
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-3 bg-transparent text-stone-600 text-xs font-bold uppercase tracking-widest rounded-xl text-center border-2 border-stone-200 hover:border-stone-800 hover:text-stone-800 transition-all duration-300"
                            >
                              {repo.label}
                            </a>
                          ))}
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {hasMoreProjects && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllProjects((value) => !value)}
                  aria-expanded={showAllProjects}
                  className="px-8 py-3 rounded-full border-2 border-stone-200 text-stone-700 text-sm font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
                >
                  {showAllProjects ? t.sectionProj.showLess : t.sectionProj.showMore}
                  <span className="text-stone-400 font-medium ml-2">
                    ({visibleProjects.length}/{projectsOfActiveType.length})
                  </span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ================= SKILLS ================= */}
        <section id="skills" className="py-24 px-6 bg-stone-50 scroll-mt-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-4xl font-black text-stone-800 mb-4 tracking-tight">{t.sectionSkills.title}</h2>
              <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-6" />
              <p className="text-stone-600 leading-relaxed font-medium mb-8">{t.sectionSkills.desc}</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.skillsData.map((category) => (
                <div
                  key={category.title}
                  className="bg-white border border-stone-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300 group"
                >
                  <h3 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="py-24 px-6 bg-stone-800 text-white scroll-mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">{t.sectionContact.title}</h2>
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full mx-auto mb-6" />
            <p className="text-stone-300 leading-relaxed font-medium mb-10">{t.sectionContact.desc}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-emerald-900/30"
              >
                {t.sectionContact.btnEmail}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {t.hero.ctaLinkedin}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {t.hero.ctaGithub}
              </a>
            </div>
            <p className="mt-8 text-sm text-stone-400">{profile.email}</p>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 text-center text-stone-500 text-sm border-t border-stone-200 bg-white">
        <p className="font-medium">
          © {new Date().getFullYear()} {profile.name}. {t.footer}
        </p>
      </footer>

      {/* ================= CASE STUDY MODAL ================= */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          labels={{
            close: t.sectionProj.closeModal,
            detailTitle: t.sectionProj.detailTitle,
            ipNote: t.sectionProj.ipNote,
          }}
          onClose={closeCaseStudy}
        />
      )}
    </div>
  );
}
