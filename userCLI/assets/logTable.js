// including console.table npm package
const cTable = require("console.table");

// constructor class to add a method to log table data using console.table
class LogTable {
  log(x) {
    const table = cTable.getTable(x);
    console.log(table);
  }
}

module.exports = LogTable;
