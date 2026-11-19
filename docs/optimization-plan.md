# Personal and research group homepage

Approved direction (2026-11-19): retain Hugo and English content; balance Qi Zhao's profile with the group's research, publications, people and contact information.

## Implementation

1. Add a personal introduction and profile/publications calls to action to the existing hero. Use the existing portrait with explicit dimensions, keeping the original video available in the repository.
2. Retain the five research areas with readable typography. Show selected publications as responsive cards from the existing publications.yaml source rather than duplicating records. Limit homepage news to three entries. Remove the empty preprint block and the homepage reference to the decorative 12.9 MB background image.
3. Remove known demo contact links and boilerplate biographies from team profiles. Retain names, roles, education and substantive biographical claims. Correct spelling and the principal investigator's email URL. Flag research interests and ambiguous education dates for owner review.
4. Replace the Netlify-only form with the existing public email contact. Correct footer ownership and add a profile navigation entry. Preserve licensing and current publication URLs.
5. Build the original and modified site, inspect generated navigation, email URLs, images and placeholder absence, then preview desktop and mobile where available. Keep changes local on optimize/personal-and-group until publication is requested.

## Findings requiring owner review

- Profile interests include Computational Linguistics and Information Retrieval, while the biography focuses on cancer bioinformatics.
- Education years appear to be start years; the template does not explain that.
- Team profiles contain repeated education/interest fields that may be inherited from sample data. Verify each member before publishing new biographies.
- No performance score is claimed: no controlled Lighthouse comparison has been run.
