import { spawnSync } from 'child_process'
import { getByName } from './registry.js'
import { printSuccess, printError, printInfo } from './formatter.js'

export function install(skillName) {
  const skill = getByName(skillName)

  if (!skill) {
    printError(`Skill "${skillName}" not found in registry.`)
    printInfo(`Try: npx claude-skill-store search ${skillName}`)
    process.exit(1)
  }

  console.log()
  printInfo(`Installing ${skill.name} from ${skill.repo}`)
  printInfo(`Delegating to npx add-skill...`)
  console.log()

  const result = spawnSync('npx', ['add-skill', skill.repo], {
    stdio: 'inherit',
    shell: true,
  })

  if (result.status !== 0) {
    printError(`Installation failed (exit code ${result.status})`)
    printInfo(`Try manually: npx add-skill ${skill.repo}`)
    process.exit(result.status ?? 1)
  }

  console.log()
  printSuccess(`${skill.name} installed successfully`)
  printInfo(`Restart Claude Code to activate the skill.`)
  console.log()
}
