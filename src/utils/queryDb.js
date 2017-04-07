//! Functions for interacting with, inserting data into, and getting data out of the PouchDB

const _ = require('lodash');

/**
 * Given a new water quality observation, adds it to the database.
 */
function addWaterQualityObservation(db, obs) {
  return new Promise((f, r) => {
    if(!obs || !obs.timestamp){
      r('All observations require a timestamp!');
      return;
    } else if(!obs.location) {
      r('All obvservations require a location');
    }

    obs._id = `${obs.timestamp}_${obs.location}`;
    db.put(obs)
      .then(() => {f('Observation successfully recorded!');})
      .catch(err => {
        console.log(err);
        // TODO: Handle multiple documents for the same date
        r('Error while inserting document into database!');
      });
  });
}

/**
 * Returns all stored water quality observations from the database.
 */
function getAllWaterQualityObservations(db) {
  return new Promise((f, r) => {
    db.allDocs({include_docs: true}).then(docs => {
      const processed = _.map(_.map(docs.rows, 'doc'), doc => {
        return {...doc, timestamp: new Date(doc.timestamp)};
      });

      f(_.sortBy(processed, 'timestamp'));
    }).catch(r);
  });
}

export { addWaterQualityObservation, getAllWaterQualityObservations };
