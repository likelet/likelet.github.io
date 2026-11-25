(() => {
  "use strict";
  const app = document.getElementById("app");
  const site = "https://seqworld.com";
  const paper = "https://pubmed.ncbi.nlm.nih.gov/41720086/";
  const gcap = "https://github.com/ShixiangWang/gcap";
  const chapterIds = ["resistance-design", "resistance-findings", "resistance-interpretation"];
  const route = () => location.hash.slice(1) || "home";
  const isTopic = () => route() === "resistance" || chapterIds.includes(route());
  const explicitLang = new URLSearchParams(location.search).get("lang");
  let savedLang;
  try { savedLang = localStorage.getItem("qi-preview-language"); } catch {}
  let lang = [explicitLang, savedLang].find(value => ["en", "zh"].includes(value)) ||
    (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
  const t = () => window.QI_COPY[lang];
  const choose = (en, zh) => lang === "zh" ? zh : en;
  const arrow = '<span aria-hidden="true" class="arrow">↗</span>';
  const next = '<span aria-hidden="true" class="arrow">→</span>';
  function languageLink(locale, label) {
    const fragment = encodeURIComponent(route());
    return `<a data-lang="${locale}" lang="${locale}" href="?lang=${locale}#${fragment}" ${locale === lang ? 'aria-current="true" class="active"' : ""}>${label}</a>`;
  }
  function header() {
    const c = t();
    return `<a class="skip-link" href="#main-content">${c.skip}</a>
      <header class="site-header"><div class="shell header-inner">
      <a class="brand" href="#home" aria-label="${choose("Qi Lab home", "Qi Lab 首页")}"><span class="brand-mark" aria-hidden="true">Q</span><span class="brand-name">Qi Lab</span></a>
      <nav class="main-nav" id="main-nav" aria-label="${choose("Main navigation","主导航")}"><a href="#research">${c.navResearch}</a><a href="#people">${c.navPeople}</a><a href="#tools">${c.navTools}</a><a href="#papers">${c.navPapers}</a></nav>
      <div class="header-tools"><div class="lang-switch" role="group" aria-label="${c.language}">${languageLink("en","EN")}${languageLink("zh","中文")}</div>
      <button type="button" class="menu-toggle" aria-label="${c.menu}" aria-controls="main-nav" aria-expanded="false"><span aria-hidden="true">☰</span></button></div></div></header>`;
  }
  function footer() {
    return `<footer class="site-footer"><div class="shell footer-inner"><div><strong>Qi Lab</strong><p>${choose("Sun Yat-sen University Cancer Center", "中山大学肿瘤防治中心")}</p></div><a href="mailto:zhaoqi@sysucc.org.cn">${t().footerContact} ${arrow}</a></div></footer>`;
  }
  function diagram(kind, cls, label) {
    return `<canvas class="${cls}" data-art="${kind}" role="img" aria-label="${label}" width="${kind === "tissue" ? 740 : 680}" height="${kind === "tissue" ? 460 : 290}"></canvas>`;
  }
  function tissueFigure() {
    const c = t();
    return `<figure class="hero-figure"><div class="figure-top"><span class="figure-id">${c.figLabel}</span><span>${choose("Schematic", "示意图")}</span></div>
      ${diagram("tissue","tissue-art",c.figCaption)}
      <figcaption class="figure-caption"><div class="figure-key">${[c.figTumor,c.figImmune,c.figStroma].map((label,i)=>`<span><i class="key-dot" style="background:${["#bc685a","#157874","#758988"][i]}"></i>${label}</span>`).join("")}</div></figcaption></figure>`;
  }
  function story(kind, label, title, desc, href, cta) {
    return `<article class="story-card"><div class="story-art">${diagram(kind,"",label)}</div><div class="story-body">
      <p class="eyebrow">${label}</p><h3><a href="${href}">${title}</a></h3><p>${desc}</p><a class="text-link" href="${href}">${cta} ${href.startsWith("#") ? next : arrow}</a></div></article>`;
  }
  function toolSection() {
    const tools = [
      ["GCAP",choose("Infer extrachromosomal DNA from exome data.", "利用外显子组数据推断染色体外 DNA。"),gcap],
      ["CaMutQC",choose("Check the quality of somatic mutation calls.", "对体细胞突变检测结果进行质量控制。"),"https://github.com/likelet/CaMutQC"],
      ["LncPipe",choose("Analyze long noncoding RNA from sequencing data.", "从测序数据中分析长链非编码 RNA。"),"https://github.com/likelet/LncPipe"]
    ];
    return `<section class="section tools-section" id="tools"><div class="shell"><div class="section-heading"><h2>${choose("Open-source tools","开源研究工具")}</h2></div>
      <div class="resource-list">${tools.map(([name,desc,url])=>`<a class="resource-row" href="${url}"><strong>${name}</strong><span>${desc}</span>${arrow}</a>`).join("")}</div>
      <a class="text-link" href="${site}/tool-db/">${choose("Browse the full catalog", "查看完整工具目录（英文）")} ${arrow}</a></div></section>`;
  }
  function home() {
    const c = t();
    return `<main id="main-content" tabindex="-1"><section class="hero" id="home"><div class="shell hero-grid"><div class="hero-copy"><p class="eyebrow">${c.heroKicker}</p><h1 class="hero-title">${c.heroTitle}</h1><p class="hero-lead">${c.heroLead}</p>
      <div class="actions"><a class="btn primary" href="#research">${c.heroPrimary} ${next}</a><a class="text-link" href="#people">${c.heroSecondary}</a></div></div>${tissueFigure()}</div></section>
      <section class="section" id="research"><div class="shell"><div class="section-heading"><p class="eyebrow">${c.storiesKicker}</p><h2>${c.storiesTitle}</h2><p>${c.storiesLead}</p></div><div class="stories-grid">
      ${story("ecotypes","Cancer Cell · 2026",c.storyTitle,c.storyText,"#resistance",c.storyCta)}
      ${story("ecdna","Nature Communications · 2024",c.methodTitle,c.methodText,"https://pubmed.ncbi.nlm.nih.gov/38373991/",choose("Read the GCAP study","阅读 GCAP 论文"))}
      </div></div></section>
      <section class="pi-section section" id="people"><div class="shell pi-grid"><div class="pi-photo"><img src="portrait.jpg" alt="${c.piTitle}" width="360" height="360" loading="lazy"></div>
      <div class="pi-copy"><p class="eyebrow">${c.piKicker}</p><h2>${c.piTitle}</h2><p>${c.piDescription}</p><div class="actions"><a class="text-link" href="${lang==="zh"?"https://sysucc.org.cn/node/9222":site+"/author/zhao-qi/"}">${c.piCta} ${arrow}</a>
      <a class="text-link" href="${site}/people/">${choose("Meet the group","查看团队成员（英文）")} ${arrow}</a></div></div></div></section>
      ${toolSection()}
      <section class="section news-section" id="papers"><div class="shell"><div class="section-heading"><h2>${c.newsTitle}</h2></div>
      ${c.news.map(n=>`<a class="news-row" href="${n.url}"><time datetime="${n.iso}">${n.date}</time><span class="news-title">${n.title}</span><span class="journal">${n.journal}</span>${arrow}</a>`).join("")}
      <a class="text-link" href="${site}/publications/">${choose("All publications","完整论文目录（英文）")} ${arrow}</a></div></section></main>`;
  }
  function topic() {
    const c = t();
    const ecotypes = lang === "zh" ? ["T 细胞活化","三级淋巴结构","血管正常化","细胞外基质重组","免疫抑制性巨噬细胞富集"] :
      ["T cell activation","Tertiary lymphoid structures","Vascular normalization","Matrix organization","Immunosuppressive macrophages"];
    const evidence = `<figure class="evidence-figure"><h3>${c.topicCompare}</h3><div class="ecotype-grid">${ecotypes.map((e,i)=>`<div class="ecotype ${i<3?"associated":"resistant"}"><strong>EC${i+1}</strong><span>${e}</span><small>${i<3?c.topicAssociated:c.topicResistant}</small></div>`).join("")}</div><figcaption class="legend">${c.topicLegend}</figcaption></figure>`;
    return `<main id="main-content" tabindex="-1"><section class="topic-hero" id="resistance"><div class="shell topic-head"><a class="back-link" href="#research">← ${c.topicBack}</a><p class="eyebrow">${c.topicKicker}</p><h1>${c.topicTitle}</h1><p class="topic-lead">${c.topicLead}</p></div></section>
      <div class="section shell topic-grid"><nav class="topic-nav" aria-label="${choose("In this study","专题目录")}">${c.topicLabels.map((label,i)=>`<a href="#${chapterIds[i]}">${label}</a>`).join("")}</nav>
      <article class="topic-content">${c.topicSections.map((s,i)=>`<section class="topic-chapter" id="${chapterIds[i]}"><h2>${s.title}</h2><p>${s.body}</p>${i===1?evidence:""}</section>`).join("")}
      <aside class="citation-box"><p>${c.topicCitation}</p><a class="text-link" href="${paper}">${c.topicPaper} ${arrow}</a></aside></article></div></main>`;
  }
  let shownTopic;
  function render() {
    shownTopic = isTopic();
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = shownTopic ? t().topicTitle + " | Qi Lab" : "Qi Lab · " + t().heroKicker;
    document.body.classList.remove("menu-open");
    app.innerHTML = header() + (shownTopic ? topic() : home()) + footer();
    window.drawQiArt(app);
  }
  function scrollRoute() {
    if (["resistance","home"].includes(route())) window.scrollTo(0,0);
    else document.getElementById(route())?.scrollIntoView();
  }
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    const button = app.querySelector(".menu-toggle");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label",open ? choose("Close menu","收起菜单") : t().menu);
  }
  app.addEventListener("click", event => {
    if (event.target.closest(".menu-toggle")) { setMenu(!document.body.classList.contains("menu-open")); return; }
    const anchor = event.target.closest("a");
    if (!anchor) return;
    if (anchor.classList.contains("skip-link")) { event.preventDefault(); app.querySelector("main").focus();return; }
    if (anchor.dataset.lang && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      const oldSections = [...app.querySelectorAll("main section[id]")];
      const visibleSection = oldSections.filter(s => s.getBoundingClientRect().top <= 120).pop();
      const withinSection = visibleSection ? -visibleSection.getBoundingClientRect().top / visibleSection.offsetHeight : 0;
      lang = anchor.dataset.lang;
      try { localStorage.setItem("qi-preview-language",lang); } catch {}
      history.replaceState(null,"",anchor.href);
      render();
      if (visibleSection) {
        const section = document.getElementById(visibleSection.id);
        window.scrollBy(0, section.getBoundingClientRect().top + withinSection * section.offsetHeight);
      } else scrollRoute();
      app.querySelector(`[data-lang="${lang}"]`).focus({preventScroll:true});
    } else setMenu(false);
  });
  document.addEventListener("keydown", event => {
    if(event.key==="Escape" && document.body.classList.contains("menu-open")) {setMenu(false); app.querySelector(".menu-toggle").focus();}
  });
  window.addEventListener("hashchange", () => {
    const changedPage = shownTopic !== isTopic();
    if (changedPage) render();
    app.querySelectorAll("[data-lang]").forEach(a=>a.href=`?lang=${a.dataset.lang}#${route()}`);
    if (changedPage) app.querySelector("main").focus({preventScroll:true});
    scrollRoute();
  });
  window.addEventListener("popstate", () => {
    const urlLang = new URLSearchParams(location.search).get("lang");
    if (["en","zh"].includes(urlLang) && lang !== urlLang) { lang = urlLang; render(); scrollRoute(); }
  });
  render(); requestAnimationFrame(scrollRoute);
})();
