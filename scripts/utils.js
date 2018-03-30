module.exports.insert = (doc) => {
  return {
    insertOne:{
      document: {...doc}
    }
  }
}

module.exports.update = (filter, update) => {
  return {
    updateOne: {
      filter: filter,
      update: update,
    }
  }
}


module.exports.filterArray = (array, key, value) => {
  return array.filter(i => i[key] === value)
}

module.exports.filterArrays = (array1, array2, key1, key2) => {
  return array1.filter(i => array2.findIndex(k => k[key2] === i[key1])!==-1)
}

module.exports.findInArray = (array, key, value) => {
  return array.find(i => i[key] === value)
}

module.exports.promiseParallel = (tasks) => {
  var taskRunner = tasks.map(task => task())
  Promise.all(taskRunner)
}


module.exports.promiseParallel = async (tasks) => {
  var taskRunner = tasks.map(task => task())
  Promise.all(taskRunner)
}
