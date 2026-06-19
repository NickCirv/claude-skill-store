<div align="center">

# claude-skill-store

**Search, browse, and install Claude Code skills from the terminal**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?labelColor=0B0A09)](LICENSE)
[![Node >= 18](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg?labelColor=0B0A09)](https://nodejs.org)

</div>

## Install

```bash
npx github:NickCirv/claude-skill-store <command>
```

## Usage

```bash
# Search across name, description, tags, category, author
npx github:NickCirv/claude-skill-store search rag

# Browse the most-installed skills
npx github:NickCirv/claude-skill-store popular --limit 5

# List all categories
npx github:NickCirv/claude-skill-store categories

# Filter to a single category
npx github:NickCirv/claude-skill-store categories --category "AI Engineering"

# Full details on a skill
npx github:NickCirv/claude-skill-store info rag-pipeline

# Install a skill (delegates to npx add-skill)
npx github:NickCirv/claude-skill-store install rag-pipeline
```

| Command | Description |
|---------|-------------|
| `search <query>` | Search by keyword, tag, or category |
| `popular` | Most-installed skills; `-n/--limit <n>` to control count |
| `categories` | All categories with counts; `-c/--category <name>` to filter |
| `info <skill>` | Full detail — repo, tags, install count, author |
| `install <skill>` | Install via `npx add-skill` |
| `list` | All skills in the registry |

## What it does

`claude-skill-store` is a local CLI registry for Claude Code skills. It indexes skills by name, description, tags, category, and author so you can find what you need without digging through GitHub. The `install` command hands off to `npx add-skill`, the standard Claude Code skill installer.

---
<sub>Node >=18 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
