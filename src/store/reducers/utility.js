export const updateObject = (oldObject, changes) => {
  return {
    ...oldObject,
    ...changes,
  };
};
