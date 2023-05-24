export const rules = [
  {
    id: 'isMatrix',
    message: `Matrix does not have at least 2 rows`,
    break: true,
    test: function (matrix) {
      // Is an array, and has 2 rows, each with at least 1 column.
      let result = true;

      result = result && Array.isArray(matrix);
      result = result && matrix.length >= 2;
      result = result && matrix[0].length > 0 && matrix[1].length > 0;

      return result;
    },
  },
  {
    id: 'matrixHasConsistentRowLength',
    message: `Matrix has rows of different lengths`,
    break: true,
    test: function (matrix) {
      const numberOfRows = matrix.length;
      const headerRowLength = matrix[0].length;
      let result = true;

      for (
        let rowIndex = 1;
        ((rowIndex < numberOfRows) && result); 
        rowIndex++
      ) {
        result = result && (matrix[rowIndex].length === headerRowLength);

        if (result === false) {
          break;
        }
      }

      return result;
    }
  },
  {
    id: 'hasColumnA',
    test: function (matrix) {
      // ideally call something with cell and format
      let result = true;
      const headerCell = 'Col A';
      const cellFormat = /\d/; // is a number
      const headerRow = matrix[0];

      console.log('TEST', this);

      // Test that Header Cell is present.
      const columnIndex = headerRow.indexOf(headerCell);
      result = result && columnIndex >= 0;

      // Test that Header Cell value is unique.
      result = result && columnIndex === headerRow.lastIndexOf(headerCell)

      // Test each row cell matches format.
      if (result) {
        for (
          let rowIndex = 1; 
          ((rowIndex < matrix.length) && result); 
          rowIndex++
        ) {
          const row = matrix[rowIndex];
          const cell = row[columnIndex];
          
          result = result && columnIndex <= row.length;
          result = result && cellFormat.test(cell);

          if (result === false) {
            break;
          }
        }
      }

      return result;
    },
    message: `Col A not present`,
    break: false,
  },
  {
    id: 'hasColumnB',
    message: `Col B not present`,
    break: false,
    test: function (matrix) {
      const headerCell = 'B'; 
      const cellFormat = /\d/; // is a number
      const result = testColumn({
        headerCell, cellFormat, matrix
      });

      // TODO: deliver messages via here.
      return result;
    },
  },
];

function testColumn ({ headerCell, cellFormat, matrix }) {
  const headerRow = matrix[0];
  const columnIndex = headerRow.indexOf(headerCell);
  // const errors = [];
  const rules = [
    { 
      // Test that Header Cell is present.
      test: () => columnIndex >= 0, 
      message: 'Matrix does not contain column: ' + headerCell, 
      break: true,
    },
    {
      // Test that Header Cell value is unique.
      test: () => columnIndex === headerRow.lastIndexOf(headerCell),
      message: 'There is more than one: ' + headerCell + ' column.', 
      break: true,
    }
  ];

  let { success, errors } = validate(rules, matrix);

  console.log('testColumn', headerCell, cellFormat, );
  console.log(success, errors);

  // Test each data cell in the column.
  let result = success;
  for (
    let rowIndex = 1; 
    ((rowIndex < matrix.length) && result); 
    rowIndex++
  ) {
    const row = matrix[rowIndex];
    const cell = row[columnIndex];
    
    result = result && columnIndex <= row.length;
    // Cell Format may be a (non global) regex or a function that returns a boolean.
    result = result && (cellFormat instanceof RegExp) ? cellFormat.test(cell) : cellFormat(cell)

    if (result === false) {
      break;
    }
  }

  return result;
}

// function testRow () {
// }

// TODO: how to mutate or generate & splice resultMatrix?

// Maybe something recursive if rules in rule?
// maybe use `this` to get headerCell instead of as parameter?

export function validate (rules, matrix, resultMatrix=[...matrix]) {
  const errors = [];
  // const resultMatrix = [];

  console.log('resultMatrix', resultMatrix);
  
  for (const rule of rules) {
    const result = rule.test(matrix);

    console.log('result', result)
    
    if (result === false) {
      errors.push(rule.message);
      
      if (rule.break) {
        break;
      }
    }
  }

  const success = Boolean(errors.length === 0);

  return {
    success,
    matrix: success ? matrix : resultMatrix,
    errors,
  }
}

