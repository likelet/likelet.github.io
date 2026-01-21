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
        
        The Zhao Qi Research Group is a multidisciplinary bioinformatics team based at Sun Yat-sen university Cancer Center, dedicated to advancing research in gastrointestinal (GI) cancers.<br>
        Our work integrates computational biology, machine learning, and multi-omics analysis to uncover molecular mechanisms of cancer, identify clinically actionable biomarkers, and support precision oncology.

  - block: markdown
    content:
      title:
      subtitle:
      text: |

        Our research spans several interconnected areas:
    
        ### Cancer Immunotherapy Biomarkers  
        Mining multi-omics data to spot biomarkers that flag immunotherapy responders, then packaging those signals into clinical assays for patient selection and combo dosing.
        
        ### Cancer Genomics Software & Databases  
        Shipping open-source algorithms, containerized workflows and curated databases that let the community reproduce and extend large-scale cancer genomics studies.
        
        ### Targeted Therapy Strategies for GI Cancers  
        Scanning exome, transcriptome and drug-screen datasets to surface druggable lesions in GI tumors, mapping trials to the right inhibitors and tracing resistance with real-time liquid biopsies.
        
        ### Machine Learning for Cancer Diagnosis & Prognosis  
        Training lightweight models on pathology images, radiology scans and routine labs to flag early-stage tumors, forecast survival and explain calls in clinician-friendly heat-maps.
        
        ### Gut Microbiota & Tumor Microenvironment  
        Tracking gut-bug shifts during ICI treatment, testing causality in germ-free models and crafting next-gen probiotics that sharpen anti-tumor immunity.
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
