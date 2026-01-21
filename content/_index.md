---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing

sections:
  - block: hero
    content:
      title: |
        Welcome to the
        ZHAO Qi Team
      image:
        filename: welcome.jpg
      text: |
        <br>
        The Zhao Qi Research Group is a multidisciplinary bioinformatics team based at [Sun Yat-sen university Cancer Center](https://www.sysucc.org.cn/), dedicated to advancing research in gastrointestinal (GI) cancers. Our work integrates computational biology, machine learning, and multi-omics analysis to uncover molecular mechanisms of cancer, identify clinically actionable biomarkers, and support precision oncology.

  - block: markdown
    content:
      title:
      subtitle:
      text: |
        Our research spans several interconnected areas:
        **Cancer Immunotherapy Biomarkers**  
        Identifying predictive biomarkers to improve immunotherapy response and patient stratification.
        **Cancer Genomics Software & Databases** 
        Developing robust algorithms, software tools, and public databases for large-scale cancer genomics analysis.
        **Targeted Therapy Strategies for GI Cancers** 
        Exploring novel molecular targets and therapeutic strategies through integrative data analysis.
        **Machine Learning for Cancer Diagnosis & Prognosis**
        Building predictive models to support early diagnosis, treatment decision-making, and outcome prediction.
        **Gut Microbiota & Tumor Microenvironment**  
        Investigating host–microbiome interactions and their roles in cancer immunotherapy.
    design:
      columns: '1' 
      background:
        color: "white"           # 与 hero block 相同
        text_color_light: false  # 与 hero block 相同
  
  - block: collection
    content:
      title: Latest News
      subtitle:
      text:
      count: 5
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: post
    design:
      view: card
      columns: '1'
  
  - block: markdown
    content:
      title:
      subtitle: ''
      text:
    design:
      columns: '1'
      background:
        image: 
          filename: coders.jpg
          filters:
            brightness: 1
          parallax: false
          position: center
          size: cover
          text_color_light: true
      spacing:
        padding: ['20px', '0', '20px', '0']
      css_class: fullscreen

  - block: collection
    content:
      title: Latest Preprints
      text: ""
      count: 5
      filters:
        folders:
          - publication
        publication_type: 'article'
    design:
      view: citation
      columns: '1'

  - block: markdown
    content:
      title:
      subtitle:
      text: |
        {{% cta cta_link="./people/" cta_text="Meet the team →" %}}
    design:
      columns: '1'
---
