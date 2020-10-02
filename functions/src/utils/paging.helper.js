/**
 * Standardize query parameters
 * @param {*} page 
 * @param {*} pageSize 
 * @param {*} orderBy 
 * @param {*} sortBy 
 */
const standardize = (page, pageSize, orderBy, sortBy) => {
  if (isNaN(page) || page < 0) {
    page = 0;
  }

  if (isNaN(pageSize) || pageSize < 0) {
    pageSize = 10;
  }

  if (orderBy == null || orderBy == "") {
    orderBy = "createdAt";
  }

  if (sortBy == null || sortBy == "") {
    if (sortBy === "desc") {
      sortBy = "desc";
    }

    sortBy = "asc";
  }

  let limit = pageSize;

  if (page > 1) {
    limit = (page - 1) * pageSize;
  }

  return {
    page,
    pageSize,
    orderBy,
    sortBy,
    limit,
  };
};

module.exports = {
  standardize,
};
