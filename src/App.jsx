// import { useState } from 'react'
import './App.css'
import { rules, validate } from './validate';

const testMatrix = [
  ['Col A', 'B', 'C'],
  ['1', '2', '3'],
  ['9', 'y', 'z'],
];
const validatedMatrix = [...testMatrix];

function App() {
  const v = validate(rules, testMatrix, validatedMatrix);

  console.log('VALIDATE', v);

  return (
    <div>
      <h1>CSV Validation</h1>
      {
        (v.success !== true)
          ? v.errors.map((error, index) => (<p key={index}>{ error }</p>))
          : null
      }
      <table>
        <tbody>
          {

            // v.matrix.map(
            //   (row1, rowIndex) => (
            //     Array.isArray(row1) 
            //       ? [ row1, '' ] 
            //       : [ row1.row, 'table-row--error' ]
            //   ) => ([ row, className ]) => (
            //       <tr key={rowIndex} className={className}>
            //         {
            //           row.map((column, columnIndex) => (typeof column === 'string')
            //             ? (<td key={columnIndex}>{ column }</td>)
            //             : ((typeof column === 'object') && ('cell' in column)) 
            //               ? (
            //                 <td key={columnIndex} className="table-cell--error">
            //                   { column.cell }
            //                 </td>
            //               )
            //               : (<td key={columnIndex}> - </td>)
            //           )
            //         }
            //       </tr>
            //     )
            //   )


            // v.matrix.map((row, rowIndex) => {
            //   // When row has an error it will be an object rather than an array.
            //   const rowSpec = Array.isArray(row)
            //     ? [ row, '' ]
            //     : [ row.row, 'table-row--error' ];
              
            //   return matrixRow(rowSpec, rowIndex);        
            // })

            v.matrix.map((row, rowIndex) => matrixRow(
              Array.isArray(row) 
                ? [ row, '' ] 
                : [ row.row, 'table-row--error' ], 
              rowIndex
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


// { 
//   v.matrix.map((row, rowIndex) => matrixRow(
//     Array.isArray(row) 
//       ? [ row, '' ] 
//       : [ row.row, 'table-row--error' ], 
//     rowIndex
//   ))
// }

function matrixRow ([ row, className ], rowIndex) {
  return (
    <tr key={rowIndex} className={className}>
      {
        row.map((column, columnIndex) => (typeof column === 'string')
          ? (<td key={columnIndex}>{ column }</td>)
          : ((typeof column === 'object') && ('cell' in column)) 
            ? (
              <td key={columnIndex} className="table-cell--error">
                { column.cell }
              </td>
            )
            : (<td key={columnIndex}> - </td>)
        )
      }
    </tr>
  );
}

export default App
