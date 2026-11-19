# 研究动态更新记录

用户范围：仅更新网站，不设置定时提醒。姓名使用 Qi Zhao，单位统一为 Sun Yat-sen University Cancer Center。

## 已加入的研究

| 首次在线发表日期 | 研究 | 原始来源 |
| --- | --- | --- |
| 2026-09-18 | AdvanTIG-203 食管鳞癌二期试验及探索性生物标志物分析 | [PubMed 42901884](https://pubmed.ncbi.nlm.nih.gov/42901884/)；[出版社作者及 ORCID](https://www.nature.com/articles/s41467-026-77705-8) |
| 2026-08-05 | HER2 阳性胃癌中的维生素 B5 与 B–T 细胞相互作用 | [原文及作者单位](https://pmc.ncbi.nlm.nih.gov/articles/PMC13538391/) |
| 2026-06-03 | 结直肠癌细胞衰老—昼夜节律评分与免疫异质性 | [PubMed 42317343](https://pubmed.ncbi.nlm.nih.gov/42317343/) |

以上为本次检索确认的三篇近期研究，不声称穷尽所有数据库。日期使用论文首次在线发表日期，而非网站补录日期。每篇动态包含简述、单位、原文 DOI 和 PubMed 链接；论文目录同步新增编号 52–54，未改动原有编号和精选标记。

AdvanTIG-203 明确保留“未达到主要终点”的结论；维生素 B5 的治疗增效限定为动物模型结果；SCore 的广泛免疫与节律机制仍属待验证假说。

## 姓名消歧及来源记录

- 2026-11-19 通过 PubMed ESearch 和 ESummary 检索：`Zhao Qi[Full Author Name] AND Sun Yat-sen[Affiliation] AND (2026/01/01:2026/11/19[Date - Publication])`，按发表日期返回前十条候选，随后检查作者对应单位。
- AdvanTIG-203 的出版社记录列出 Qi Zhao 的 ORCID 0000-0002-8683-6145 和 SYSUCC 单位；其他两篇原文/记录均列出 Qi Zhao 与 SYSUCC 的对应关系。
- 不采用仅凭姓名匹配的结果。例：PMID 42701184 中 Qi Zhao 的单位为南昌大学，故排除。
- PMID 42642672 是旧论文更正，不作为新增原创研究推送。
- 未将 Genes & Diseases 的 2026 年 9 月卷期误记成首次在线发表时间；该文章实际于 2026-01-30 上线，本轮首页选入较新的三篇。
- 原始 API JSON/XML 未另存。

## 页面优化及验证

- 研究动态移到首页个人介绍之后，按发表日期倒序展示三篇；历史新闻仍在 /post/。
- 首页增加现有 /post/index.xml RSS 入口；这是静态站点生成的订阅源，本轮没有设置自动抓取论文或后台定时任务。
- 个人页显示 Qi Zhao，显式保留 slug `zhao-qi`，避免旧链接失效。
- 研究兴趣依据[医院官方个人介绍](https://english.sysucc.org.cn/info_26.aspx?itemid=820)改为癌症多组学工具、免疫治疗标志物与消化道肿瘤基因组临床关联。
- Hugo Extended 0.160.1 的压缩构建通过，输出 80 页；原有主题兼容性警告仍存在。
- 检查通过：三篇动态生成、首页排序及位置、论文目录、RSS XML 及顺序、个人页路由、单位名称、首页站内链接。
- 未完成浏览器视觉验收，也未推送或部署上线。
