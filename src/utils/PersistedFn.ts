const PersistedFn = (function internalRef() {
  let privateValue = 10;

  const get = () => {
    return privateValue;
  };

  const set = (val: number) => {
    privateValue = val;
  };

  return {
    get,
    set,
  };
})();

let fn = Object.freeze(PersistedFn);

export default fn;
