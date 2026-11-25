(() => {
  "use strict";
  const query = new URLSearchParams(location.search);
  const en = query.get("lang") === "en";
  const lang = en ? "en" : "zh";
  const tr = (zh, english) => en ? english : zh;
  const modes = [
    {id:"editorial",letter:"A",css:"editorial.css",name:tr("学术编辑","Editorial"),desc:tr("从一个临床问题开始。大号衬线标题引入发现，往下读是一组有摘要的研究报道。","A clinical question opens the page. Serif headlines and short research reports invite a closer read.")},
    {id:"swiss",letter:"B",css:"index-style.css",name:tr("研究索引","Research index"),desc:tr("研究放在最前面。粗黑标题、对齐的年份和细线分栏，让同行快速找到论文和工具。","Bold type, aligned dates and ruled columns help colleagues scan studies and find the tools behind them.")},
    {id:"profile",letter:"C",css:"profile.css",name:tr("个人学术主页","Personal profile"),desc:tr("先认识赵齐，再了解课题组。黑白肖像、第一人称简介和一列研究笔记适合初次来访的读者。","A monochrome portrait and a first-person introduction lead into a reading list for first-time visitors.")}
  ];
  const mode = modes.find(m => m.id === query.get("view"));
  const url = (view, language=lang) => "?lang="+language+(view?"&amp;view="+view:"");
  const altLang = en ? "zh" : "en";
  const languageLink = (view) => `<a class="lang" href="${url(view,altLang)}" hreflang="${altLang}" lang="${altLang}" aria-label="${tr("Switch to English","切换至中文")}">${tr("English","中文")}</a>`;
  const site = "https://seqworld.com";
  const data = [
    ["Cancer Cell","2026","41720086",tr("同一种术前治疗，为什么胃癌患者的应答不同？","Why do gastric tumors respond differently to treatment?"),tr("在 110 名胃癌患者的样本中，研究团队识别出五种肿瘤微环境生态型，观察到它们与术前免疫联合化疗的应答相关。","Samples from 110 patients revealed five tumor microenvironment ecotypes associated with different responses to preoperative immunochemotherapy.")],
    ["Nature Communications","2026","42686743",tr("胃癌免疫治疗中，B 细胞与 T 细胞如何协作？","How do B cells and T cells interact in gastric cancer?"),tr("患者样本揭示了 HER2 阳性胃癌治疗过程中免疫细胞的变化。维生素 B5 增强抗 PD-1 治疗反应的结果来自小鼠模型。","Patient samples revealed changes in immune cells during treatment for HER2-positive gastric cancer. Vitamin B5 enhanced the response to anti-PD-1 therapy in mouse models.")],
    ["Nature Communications","2024","38373991",tr("从已有测序数据中寻找染色体外 DNA","Finding extrachromosomal DNA in existing sequencing data"),tr("GCAP 利用全外显子组测序数据推断肿瘤的染色体外 DNA 扩增，让研究者可以重新分析已有的患者队列。","GCAP uses exome data to infer extrachromosomal DNA amplification in tumors, enabling researchers to revisit existing patient cohorts.")]
  ];
  const host = document.getElementById("page");
  document.documentElement.lang = en ? "en" : "zh-CN";
  if (!mode) {
    document.title = tr("Qi Lab · 首页设计对比","Qi Lab · Homepage designs");
    host.innerHTML = `<div class="comparison"><header class="gallery-head"><span class="gallery-brand">Qi Lab</span><div class="gallery-language">${languageLink()}</div></header>
      <main><div class="gallery-intro"><h1>${tr("三种黑白首页","Three monochrome homepages")}</h1><p>${tr("选一个版式进入预览。页面顶部可以随时切换方案或语言。","Open a design to explore it. Use the preview bar to switch layouts or languages.")}</p></div>
      <div class="gallery-grid">${modes.map(m=>`<a class="gallery-item" href="${url(m.id)}"><img src="thumb-${m.id}-${lang}.png" width="1080" height="800" alt=""><h2>${m.letter}　${m.name}</h2><p>${m.desc}</p><span class="open">${tr("打开预览","Open preview")} ↗</span></a>`).join("")}</div></main>
      <footer class="gallery-footer"><a href="${site}/">${tr("访问当前官网","Visit the current website")} ↗</a></footer></div>`;
    return;
  }
  document.body.className = mode.id;
  const css=document.createElement("link"); css.rel="stylesheet"; css.href=mode.css; document.head.append(css);
  document.title = `Qi Lab · ${mode.name}`;
  const name = tr("赵齐","Qi Zhao");
  const institution = tr("中山大学肿瘤防治中心","Sun Yat-sen University Cancer Center");
  const title = {
    editorial:tr("为什么相似的肿瘤，对治疗的反应却不同？","Why do similar tumors respond differently to treatment?"),
    swiss:tr("消化道肿瘤的计算研究","Computational research in gastrointestinal cancer"),
    profile:name
  }[mode.id];
  const deck = {
    editorial:tr("在中山大学肿瘤防治中心，赵齐课题组研究肿瘤细胞、免疫细胞与治疗应答之间的关系，并开发分析癌症多组学数据的工具。","At Sun Yat-sen University Cancer Center, Qi Zhao and colleagues study how tumor and immune cells shape treatment response. The lab develops tools to analyze cancer multi-omics data."),
    swiss:tr("赵齐课题组结合基因组、单细胞和临床数据，研究肿瘤异质性、免疫微环境与治疗反应。","Qi Zhao’s group combines genomic, single-cell and clinical data to study tumor heterogeneity, the immune microenvironment and treatment response."),
    profile:tr("我是中山大学肿瘤防治中心教授。我研究消化道肿瘤的异质性，以及肿瘤周围的细胞如何影响治疗效果。我也开发计算工具，帮助同行从测序数据中研究这些问题。","I’m a professor at Sun Yat-sen University Cancer Center. I study how gastrointestinal tumors differ and how surrounding cells shape their response to treatment. I also build computational tools to help researchers explore these questions in sequencing data.")
  }[mode.id];
  host.innerHTML=`<a class="skip" href="#content">${tr("跳至正文","Skip to content")}</a>
    <nav class="switcher" aria-label="${tr("预览设置","Preview controls")}"><div class="switcher-inner"><a href="${url()}">← ${tr("方案对比","All designs")}</a><div class="modes">${modes.map(m=>`<a href="${url(m.id)}" aria-label="${m.letter} ${m.name}" ${m===mode?'aria-current="page"':""}>${m.letter}<span class="long-label"> · ${m.name}</span></a>`).join("")}</div>${languageLink(mode.id)}</div></nav>
    <header class="mast wrap"><a class="wordmark" href="#intro">Qi Lab</a><nav class="site-nav" aria-label="${tr("网站导航","Site navigation")}"><a href="#work">${tr("研究","Research")}</a><a href="#about">${tr("关于","About")}</a><a href="mailto:zhaoqi@sysucc.org.cn">${tr("联系","Contact")}</a></nav></header>
    <main class="wrap" id="content"><section class="hero" id="intro"><div class="hero-copy"><p class="eyebrow">${mode.id==="profile"?tr("肿瘤生物信息学教授","Professor of cancer bioinformatics"):institution}</p><h1>${title}</h1><p class="deck">${deck}</p><div class="links"><a href="#work">${tr("阅读研究","Read the research")} ↓</a><a href="https://github.com/likelet">${tr("开源工具","Open-source tools")} ↗</a></div></div>
    <figure class="portrait"><img src="../design-preview/portrait.jpg" alt="${name}" width="360" height="360"><figcaption>${name} · ${institution}</figcaption></figure></section>
    <section class="work" id="work"><header class="section-head"><h2>${mode.id==="swiss"?tr("研究索引","Research index"):mode.id==="profile"?tr("近期工作","From my research"):tr("研究选读","Selected research")}</h2></header><div class="work-list">${data.map(([journal,date,id,heading,p])=>`<article class="paper"><div class="paper-meta"><span>${journal}</span><time datetime="${date}">${date}</time></div><div class="paper-body"><h3><a href="https://pubmed.ncbi.nlm.nih.gov/${id}/">${heading}</a></h3><p>${p}</p></div><a class="paper-arrow" href="https://pubmed.ncbi.nlm.nih.gov/${id}/" aria-label="${tr("阅读论文","Read paper")} · ${heading}">↗</a></article>`).join("")}</div></section>
    <section class="about" id="about"><h2>${tr("关于课题组","About the lab")}</h2><p>${tr("我们与临床和实验团队合作，把消化道肿瘤患者的治疗问题带进数据分析，再回到肿瘤组织和细胞中寻找解释。","We work with clinical and experimental colleagues to connect questions from gastrointestinal cancer care with evidence from patient cohorts, tumor tissue and individual cells.")}</p><a href="${site}/people/">${tr("团队成员（英文）","Meet the team")} ↗</a></section></main>
    <footer class="wrap"><span>Qi Lab</span>　<span>${institution}</span></footer>`;
})();
