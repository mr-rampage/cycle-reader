'use strict';

// Add support for all files in the test directory
var testsContext = require.context('./src/', true, /(\.spec\.js$)/);
testsContext.keys().forEach(testsContext);
