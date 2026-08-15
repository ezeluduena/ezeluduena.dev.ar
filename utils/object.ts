export const deleteUndefined = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  for (const key of Object.keys(obj)) {
    const value = (obj as Record<string, unknown>)[key];
    if (typeof value === 'undefined') {
      delete (obj as Record<string, unknown>)[key];
    } else if (typeof value === 'object' && value !== null) {
      deleteUndefined(value);
    }
  }

  return obj;
};
