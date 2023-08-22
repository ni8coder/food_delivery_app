class PersistanceClass {
  instaceValue = 10;

  get = () => {
    return this.instaceValue;
  };

  set = (val: number) => {
    this.instaceValue = val;
  };
}

// const persistedClass = Object.freeze(new PersistanceClass());

export default new PersistanceClass();
