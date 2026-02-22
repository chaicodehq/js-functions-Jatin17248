/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  const operators = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "===": (a, b) => a === b,
  };
  const filterReturn = (obj) => {
    if (typeof obj !== "object") return false;
    if (operators[operator](obj[field], value)) return true;
    return false;
  };
  const falsy = () => {
    return false;
  };
  if (!operators[operator]) return falsy;
  return filterReturn;
}

export function createSorter(field, order = "asc") {
  const abc = (a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string")
      return order === "asc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    if (typeof a[field] === "number" && typeof b[field] === "number")
      return order === "asc" ? a[field] - b[field] : b[field] - a[field];
  };
  return abc;
}

export function createMapper(fields) {
  const abc = (objj) => {
    let finalObj = {};
   fields.forEach((field) => {
      if (objj[field]) {
        finalObj[field] = objj[field];
      }
    });
    return finalObj;
  };
  return abc;
}

export function applyOperations(data, ...operations) {
 
  if(!Array.isArray(data) ) return [];
 return operations.reduce((acc, operation) =>{
    acc=operation(acc);
    return acc;
  }, data)

}
