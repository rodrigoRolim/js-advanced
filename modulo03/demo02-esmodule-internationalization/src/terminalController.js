import readLine from "readline"
import Person from "./person.js"
import DraftLog from "draftlog"
import chalk from "chalk"
import chalkTable from "chalk-table"

export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = []
  }
  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.initializeTable(database, language)
  }
  updateTable(item) {
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions(), this.data))
  }
  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language))
    const table = chalkTable(this.getTableOptions(), data)
    this.print = console.draft(table)
  }
  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }
  closeTerminal() {
    this.terminal.close()
  }
  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") },
      ]
    }
  }
}