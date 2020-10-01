const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

function alert(){
    // or use es6 import statements
    // import * as Tracing from '@sentry/tracing';
    
    Sentry.init({
      dsn: "https://40661805b4ff461785965200a682fff8@o447853.ingest.sentry.io/5428294",
      tracesSampleRate: 1.0,
    });
};

module.exports =  alert;