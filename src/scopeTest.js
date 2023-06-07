const config = {
  definitions: [
    {
      text: 'aaa',
      type: 'A'
    },
    {
      text: 'bbb',
      type: 'B'
    }
  ]
};

const TEST_TYPE = {
  A: (x) => {
    console.log('>A', x)
  },
  B (x) {
    console.log('>B', x)
  },
};

const writeTest = (type, fn) => {
  return function (number) {
    console.log(this.text + type + number);

    for (let index = 0; index <= number; index++) {
      fn(index);
    }
  };
}

const rules = config.definitions.map(
  ({ text, type }) => ({
    text,
    test: writeTest(type, TEST_TYPE[type]),
  })
  // (definition) => {
  //   const { text, type } = definition;
  //   const fn = TEST_TYPE[type];
  //   const rule = {
  //     text,
  //     // test: function (number) {
  //     //   console.log(this.text + type + number);
  //     // }
  //     test: writeTest(type, fn),
  //   };

  //   return rule;
  // }
);

export const testRules = () => {
  console.log(testRules);

  rules.forEach((rule, ruleIndex) => rule.test(ruleIndex + 1));
}

testRules();

// run with `node scopeTest.js`
