<template name="GithubStats">
{{#if github}}
  <div class="github-stats">
    <span class="subscribers-count" data-tooltip="Subscribers"><span class="octicon octicon-eye"></span>{{github.subscribers_count}}</span>
    <span class="stargazers-count" data-tooltip="Stargazers"><span class="octicon octicon-star"></span>{{github.stargazers_count}}</span>
    <span class="forks-count" data-tooltip="Forks"><span class="octicon octicon-repo-forked"></span>{{github.forks_count}}</span>
    <span class="open-issues" data-tooltip="Open issues"><span class="octicon octicon-issue-opened"></span>{{github.open_issues}}</span>
    <span class="pull-requests" data-tooltip="Pull requests"><span class="octicon octicon-git-pull-request"></span>{{github.pull_requests}}</span>
    <span class="contributors" data-tooltip="Contributors"><span class="octicon octicon-organization"></span>{{github.contributors}}</span>
  </div>
{{/if}}
</template>

Template.GithubStats.helpers({
  github: function() {
    return Github.findOne();
  }
});
