const eventListener = require('./listener');

module.exports.run = async (event, context) => {
  const time = new Date();
  console.log(
    `===>>> Your event listener function "${context.functionName}" ran at ${time} <<<===`
  );

  await eventListener();
  console.log('Done');
};
