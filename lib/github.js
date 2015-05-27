Github = new Mongo.Collection('github');

if (Meteor.isServer) {
  Meteor.setInterval(function() {
    try {
      var repo = HTTP.get('https://api.github.com/repos/SpaceTalk/SpaceTalk', {
        headers: {
          'User-Agent': 'Meteor/1.0',
          'Accept': 'application/vnd.github.moondragon+json'
        },
        auth: Meteor.settings.githubAuth
      }).data;

      var pulls = HTTP.get('https://api.github.com/repos/SpaceTalk/SpaceTalk/pulls', {
        headers: {
          'User-Agent': 'Meteor/1.0',
          'Accept': 'application/vnd.github.moondragon+json'
        },
        auth: Meteor.settings.githubAuth,
        params: {
          state: 'all'
        }
      }).data;

      var contributors = HTTP.get('https://api.github.com/repos/SpaceTalk/SpaceTalk/contributors', {
        headers: {
          'User-Agent': 'Meteor/1.0',
          'Accept': 'application/vnd.github.moondragon+json'
        },
        auth: Meteor.settings.githubAuth
      }).data;

      // Let's grab stats from Github.
      var data = {
        _id: 'github',
        pull_requests: pulls.length,
        contributors: contributors.length
      };
      _.extend(data, _.pick(repo, 'stargazers_count', 'subscribers_count', 'forks_count', 'open_issues'));

      Github.upsert({_id: 'github'}, data);
    } catch(e) {
      console.log(e);
    }
  }, 600000);

  Meteor.publish('github', function() {
    return Github.find({_id: 'github'});
  })
}
else {
  Template.githubStats.onCreated(function() {
    var instance = this;
    instance.subscribe('github');
  });

  Template.githubStats.helpers({
    github: function() {
      return Github.findOne();
    }
  });
}
