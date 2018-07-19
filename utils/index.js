const objectZip = (keys, values) => {
  return keys.reduce((accu, key, index) => ({
    ...accu,
    [key]: values[index],
  }), {});
}

const objectPromise = async obj =>
  objectZip(Object.keys(obj), await Promise.all(Object.values(obj)));

module.exports.objectPromiseMixed = async obj => {
  var functionsOnly = Object.keys(obj).reduce((accu, i) => {
    return (obj[i] && obj[i].then !== undefined && typeof(obj[i].then) === 'function') ? {...accu, [i]:obj[i] }:accu
  }, {})
  return {...obj, ...await objectPromise(functionsOnly) }
}

module.exports.getProjection = (fieldASTs) => {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce(
    (projections, selection) => {
      projections[selection.name.value] = true
      return projections
    },
    {}
  )
}
