export type FSDataType = {
  filters: [[string, string, string]][] | [string, string, string][] | null;
};

export function buildFSStr(givenData: FSDataType): string {
  if (!givenData.filters || givenData.filters.some((group) => group.some((condition) => condition[2] === ''))) {
    return '';
  }

  const filterStr = givenData.filters && givenData.filters.length > 0 ? JSON.stringify(givenData.filters) : null;
  return filterStr || '';
}
