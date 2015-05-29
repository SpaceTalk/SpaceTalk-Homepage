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

      var pulls = HTTP.call('HEAD', 'https://api.github.com/repos/SpaceTalk/SpaceTalk/pulls', {
        headers: {
          'User-Agent': 'Meteor/1.0',
          'Accept': 'application/vnd.github.moondragon+json'
        },
        auth: Meteor.settings.githubAuth,
        params: {
          state: 'all',
        }
      });
      var pagePulls = /page=([0-9]*)>; rel="last"/g.exec(pulls.headers['link']);
      var pagesPulls = pagePulls ? pagePulls[1] : 1;

      var pulls = HTTP.get('https://api.github.com/repos/SpaceTalk/SpaceTalk/pulls', {
        headers: {
          'User-Agent': 'Meteor/1.0',
          'Accept': 'application/vnd.github.moondragon+json'
        },
        auth: Meteor.settings.githubAuth,
        params: {
          state: 'all',
          page: pagePulls[1]
        }
      }).data;

      var openPulls = HTTP.call('HEAD', 'https://api.github.com/repos/SpaceTalk/SpaceTalk/pulls', {
        headers: {
          'User-Agent': 'Meteor/1.0',
          'Accept': 'application/vnd.github.moondragon+json'
        },
        auth: Meteor.settings.githubAuth,
        params: {
          state: 'open',
        }
      });
      var pageOpenPulls = /page=([0-9]*)>; rel="last"/g.exec(openPulls.headers['link']);
      var pagesOpenPulls = pageOpenPulls ? pageOpenPulls[1] : 1;

      var openPulls = HTTP.get('https://api.github.com/repos/SpaceTalk/SpaceTalk/pulls', {
        headers: {
          'User-Agent': 'Meteor/1.0',
          'Accept': 'application/vnd.github.moondragon+json'
        },
        auth: Meteor.settings.githubAuth,
        params: {
          page: pagesOpenPulls,
          state: 'open'
        }
      }).data;

      var contributors = HTTP.get('https://api.github.com/repos/SpaceTalk/SpaceTalk/stats/contributors', {
        headers: {
          'User-Agent': 'Meteor/1.0',
          'Accept': 'application/vnd.github.moondragon+json'
        },
        auth: Meteor.settings.githubAuth
      }).data;

      // Let's grab stats from Github.
      var data = {
        _id: 'github',
        pull_requests: pulls.length + (pagesPulls - 1) * 30,
        contributors: contributors.length
      };
      _.extend(data, _.pick(repo, 'stargazers_count', 'subscribers_count', 'forks_count', 'open_issues'));
      data.open_issues -= (openPulls.length + (pagesOpenPulls - 1) * 30);

      Github.upsert({_id: 'github'}, data);
    } catch(e) {
      console.log(e);
    }
  }, 120000);

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
