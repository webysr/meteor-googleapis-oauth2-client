// import fails for 'googleapis' (https://github.com/meteor/meteor/issues/6438)
const GoogleAPIs = Npm.require('googleapis');
const moment = Npm.require('moment');

const OAuth2 = GoogleAPIs.auth.OAuth2;
let authConfig;

/**
 * Class representing the OAuth2Client
 */
OAuth2Client = class {

  /**
   *
   * @param userId
   * @constructor
   */
  constructor(userId) {

    this.user = Meteor.users.findOne(userId);
    this.init();
  }

  init() {

    // authConfig must be set at runtime!!
    if (!authConfig) {

      authConfig = ServiceConfiguration.configurations.findOne({service: 'google'});
    }

    this.oAuth2Client = new OAuth2(authConfig.clientId, authConfig.secret, authConfig.redirectUrl);

    this.oAuth2Client.setCredentials({
      access_token: this.user.services.google.accessToken,
      refresh_token: this.user.services.google.refreshToken
    });

    this.refreshAccessTokenSync = Meteor.wrapAsync(this.oAuth2Client.refreshAccessToken, this.oAuth2Client);
  }

  /**
   * Get a valid oAuth2 client for the provided user
   *
   * @returns {GoogleAPI.auth.OAuth2|*}
   */
  get() {

    // access token should be valid at least one minute
    if (moment().add(1, 'm').isAfter(moment(parseInt(this.user.services.google.expiresAt)))) {

      console.log('Access Token valid less than one minute... go refresh it!');
      var tokens = this.refreshAccessTokenSync();
      console.log(tokens);
      Meteor.users.update({_id: this.user._id},
        {
          $set: {
            "services.google.accessToken": tokens.access_token,
            "services.google.idToken": tokens.id_token,
            "services.google.expiresAt": tokens.expiry_date
          }
        });
    } else {
      console.log('Access Token will expire ' + moment().to(moment(this.user.services.google.expiresAt)));
    }

    return this.oAuth2Client;
  }

  /**
   * Function returning the user from the db
   * @returns {any|*}
   */
  getUser() {

    return this.user;
  }
};