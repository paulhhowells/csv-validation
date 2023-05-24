const csv = [
  ['A', 'B', 'C'],
  ['1', '2', '3'],
];

const csvRules = [
  {},
];
export const category = {
  A: [
    ...csvRules,
    {},
  ],
  B: [
    ...csvRules,
    {},
  ],
};

// const break = true;
const rules = [
  {
    id: 'testA',
    test: function ({matrix, report}) {
      const errors = [];
      const message = this.message;
      let success = true;

      if (matrix[0].length < 1) {
        success = false;
      }

      if (success === false) {
        errors.push(message);

        // TODO: mutate report
        report[0] = { error: true, row: report[0] };
      }

      return {
        success,
        errors,
      };
    },
    message: ``,
    break: true,
  },
  {
    id: 'testB',
    test: function ({matrix, report}) {
      const errors = [];
      const { message } = this;
      const rules = [
        {
          test: function () {},
          message: ``,
        },
        {
          test: function ({matrix, report}) {
            // TODO: loop through rows

            // report[0] = { error: true, row: report[0] };
            const errors = [];
            // const message = this.message;

            const headerCell = 'B'; 
            const headerRow = matrix[0];
            const columnIndex = headerRow.indexOf(headerCell);
            const cellFormat = /\d/; // is a number
            // const result = testColumn({
            //   headerCell, cellFormat, matrix
            // });

            // Test each data cell in the column.
            let success = true;

            for (
              let rowIndex = 1; 
              ((rowIndex < matrix.length) && success); 
              rowIndex++
            ) {
              const row = matrix[rowIndex];
              const cell = row[columnIndex];
              
              success = success && columnIndex <= row.length;
              
              // Cell Format may be a (non global) regex or a function that returns a boolean.
              success = success && (cellFormat instanceof RegExp) 
                ? cellFormat.test(cell) 
                : cellFormat(cell)

              if (success === false) {
                // Mutate report
                report[rowIndex].splice(columnIndex, 1, { error: true, cell });
              }

              if (success === false) {
                break;
              }
            }

            return {
              success,
              errors,
            };
          },
          message: ``,
        },
      ];

      const { errors: testErrors, success } = validate({ rules, matrix, report });

      if (success === false) {
        errors.push(message);
        errors.push(...testErrors);
      }

      return {
        success,
        errors,
      };
    },
    message: ``,
  }
];

function validate ({ rules, matrix, report=[...matrix] }) {
  const errors = [];
  const frozenMatrix = (Object.isFrozen(matrix)) ? matrix : Object.freeze(matrix);

  for (
    let ruleIndex = 0, rulesLength = rules.length;
    ruleIndex < rulesLength; 
    ruleIndex++
  ) {
    const rule = rules[ruleIndex];
    const { errors: ruleErrors } = rule.test({ matrix: frozenMatrix, report });

    if (errors.length !== 0) {
      errors.push(...ruleErrors);
      
      if (rule.break === true) {
        break;
      }
    }
  }

  const success = errors.length !== 0;

  return {
    errors,
    success,
    report,
  }
}

const { report, errors, success } = validate({ rules, csv });

console.log(report, errors, success );
