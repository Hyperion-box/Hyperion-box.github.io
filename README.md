# SWN TTRPG Computer Aid

Intended to act as an in game computer, this site has pages to represent:
* Quests
* Codex entries
* Map
* News articles (NET)
* Party members

## How to use

> Generally speaking, this site uses a a lot of Markdown to write text and sdisplay posts. While the below mentions pages, virtually every one of them uses Markdown files in a corresponding directory.

Each section of the site has different folders:

- `index.html` -> Mission Log, this corresponds to the markdown files in the `_quests` and `_side_quests` directories
- `codex-section.html` -> Codex, this corresponds to the Codex entries (information about the universe). Files to change this content is in the `_codex` directory. Adding new folders and sections can be done by adding a new `<div class="secondary-missions">` in the codex-`section.html` file.
- `map-section.html` -> This is the Map. I don't recommend messing with this too much. It is made with quite a labourious method. Adding new data points to it can be done by editing the `data/systems.json` file.
- `news-section` -> The NET section. Add new posts by adding new markdown files to the `_news/` directory.
- `character-section.html` -> The Crew page. Add new characters by adding new files to the `_characters/` directory.

## Setup for own customisation
This site uses Jekyll, likely not really how it is intended to be used. To get started on customising your own in GitHub pages: 
1. "fork" this repo and name it [your GitHub username].github.io
2. Navigate to your project settings
3. Select "Pages"
4. Ensure "Deploy from branch" and "main" are selected in the dropdowns

## Setup for local development
There are 3 main things you'll need to run this. Jekyll, Ruby, Git for Windows (if you are Windows).

As mentioned, this is a Jekyll site. **Jekyll** uses **Ruby**. There are instructions on installing both of these [here](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).

After installing Jekyll and Ruby these are the steps I perform on command line:
1. Clone the repo: `git clone https://github.com/Hyperion-box/Hyperion-box.github.io.git`
2. Navigate to the directory you just cloned and run: `jekyll build serve --watch`
3. Assuming that worked without errors, the site should be reachable on `localhost:4000`
