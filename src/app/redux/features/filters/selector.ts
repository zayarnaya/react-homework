export const selectAllFilters = (state: any) => state.filters;

export const selectOneFilter = (state: any, filter: string) =>
selectAllFilters(state)[filter];
