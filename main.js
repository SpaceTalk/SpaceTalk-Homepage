if (Meteor.isClient) {
  Template.content.onRendered(function() {
    this.$('li').click(function(e) {
      e.preventDefault();
      var href = $('a', this).attr('href');
      window.open(href, '_blank');
    });
  });

  Template.slackInvite.onCreated(function() {
    var instance = this;
    instance.autorun(function(){
      if (instance.invite.get()) {
        ga("send", "event", 'button', 'click', 'invite');
      }
    });
  });
}
