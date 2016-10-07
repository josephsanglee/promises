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
var writeFile = Promise.promisify(fs.writeFile);



// var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
//   return pluck.pluckFirstLineFromFileAsync(readFilePath)
//   .then(function(firstLine) {
//     profile.getGitHubProfileAsync(firstLine)
//     .then(function(body) {
//       console.log(body);
//       fs.writeFile(writeFilePath, JSON.stringify(body), function(err) {
//         if (err) { return console.log(err); }
//       });
//     });
//   });
// };

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluck.pluckFirstLineFromFileAsync(readFilePath)
  .then(function(githubHandle) {
    return profile.getGitHubProfileAsync(githubHandle);
  })
  .then(function(githubProfile) {
    return JSON.stringify(githubProfile);
  })
  .then(function(stringifiedProfile) {
    return writeFile(writeFilePath, stringifiedProfile);
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
