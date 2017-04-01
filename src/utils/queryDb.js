//! Functions for interacting with, inserting data into, and getting data out of the PouchDB

/**
 * Given a new water quality observation, adds it to the database.
 */
function addWaterQualityObservation(db, obs) {
  return new Promise((f, r) => {
    obs._id = obs.timestamp;
    db.put(obs)
      .then(() => {f('Observation successfully recorded!');})
      .catch(err => {
        console.log(err);
        r('Error while inserting document into database!');
      });
  });
}

export { addWaterQualityObservation };
