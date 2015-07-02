FlowRouter.triggers.enter([function(context) {
  window.onload = function() {
    ga && ga('send', 'pageview');
    ga && ga('set', 'page', context.path);
  };
}]);

FlowRouter.route("/", {
  subscriptions: function() {
    this.register('github', Meteor.subscribe('github'));
  },
  action: function() {
    ReactLayout.render(Content);
  }
});