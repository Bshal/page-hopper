# page-hopper

A simple and efficient pagination utility for arrays in JavaScript, suitable for both Node.js and browser environments.

## Installation

```bash
npm install your-package-name
```

## Usage
### Basic Usage

```javascript
const paginate = require('your-package-name');
const collection = [/* your array data */];

const pageNumber = 1;
const numItemsPerPage = 10;
const paginatedCollection = paginate(collection, pageNumber, numItemsPerPage);

console.log(paginatedCollection);
```
This will output:

```javascript
{
  currentPage: 1,
  perPage: 10,
  total: 30,
  totalPages: 3,
  data: [/* paginated items */]
}
```

### With Custom Options

```javascript
const customOptions = { customKey: 'customValue' };
const paginatedCollection = paginate(collection, pageNumber, numItemsPerPage, customOptions);

console.log(paginatedCollection);
```

## Features
- Simple and easy to use.
- No external dependencies.
- Customizable pagination.