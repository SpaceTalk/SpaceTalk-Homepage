FlowRouter.route("/", {
  subscriptions: function() {
    this.register('github', Meteor.subscribe('github'));
    this.register('slack', Meteor.subscribe('slack'));
  },
  action: function() {
    if (Meteor.isClient) {
      FlowRouter.subsReady('slack', function() {
        ReactLayout.render(Content);
      });
    }
    else {
      ReactLayout.render(Content);
    }
  }
});
