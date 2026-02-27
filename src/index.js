import { program } from 'commander'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import {
  search,
  getPopular,
  getByName,
  getCategories,
  getByCategory,
  getAll,
} from './registry.js'

import {
  printBanner,
  printSkillList,
  printSkillDetail,
  printCategories,
  printError,
  printInfo,
} from './formatter.js'

import { install } from './installer.js'
import chalk from 'chalk'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'))

program
  .name('claude-skill-store')
  .description('Browse, search, and install Claude Code skills')
  .version(pkg.version)

program
  .command('search <query>')
  .description('Search skills by keyword, tag, or category')
  .action((query) => {
    printBanner()
    const results = search(query)
    if (!results.length) {
      printError(`No skills found for "${query}"`)
      printInfo('Try: npx claude-skill-store categories')
      process.exit(0)
    }
    console.log(chalk.dim(`  Found ${results.length} skill${results.length !== 1 ? 's' : ''} matching "${query}"\n`))
    printSkillList(results)
    console.log()
  })

program
  .command('popular')
  .description('Show the most popular skills by install count')
  .option('-n, --limit <number>', 'Number of results to show', '10')
  .action((opts) => {
    const limit = parseInt(opts.limit, 10) || 10
    printBanner()
    console.log(chalk.dim(`  Top ${limit} most installed skills\n`))
    printSkillList(getPopular(limit))
    console.log()
  })

program
  .command('info <skill>')
  .description('Show full details for a skill')
  .action((name) => {
    const skill = getByName(name)
    if (!skill) {
      printBanner()
      printError(`Skill "${name}" not found.`)
      printInfo(`Try: npx claude-skill-store search ${name}`)
      console.log()
      process.exit(1)
    }
    printBanner()
    printSkillDetail(skill)
  })

program
  .command('install <skill>')
  .description('Install a skill (delegates to npx add-skill)')
  .action((name) => {
    printBanner()
    install(name)
  })

program
  .command('categories')
  .description('Browse skills by category')
  .option('-c, --category <name>', 'Filter to a specific category')
  .action((opts) => {
    printBanner()
    if (opts.category) {
      const skills = getByCategory(opts.category)
      if (!skills.length) {
        printError(`No skills found in category "${opts.category}"`)
        printInfo('Run: npx claude-skill-store categories')
        process.exit(0)
      }
      console.log(chalk.dim(`  ${skills.length} skills in "${opts.category}"\n`))
      printSkillList(skills)
      console.log()
    } else {
      printCategories(getCategories())
    }
  })

program
  .command('list')
  .description('List all skills in the registry')
  .action(() => {
    printBanner()
    const all = getAll()
    console.log(chalk.dim(`  ${all.length} skills in registry\n`))
    printSkillList(all)
    console.log()
  })

program.parse()
