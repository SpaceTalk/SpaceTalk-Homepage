Meteor.methods({
  invite: function(email) {
    if (!this.isSimulation) {
      var url = "https://spacetalk.slack.com/api/users.admin.invite";
      var data = {
        email: email,
        token: Meteor.settings.slackToken,
        set_active: true
      };

      try {
        var data = HTTP.call("POST", url, {
          params: data
        }).data;
      } catch(e) {
        console.log(e);
      }

      return data;
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('slack', function() {
    var sub = this;
    try {
      HTTP.get('https://slack.com/api/rtm.start', {
        params: {
          token: Meteor.settings.slackToken
        }
      }, function(err, res) {
        if (!err && res.data && res.data.users) {
          var users = res.data.users;
          var total = users.length;
          var active = _.filter(users, function(user) {
            return 'active' == user.presence;
          }).length;

          var data = {
            online: active,
            registered: total
          };

          sub.added('slack', 'slack', data);
        }
      });
    } catch(e) {
      console.log(e);
    }

    sub.ready();
  });
}
else {
  Slack = new Mongo.Collection('slack');
}
