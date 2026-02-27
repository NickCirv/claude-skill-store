import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, '..', 'data', 'registry.json')

function loadRegistry() {
  try {
    const raw = readFileSync(DATA_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    throw new Error(`Failed to load registry: ${err.message}`)
  }
}

export function getAll() {
  return loadRegistry()
}

export function getCategories() {
  const skills = loadRegistry()
  const counts = {}
  for (const skill of skills) {
    counts[skill.category] = (counts[skill.category] || 0) + 1
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function search(query) {
  const skills = loadRegistry()
  const q = query.toLowerCase()
  return skills.filter(skill => {
    return (
      skill.name.toLowerCase().includes(q) ||
      skill.description.toLowerCase().includes(q) ||
      skill.tags.some(t => t.toLowerCase().includes(q)) ||
      skill.category.toLowerCase().includes(q) ||
      skill.author.toLowerCase().includes(q)
    )
  })
}

export function getPopular(limit = 10) {
  const skills = loadRegistry()
  return [...skills]
    .sort((a, b) => b.installs - a.installs)
    .slice(0, limit)
}

export function getByCategory(category) {
  const skills = loadRegistry()
  const q = category.toLowerCase()
  return skills.filter(s => s.category.toLowerCase().includes(q))
}

export function getByName(name) {
  const skills = loadRegistry()
  return skills.find(s => s.name.toLowerCase() === name.toLowerCase()) || null
}
