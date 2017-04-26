//! Utilities for doing numeric computation and statistical analysis of added data

const _ = require('lodash');

/**
 * Given VU water quality observations for a single location, calculates a correlation metric between
 * each of the features.  This metric is compared by measuring the percent change from one observation to
 * the next and comparing those percent changes to those of all other features.  The returned correlation
 * metric is from -1 to 1; -1 meaning every time feature a increased by x% feature b decreased by x% etc.
 */
function calcIntraCorrelations(observations) {
  const features = _.filter(Object.keys(observations[0]), feature => feature != 'location');
  // TODO
}

/**
 * Does the same thing as `calcIntraCorrelations` but compares the same features from different locations.
 * The correlation metrics are compared between the same features of different locations using the same
 * method described above.
 */
function calcInterCorrelations(observations) {
  const features = _.filter(Object.keys(observations[0]), feature => feature != 'TODO'); // TODO
}

export { calcInterCorrelations, calcIntraCorrelations };
