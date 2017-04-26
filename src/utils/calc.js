//! Utilities for doing numeric computation and statistical analysis of added data

const _ = require('lodash');

/**
 * Filters all elements of a feature and replaces falsey values with `null`
 */
function replaceNulls(data, key) {
  return _.map(data, obs => {
    if(obs[key]) {
      return +obs[key];
    } else if(obs[key] == '') {
      return null;
    }
  });
}

/**
 * Given VU water quality observations for a single location, calculates a correlation metric between
 * each of the features.  This metric is compared by measuring the percent change from one observation to
 * the next and comparing those percent changes to those of all other features.  The returned correlation
 * metric is from -1 to 1; negative numbers indicate that every time feature a increased by x% of the range,
 * feature b decreased by x% of the range etc.
 */
function calcIntraCorrelations(observations) {
  const features = _.filter(Object.keys(observations[0]), feature => {
    return feature != 'location' && feature != '_id' && feature != 'timestamp' && feature != '_rev';
  });

  const changes = {};
  _.each(features, feature => {
    changes[feature] = [];
    const filteredObs = _.filter(observations, obs => obs[feature] !== '');
    const maxObs = _.maxBy(filteredObs, obs => +obs[feature])[feature];
    const minObs = _.minBy(filteredObs, obs => +obs[feature])[feature];
    changes[`${feature}Range`] = maxObs - minObs;
  });

  // loop over all of the observations, comparing each feature to the last in the series
  let lastObs = observations[0];
  _.each(_.slice(_.sortBy(observations, 'timestamp'), 1), obs => {
    // loop over each of the features for that observation and compare it to the last one
    _.each(features, feature => {
      if(obs[feature] && lastObs[feature]) {
        const diff = obs[feature] - lastObs[feature];
        changes[feature].push(diff / changes[`${feature}Range`]);
      } else {
        changes[feature].push(null);
      }
    });

    lastObs = obs;
  });

  const results = {};
  // compare the changes at each point and calculate the distance to that of every other feature (if they're not null)
  // then use that distance to produce a correlation metric
  _.each(features, feature => {
    results[feature] = {};
    _.each(features, feature2 => {
      let correlSum = 0;
      let correlCount = 0;
      for(var i=0; i<changes[feature].length; i++) {
        const diff1 = changes[feature][i];
        const diff2 = changes[feature2][i];
        const sqrt2 = Math.sqrt(2);
        if(diff1 !== null && diff2 !== null) {
          // correlation is calculated by (((-sqrt(abs(x-y))) / sqrt(2)) * 2) + 1
          const correlation = (((-Math.sqrt(Math.abs(diff1 - diff2))) / sqrt2) * 2) + 1;
          correlSum += correlation;
          correlCount += 1;
        }
      }

      const correlAvg = correlSum / correlCount;
      results[feature][feature2] = correlAvg;
    });
  });

  return results;
}

/**
 * Does the same thing as `calcIntraCorrelations` but compares the same features from different locations.
 * The correlation metrics are compared between the same features of different locations using the same
 * method described above.
 */
function calcInterCorrelations(observations) {
  const features = _.filter(Object.keys(observations[0]), feature => feature != 'TODO'); // TODO
}

export { calcInterCorrelations, calcIntraCorrelations, replaceNulls };
