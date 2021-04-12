const cTable = require("console.table");

class LogTable {
  log(x) {
    const table = cTable.getTable(x);
    console.log(table);
  }
}

module.exports = LogTable;
