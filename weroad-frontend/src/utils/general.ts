interface ObjToCompare {
  [key: string]: any;
}

export const isIncluded = (obj1: ObjToCompare, obj2: ObjToCompare): boolean => {
  for (const key in obj1) {
    if (!(key in obj2) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

/* Return a version of given object with all keys undefined */
export const undefinizy = (obj: { [key: string]: string | number | undefined }) => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key] = undefined;
      return acc;
    },
    {} as { [key: string]: string | number | undefined },
  );
};
