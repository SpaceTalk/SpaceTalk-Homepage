if (Meteor.isClient) {
  Template.content.onRendered(function() {
    this.$('li').click(function() {
      e.preventDefault();
      var href = $('a', this).attr('href');
      window.open(href, '_blank');
    });
  });
}
