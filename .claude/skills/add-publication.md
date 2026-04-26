---
name: add-publication
description: Add a new publication to the research group website. Trigger when user provides a DOI or PMID to add.
---

# Add Publication Skill

Add a new publication entry to `content/publications/publications.yaml`.

## Steps

1. **Look up the publication** — Use WebSearch to find details by DOI or PMID. Search for "DOI <doi>" or "PMID <pmid> [journal] [year]". Retrieve: title, full author list (with co-first † markings), journal name, year, abstract/description.

2. **Determine metadata**:
   - `number`: increment from the current highest number in publications.yaml (most recent = highest number)
   - `year`: publication year
   - `highlight`: set to `1` for major publications (Cancer Cell, Nature, Science, Cell, NEJM, JAMA, Lancet, etc.) or if Zhao Q is first/co-first/corresponding on a high-impact paper; otherwise `0`
   - `image`: if a featured image exists in `content/publications/images/`, add the filename; otherwise leave empty

3. **Format authors** following these conventions:
   - Co-first authors: use `<sup>†</sup>` after the name
   - Qi Zhao: wrap in `<strong>` tags, e.g. `<strong>Qi Zhao*</strong>` (corresponding), `<strong>Qi Zhao<sup>†</sup>*</strong>` (co-first + corresponding), or `<strong>Qi Zhao<sup>†</sup></strong>` (co-first only)
   - Corresponding authors: append `*` after the name
   - Separate all authors with commas

4. **Insert the entry** at the correct position in publications.yaml — entries are ordered by `number` descending. Add the new entry before the first entry with a lower number.

## Entry Template

```yaml
- title: "Full paper title."
  number: NN
  image:
  authors: Author Names, <strong>Qi Zhao*</strong>, More Authors
  description: >
    Concise summary of key findings (2-4 sentences).
  link:
    url: https://pubmed.ncbi.nlm.nih.gov/PMID/
    display: Journal name, year.
  highlight: 0
  year: YYYY
```

## After adding

Run `hugo --gc --minify` to verify the build passes.
