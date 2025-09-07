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
        
        We are a team of bioinformatic researchers at the [Sun Yat-sen university Cancer Center](https://www.sysucc.org.cn/), specializing in GI cancer research.

  - block: markdown
    content:
      title:
      subtitle:
      text: |
        Our research focuses on developing new algorithms, applications, and database tools to analyze GI cancer omic data. We also use machine-learning approaches to identify biomarkers for tumor diagnosis and prognosis.

        Currently, we are working on several fields, including:

        **Exploration of Biomarkers for Cancer Immunotherapy**

        **Developing Software and Database related to Cancer genomics**

        **Developing novel targeting treatment strategies for GI cancers**

        **Build Machine Learning based models for cancer diagnosis and prognosis**

        **Gut Microbiota and tumor Microenvirment in Cancer Immunotherapy**
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
