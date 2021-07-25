export const insert = (doc) => ({
  insertOne: {
    document: {...doc},
  },
});

export const update = (filter, update) => ({
  updateOne: {
    filter: filter,
    update: update,
  },
});

export const filterArray = (array, key, value) => {
  return array.filter((i) => i[key] === value);
};

export const filterArrays = (array1, array2, key1, key2) => {
  return array1.filter(
    (i) => array2.findIndex((k) => k[key2] === i[key1]) !== -1,
  );
};

export const findInArray = (array, key, value) => {
  return array.find((i) => i[key] === value);
};

export const promiseParallel = (tasks) => {
  const taskRunner = tasks.map((task) => task());
  return Promise.all(taskRunner);
};

export const promiseParallel = (tasks) => {
  const taskRunner = tasks.map((task) => task());
  return Promise.all(taskRunner);
};
