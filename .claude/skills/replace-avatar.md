---
name: replace-avatar
description: Replace an author's avatar image. Trigger when user wants to update a team member's profile photo with a URL.
---

# Replace Avatar Skill

Replace a team member's avatar image in `content/authors/<author>/`.

## Steps

1. **Identify the author** — find the author directory under `content/authors/`. Common values: `admin` (Zhao Qi), or the author's name slug.

2. **Remove old avatar** — delete the existing avatar file (`avatar.png`, `avatar.jpg`, or `avatar.webp`) in the author's directory.

3. **Download new image** — use curl, wget, or PowerShell to download the image URL to the author's directory as `avatar.jpg`:
   ```
   curl -L -o content/authors/<author>/avatar.jpg "<image_url>"
   ```
   If curl fails due to network restrictions, the user should open the URL in a browser and manually save the file to `content/authors/<author>/avatar.jpg`.

4. **Verify** — confirm the file exists and has reasonable size (> 1KB). Run `hugo server` to preview the change on the People page (`http://localhost:1313/people/`).

## Author directories

| Slug | Name |
|------|------|
| `admin` | Prof. Qi Zhao (PI) |
