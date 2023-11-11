const { SpecReporter } = require('jasmine-spec-reporter');

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displayPending: true, // Display pending specs
    displayDuration: true // Display duration of the specs
  },
  summary: {
    displayFailed: true // Display failed specs in summary
  }
}));
