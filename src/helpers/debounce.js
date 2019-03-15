export default (fn, time) => {
  let timeout;

  // eslint-disable-next-line func-names
  return function() {
    // eslint-disable-next-line prefer-rest-params
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
