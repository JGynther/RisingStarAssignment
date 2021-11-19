// Simple function to get the max value of an array
export function getArrayMax(array) {
  let max = 0,
    indexMax = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
      indexMax = i;
    }
  }

  return [max, indexMax];
}

// Expanding on getArrayMax function, this function also returns a minimum value.
export function getArrayMinMax(array) {
  let min = array[0],
    minIndex = 0;

  let max = array[0],
    maxIndex = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
      minIndex = i;
    }

    if (array[i] > max) {
      max = array[i];
      maxIndex = i;
    }
  }

  return [min, max, minIndex, maxIndex];
}

// Takes a one-dimensional array of prices and returns the longest downward trend.
// Price movement is considered downward if n < n - 1.
export function longestBearishTrend(array) {
  let length = 0,
    runningCount = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      runningCount++;
    } else {
      // Compare length and runningCount and set length to whichever is greater
      length = Math.max(length, runningCount);
      runningCount = 0;
    }
  }

  // If runningCount != 0 at the end, we need one final comparison.
  if (runningCount) {
    length = Math.max(length, runningCount);
  }

  return length;
}

// Again expanding on getArrayMax function, but it includes slicing the array.
export function lowestValueBeforeMax(array, maxIndex) {
  let min = array[0],
    minIndex = 0;

  array = array.slice(0, maxIndex);

  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
      minIndex = i;
    }
  }

  return [min, minIndex];
}

export function highestValueAfterMin(array, minIndex) {
  let max = 0,
    maxIndex = 0;

  array = array.slice(minIndex);

  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
      maxIndex = i + minIndex; // Add the minIndex as the array was cut from the start
    }
  }

  return [max, maxIndex];
}
