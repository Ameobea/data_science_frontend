//! Routines for exporting data from the database in a variety of formats

/**
 * Given a handle to the PouchDB, retrieves all stored data and dumps it into a JSON file that can be re-loaded at a later
 * point.  Returns a promise that resolves with the JSON string output.
 */
function exportJSON(db, onError, onSuccess) {
  const output = {};
  db.allDocs().then(documents => {
    console.log(documents);
  });
}

export default {
  exportJSON: exportJSON,
};
