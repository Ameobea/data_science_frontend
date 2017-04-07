//! Routines for loading the initial database state from a supplied file
// @flow

import React from 'react';

import { CritError } from './errors';

/**
 * The possible features of an observation made by the VU student researchers of water quality.  The only required fields are
 * timestamp and location; the others can be missing without breaking the application.
 */
type VUObservation = {
  _id: string, // the ID used for indexing in the PouchDB
  location: string,
  timestamp: number, // unix timestamp that can be parsed into a date using `new Date(data.lastModified)`
  waterTemp: ?number, // water temperature in Celsius
  mmHg: ?number,
  DOPercent: ?number,
  DOMgL: ?number,
  CUsCm: ?number,
  eColi1: ?number,
  turbidity: ?number,
  pH: ?number,
  ClConc: ?number,
  NO3Conc: ?number,
  SO4Conc: ?number,
  TSSSampleMass1: ?number,
  TSSSampleMass2: ?number
};

/**
 * The possible features of an observation made by the gradeschoolers on the data sheets.
 * TODO
 */
type GradeschoolObservation = null; // TOOD

/**
 * The expected schema of the JSON file supplied by the user via file upload.  This schema is verified dynamically and the
 * `loadDb` function will throw an error if it is in an incorrect format.
 */
type ImportedData = {
  lastModified: string, // string that can parsed into a date using `new Date(data.lastModified)`
  VUData: Array<VUObservation>, // contains the observations recorded by the VU researchers
  gradeschoolData: Array<GradeschoolObservation> // contains the observations recorded by the gradeschoolers
};

/**
 * Given a handle to the PouchDB and an object parsed from the uploaded file, attempts to populate the database with the contained
 * data.  Returns a promise that fulfills when it completes or rejects with an error if there was an issue with the supplied data.
 */
function loadDb(db: any, data: ImportedData): Promise<null, any> {
  return new Promise((fulfill, reject) => {
    // make sure that the required features are included in the parsed object
    if(!data.lastModified || !data.VUData || !data.gradeschoolData) {
      return reject(<CritError additionalError='Required features not present in uploaded data' />);
    }

    // load all of the VU Student observations into the database
    db.bulkDocs(data.VUData).catch(err => reject(<CritError additionalError={err} />));

    // load all of the gradeschooler-collected data into the database
    // TODO

    fulfill('Successfully loaded data from file.');
  });
}

export default loadDb;
