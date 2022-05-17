export default (searchText) =>
  !searchText ||
  /\d/.test(searchText) ||
  !/[a-zA-Z]/.test(searchText) ||
  searchText.length < 2;
