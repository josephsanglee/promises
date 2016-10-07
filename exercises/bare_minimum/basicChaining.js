/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluck = require('./promiseConstructor.js');
var profile = require('./promisification.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluck.pluckFirstLineFromFileAsync(readFilePath)
  .then(function(firstLine) {
    profile.getGitHubProfileAsync(firstLine)
    .then(function(body) {
      console.log(body);
      fs.writeFile(writeFilePath, JSON.stringify(body), function(err) {
        if (err) { return console.log(err); }
      });
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
