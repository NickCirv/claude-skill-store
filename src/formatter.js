import chalk from 'chalk'

const CATEGORY_COLORS = {
  'AI Engineering': chalk.magenta,
  'Web Dev':        chalk.cyan,
  'DevOps':         chalk.yellow,
  'Testing':        chalk.green,
  'Content':        chalk.blue,
  'Security':       chalk.red,
  'Data':           chalk.white,
  'WordPress':      chalk.hex('#21759B'),
}

function categoryColor(category) {
  return (CATEGORY_COLORS[category] || chalk.white)(category)
}

function starBar(stars) {
  const maxStars = 5
  const filled = Math.round((stars / 500) * maxStars)
  return chalk.yellow('★'.repeat(filled)) + chalk.dim('★'.repeat(maxStars - filled))
}

function formatInstalls(n) {
  if (n >= 1000) return chalk.dim(`${(n / 1000).toFixed(1)}k installs`)
  return chalk.dim(`${n} installs`)
}

export function printSkillList(skills, { showHeader = true } = {}) {
  if (!skills.length) {
    console.log(chalk.yellow('  No skills found.'))
    return
  }

  if (showHeader) {
    const header =
      chalk.bold.white('  NAME'.padEnd(36)) +
      chalk.bold.white('CATEGORY'.padEnd(18)) +
      chalk.bold.white('POPULARITY')
    console.log(header)
    console.log(chalk.dim('  ' + '─'.repeat(70)))
  }

  for (const skill of skills) {
    const name = chalk.bold.green(`  ${skill.name}`.padEnd(36))
    const cat  = categoryColor(skill.category).padEnd(26)
    const pop  = `${starBar(skill.stars)}  ${formatInstalls(skill.installs)}`
    console.log(`${name}${cat}${pop}`)
  }
}

export function printSkillDetail(skill) {
  console.log()
  console.log(chalk.bold.white('  ' + skill.name))
  console.log(chalk.dim('  ' + '─'.repeat(60)))
  console.log()
  console.log(`  ${chalk.dim('Description:')} ${skill.description}`)
  console.log()
  console.log(`  ${chalk.dim('Category:')}    ${categoryColor(skill.category)}`)
  console.log(`  ${chalk.dim('Author:')}      ${chalk.cyan(skill.author)}`)
  console.log(`  ${chalk.dim('Stars:')}       ${starBar(skill.stars)} ${chalk.dim(`(${skill.stars})`)}`)
  console.log(`  ${chalk.dim('Installs:')}    ${chalk.white(skill.installs.toLocaleString())}`)
  console.log()
  console.log(`  ${chalk.dim('Tags:')}        ${skill.tags.map(t => chalk.bgBlack.dim(` ${t} `)).join(' ')}`)
  console.log()
  console.log(`  ${chalk.dim('Repo:')}        ${chalk.underline.blue(skill.repo)}`)
  console.log()
  console.log(`  ${chalk.dim('Install:')}     ${chalk.bold.cyan(`npx claude-skill-store install ${skill.name}`)}`)
  console.log()
}

export function printCategories(categories) {
  console.log()
  console.log(chalk.bold.white('  CATEGORY'.padEnd(28)) + chalk.bold.white('SKILLS'))
  console.log(chalk.dim('  ' + '─'.repeat(40)))
  for (const { name, count } of categories) {
    const label = categoryColor(name)
    console.log(`  ${label.padEnd(38)} ${chalk.white(count)} skills`)
  }
  console.log()
}

export function printBanner() {
  console.log()
  console.log(chalk.bold.cyan('  claude-skill-store') + chalk.dim('  — browse, search & install Claude Code skills'))
  console.log(chalk.dim('  ' + '─'.repeat(60)))
  console.log()
}

export function printSuccess(msg) {
  console.log(chalk.green(`  ✓ ${msg}`))
}

export function printError(msg) {
  console.error(chalk.red(`  ✗ ${msg}`))
}

export function printInfo(msg) {
  console.log(chalk.dim(`  ${msg}`))
}
