function getByPatch(target, path) {
  return path.split(".").reduce((acc, pathItem) => {
    return acc[pathItem];
  }, target);
}

export default function uniqArray(target, path) {
  const elMap = new Map();
  const result = [];

  target.forEach((targetVal) => {
    let gotItem = getByPatch(targetVal, path);

    if (!elMap.has(gotItem)) {
      elMap.set(gotItem, true);
      result.push(targetVal);
    }
  });

  return result;
}
