const base = require('@playwright/test');

exports.customTestWithData = base.test.extend({
  testDataForLogin: {
    username: 'standard_user',
    password: 'secret_sauce',
    incorrectPassword: 'wrong_password',
  },
});
