// TODO: import from JSON
const importedConfig = {
  fileTypeX : {
    columnOrder: true,
    columnRules: [
      {
        columnId: 'column_one',
        ruleType: 'columnDef',
        cellType: 'string/maxVarChar',
        maxLength: 9,
        minLength: 3,
        format: [
          'isoDate',
        ]
      },
      {},
    ],
    format: {
      isoDate: '/date/regex/',
    }
  }
};

// Rules !== columns
// Category & CategoryGroup
// margin-inline domino

const config = importedConfig['fileTypeX'];

