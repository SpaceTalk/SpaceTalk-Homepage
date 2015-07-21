<template name="Content">
  <div class="content">
    <div class="logo">
      <div class="image">
        <img src="/logo.png" />
      </div>
    </div>
    <div class="inner">
      <div class="breif">
        <p>SpaceTalk makes it easy to launch your very own chat application, and get in control of your data. Build and customize your very own <em>Slack</em>, <em>Telegram</em>, or <em>Facebook Messenger</em>!</p>
        <p>Built with Meteor, just like <a href="http://telescopeapp.org">the popular app Telescope.</a></p>
      </div>

      <GithubStats/>

      <ul>
        <li>Fork <a ref="a" href="http://github.com/SpaceTalk/SpaceTalk" target="_blank"><span class="show-wide">SpaceTalk</span> on Github</a></li>
        <li>Show <a ref="a" href="https://trello.com/b/R9Nh1V3t/spacetalk-roadmap" target="_blank"><span class="show-wide">SpaceTalk</span> Roadmap on Trello</a></li>
      </ul>

      <SlackInvite />

      <p class="copy">Copyright © 2015 Tim Brandin &amp; SpaceTalk</p>
    </div>
    <div class="fork">
      <a href="https://github.com/SpaceTalk/SpaceTalk-Homepage" title="Fork SpaceTalk's Homepage"
         target="_blank">Fork this page on Github</a>
    </div>
  </div>
</template>

Template.Content.events({
  'click ul li': function(context, event) {
    event.preventDefault();
    var href = $('a', $(event.target).closest('li')).attr('href');
    window.open(href, '_blank');
  },

  'onInvite SlackInvite': function(context, event) {
    ga("send", "event", 'button', 'click', 'invite');
  }
});
