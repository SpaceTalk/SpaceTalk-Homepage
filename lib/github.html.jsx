<template name="GithubStats">
this.data.github ? (
  <div class="github-stats">
    <span class="subscribers-count" data-tooltip="Subscribers"><span class="octicon octicon-eye"></span>{this.data.github.subscribers_count}</span>
    <span class="stargazers-count" data-tooltip="Stargazers"><span class="octicon octicon-star"></span>{this.data.github.stargazers_count}</span>
    <span class="forks-count" data-tooltip="Forks"><span class="octicon octicon-repo-forked"></span>{this.data.github.forks_count}</span>
    <span class="open-issues" data-tooltip="Open issues"><span class="octicon octicon-issue-opened"></span>{this.data.github.open_issues}</span>
    <span class="pull-requests" data-tooltip="Pull requests"><span class="octicon octicon-git-pull-request"></span>{this.data.github.pull_requests}</span>
    <span class="contributors" data-tooltip="Contributors"><span class="octicon octicon-organization"></span>{this.data.github.contributors}</span>
  </div>
) : ''
</template>

Template.GithubStats.helpers({
  github: function() {
    return Github.findOne();
  }
});
