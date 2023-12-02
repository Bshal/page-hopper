const paginate = (collection, page = 1, numItems = 10, options = {}) => {
  if (!Array.isArray(collection)) {
    throw new Error(`Expected an array, but got ${typeof collection}`);
  }

  const currentPage = Number.isInteger(page) && page > 0 ? page : 1;
  const perPage = Number.isInteger(numItems) && numItems > 0 ? numItems : 10;

  const totalItems = collection.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const offset = (currentPage - 1) * perPage;
  const paginatedItems = collection.slice(offset, offset + perPage);

  // Default pagination object
  const pagination = {
    currentPage,
    perPage,
    total: totalItems,
    totalPages,
    data: paginatedItems
  };

  // Merging the default pagination object with user-provided options
  return { ...pagination, ...options };
}

module.exports = paginate