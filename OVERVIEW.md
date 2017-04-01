# Data Science 101 Frontend Outline
This document addresses the design of the client-side browser-based data entry, analysis, and visualization tool that is being designed as part of the project.  The motivation behind the construction of this tool is two-fold: To provide a standard and unified way of interacting with and adding to the data set and to create an environment in which the data can be explored and analyzed.

Currently, the data is housed in a Google spreadsheet.  Although this solution works, the loose schema of a spreadsheet is not the best fit for the project's data and makes it's use in analysis and visualization difficult.  This application stores data in JSON format, writing it to a file that can be loaded at a later time.  The application will also include a data export feature where the data can be exported to CSV for use in external tools and applications.

The data is split into two different sets: That collected by the VU students and that collected by the gradeschool students.  These two data sets both have different schemas and formats, both of which are accounted for in this application.

## Application Architecture
The application takes the form of a fully client-side, browser-based JavaScript application.  It is built as a React application using `create-react-app`, uses the `highcharts` library for visualization, and makes use of the `react-bootstrap` library for data input and GUI features.  The application requires no server-side resources to run and can even be used offline if it is downloaded to a user's computer.  However, my current plan for it is to host it on a website (a very easy task since it's just a static application) where it can be accessed by users without them having to download it.

To organize the data internally, the application makes use of a client-side NoSQL database called PouchDB which is modelled after the server-side CouchDB.  PouchDB is an extremely simple document-based database that simply holds and indexes the observations for the two different data sets.  In addition to simply holding the data, it also supports basic query features as well as has the ability to use native JavaScript functions to filter returned data.

Once the data has been imported from the JSON file, it is loaded into the PouchDB and used to populate an interactive visualization system.  This system uses Highcharts to draw some basic graphs and visualizations using the data and contains controls to allow users to set which parts of the data is plotted, set the time frames of the plots, and make other similar changes.

The application also exposes data entry forms for both the VU student data as well as the gradeschooler data that can be used to enter new observations into the dataset quickly, easily, and accurately.

Finally, the application contains a data export feature through which the updated dataset can be re-saved as a JSON file or exported as a CSV.  The idea is that the user will save an updated JSON file every time they make a modification to the data which will preserve their new changes.

## Development Progress
The application currently has a fully set-up boilerplate including the React appliation structure, the PouchDB, and a system for loading data files and parsing them into the database.  The schemas for the datasets are also mapped out and integrated into the FlowJS type system which makes the JavaScript code more robust and reliable.

For the Miniumum Viable Product, the application will have a basic, non-interactive visualization for the VU student data's most important features as well as a basic data entry system through which new data can be added.  Also included will the save feature through which updated JSON files can be saved and loaded to preserve changes.

For the desirable product, there will be an interacative visualizations for both data sets through which the user can select which features to plot.  There will be options for basic statistical analysis of the features for things such as averages and correlations between the different features.  There will be data entry systems for both data sets with featuring form validation and input checking.  There will be a basic tabular view for all data showing all observations recorded by the application.  Finally, there will be a CSV export option for at least the VU student data (hopefully the gradeschooler data as well).

For the stretch goal, possible features include advanced visualization tools including moving averages, predictions of future data using past data, and analysis of how the data has changed over time.  There could be an observation edit/delete system through which the data can be edited from within the application.  I'd like to include the cloud-based synchronzation tool detailed below.

## Future Goals
* Data management system by which old data points can be edited to fix innacuracies, typos, etc.
* Persistant visualizations that save their state in the JSON file through application restarts.
* Cloud-based data storage using Google Drive to allow shared use of the tool and automatic synchronization (very desirable goal)