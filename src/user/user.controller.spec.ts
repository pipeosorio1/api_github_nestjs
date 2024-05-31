import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GithubApiResponse } from './interfaces/github-repository.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AxiosAdapter } from '@common/adapters/axios.adapter';

class MockConfigService {
  get(key: string) {
    switch (key) {
      case 'URL_GITHUB':
        return 'https://api.github.com/';
      case 'GITHUB_ACCESS_TOKEN':
        return 'your-github-access-token';
      default:
        return null;
    }
  }
}

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        AxiosAdapter,
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
      ],
      imports: [ConfigModule],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  describe('getTopRepositoriesByGoogle', () => {
    it('should return an array of top repositories', async () => {
      const mockRepositories: GithubApiResponse = {
        total_count: 10,
        incomplete_results: false,
        items: Array(10).fill({
          id: 1,
          node_id: 'MDEwOlJlcG9zaXRvcnkx',
          name: 'repo1',
          full_name: 'google/repo1',
          private: false,
          owner: {
            login: 'google',
            id: 1,
            node_id: 'MDQ6VXNlcjE=',
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/google',
            html_url: 'https://github.com/google',
            followers_url: 'https://api.github.com/users/google/followers',
            following_url:
              'https://api.github.com/users/google/following{/other_user}',
            gists_url: 'https://api.github.com/users/google/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/google/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/google/subscriptions',
            organizations_url: 'https://api.github.com/users/google/orgs',
            repos_url: 'https://api.github.com/users/google/repos',
            events_url: 'https://api.github.com/users/google/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/google/received_events',
            type: 'Organization',
            site_admin: false,
          },
          html_url: 'https://github.com/google/repo1',
          description: 'Repository 1',
          fork: false,
          url: 'https://api.github.com/repos/google/repo1',
          forks_url: 'https://api.github.com/repos/google/repo1/forks',
          keys_url: 'https://api.github.com/repos/google/repo1/keys{/key_id}',
          collaborators_url:
            'https://api.github.com/repos/google/repo1/collaborators{/collaborator}',
          teams_url: 'https://api.github.com/repos/google/repo1/teams',
          hooks_url: 'https://api.github.com/repos/google/repo1/hooks',
          issue_events_url:
            'https://api.github.com/repos/google/repo1/issues/events{/number}',
          events_url: 'https://api.github.com/repos/google/repo1/events',
          assignees_url:
            'https://api.github.com/repos/google/repo1/assignees{/user}',
          branches_url:
            'https://api.github.com/repos/google/repo1/branches{/branch}',
          tags_url: 'https://api.github.com/repos/google/repo1/tags',
          blobs_url:
            'https://api.github.com/repos/google/repo1/git/blobs{/sha}',
          git_tags_url:
            'https://api.github.com/repos/google/repo1/git/tags{/sha}',
          git_refs_url:
            'https://api.github.com/repos/google/repo1/git/refs{/sha}',
          trees_url:
            'https://api.github.com/repos/google/repo1/git/trees{/sha}',
          statuses_url:
            'https://api.github.com/repos/google/repo1/statuses/{sha}',
          languages_url: 'https://api.github.com/repos/google/repo1/languages',
          stargazers_url:
            'https://api.github.com/repos/google/repo1/stargazers',
          contributors_url:
            'https://api.github.com/repos/google/repo1/contributors',
          subscribers_url:
            'https://api.github.com/repos/google/repo1/subscribers',
          subscription_url:
            'https://api.github.com/repos/google/repo1/subscription',
          commits_url:
            'https://api.github.com/repos/google/repo1/commits{/sha}',
          git_commits_url:
            'https://api.github.com/repos/google/repo1/git/commits{/sha}',
          comments_url:
            'https://api.github.com/repos/google/repo1/comments{/number}',
          issue_comment_url:
            'https://api.github.com/repos/google/repo1/issues/comments{/number}',
          contents_url:
            'https://api.github.com/repos/google/repo1/contents/{+path}',
          compare_url:
            'https://api.github.com/repos/google/repo1/compare/{base}...{head}',
          merges_url: 'https://api.github.com/repos/google/repo1/merges',
          archive_url:
            'https://api.github.com/repos/google/repo1/{archive_format}{/ref}',
          downloads_url: 'https://api.github.com/repos/google/repo1/downloads',
          issues_url:
            'https://api.github.com/repos/google/repo1/issues{/number}',
          pulls_url: 'https://api.github.com/repos/google/repo1/pulls{/number}',
          milestones_url:
            'https://api.github.com/repos/google/repo1/milestones{/number}',
          notifications_url:
            'https://api.github.com/repos/google/repo1/notifications{?since,all,participating}',
          labels_url: 'https://api.github.com/repos/google/repo1/labels{/name}',
          releases_url:
            'https://api.github.com/repos/google/repo1/releases{/id}',
          deployments_url:
            'https://api.github.com/repos/google/repo1/deployments',
          created_at: '2020-01-01T00:00:00Z',
          updated_at: '2024-05-31T00:00:00Z',
          pushed_at: '2024-05-31T00:00:00Z',
          git_url: 'git://github.com/google/repo1.git',
          ssh_url: 'git@github.com:google/repo1.git',
          clone_url: 'https://github.com/google/repo1.git',
          svn_url: 'https://github.com/google/repo1',
          homepage: 'https://google.com',
          size: 123,
          stargazers_count: 123,
          watchers_count: 123,
          language: 'JavaScript',
          has_issues: true,
          has_projects: true,
          has_downloads: true,
          has_wiki: true,
          has_pages: false,
          has_discussions: false,
          forks_count: 123,
          mirror_url: null,
          archived: false,
          disabled: false,
          open_issues_count: 1,
          license: {
            key: 'mit',
            name: 'MIT License',
            spdx_id: 'MIT',
            url: 'https://api.github.com/licenses/mit',
            node_id: 'MDc6TGljZW5zZTEz',
          },
          allow_forking: true,
          is_template: false,
          web_commit_signoff_required: false,
          topics: ['topic1', 'topic2'],
          visibility: 'public',
          forks: 123,
          open_issues: 1,
          watchers: 123,
          default_branch: 'main',
          score: 1,
        }),
      };

      jest
        .spyOn(userService, 'getTopRepositoriesByGoogle')
        .mockResolvedValue(mockRepositories);

      expect(await userController.getTopRepositoriesByGoogle()).toEqual(
        mockRepositories,
      );
    });

    it('should throw an error if fetching repositories fails', async () => {
      const errorMessage = 'Error fetching repositories';
      jest
        .spyOn(userService, 'getTopRepositoriesByGoogle')
        .mockRejectedValue(new Error(errorMessage));

      await expect(userController.getTopRepositoriesByGoogle()).rejects.toThrow(
        errorMessage,
      );
    });

    it('should call the getTopRepositoriesByGoogle method of the UserService', async () => {
      const mockRepositories: GithubApiResponse = {
        total_count: 10,
        incomplete_results: false,
        items: Array(10).fill({
          id: 1,
          node_id: 'MDEwOlJlcG9zaXRvcnkx',
          name: 'repo1',
          full_name: 'google/repo1',
          private: false,
          owner: {
            login: 'google',
            id: 1,
            node_id: 'MDQ6VXNlcjE=',
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/google',
            html_url: 'https://github.com/google',
            followers_url: 'https://api.github.com/users/google/followers',
            following_url:
              'https://api.github.com/users/google/following{/other_user}',
            gists_url: 'https://api.github.com/users/google/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/google/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/google/subscriptions',
            organizations_url: 'https://api.github.com/users/google/orgs',
            repos_url: 'https://api.github.com/users/google/repos',
            events_url: 'https://api.github.com/users/google/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/google/received_events',
            type: 'Organization',
            site_admin: false,
          },
          html_url: 'https://github.com/google/repo1',
          description: 'Repository 1',
          fork: false,
          url: 'https://api.github.com/repos/google/repo1',
          forks_url: 'https://api.github.com/repos/google/repo1/forks',
          keys_url: 'https://api.github.com/repos/google/repo1/keys{/key_id}',
          collaborators_url:
            'https://api.github.com/repos/google/repo1/collaborators{/collaborator}',
          teams_url: 'https://api.github.com/repos/google/repo1/teams',
          hooks_url: 'https://api.github.com/repos/google/repo1/hooks',
          issue_events_url:
            'https://api.github.com/repos/google/repo1/issues/events{/number}',
          events_url: 'https://api.github.com/repos/google/repo1/events',
          assignees_url:
            'https://api.github.com/repos/google/repo1/assignees{/user}',
          branches_url:
            'https://api.github.com/repos/google/repo1/branches{/branch}',
          tags_url: 'https://api.github.com/repos/google/repo1/tags',
          blobs_url:
            'https://api.github.com/repos/google/repo1/git/blobs{/sha}',
          git_tags_url:
            'https://api.github.com/repos/google/repo1/git/tags{/sha}',
          git_refs_url:
            'https://api.github.com/repos/google/repo1/git/refs{/sha}',
          trees_url:
            'https://api.github.com/repos/google/repo1/git/trees{/sha}',
          statuses_url:
            'https://api.github.com/repos/google/repo1/statuses/{sha}',
          languages_url: 'https://api.github.com/repos/google/repo1/languages',
          stargazers_url:
            'https://api.github.com/repos/google/repo1/stargazers',
          contributors_url:
            'https://api.github.com/repos/google/repo1/contributors',
          subscribers_url:
            'https://api.github.com/repos/google/repo1/subscribers',
          subscription_url:
            'https://api.github.com/repos/google/repo1/subscription',
          commits_url:
            'https://api.github.com/repos/google/repo1/commits{/sha}',
          git_commits_url:
            'https://api.github.com/repos/google/repo1/git/commits{/sha}',
          comments_url:
            'https://api.github.com/repos/google/repo1/comments{/number}',
          issue_comment_url:
            'https://api.github.com/repos/google/repo1/issues/comments{/number}',
          contents_url:
            'https://api.github.com/repos/google/repo1/contents/{+path}',
          compare_url:
            'https://api.github.com/repos/google/repo1/compare/{base}...{head}',
          merges_url: 'https://api.github.com/repos/google/repo1/merges',
          archive_url:
            'https://api.github.com/repos/google/repo1/{archive_format}{/ref}',
          downloads_url: 'https://api.github.com/repos/google/repo1/downloads',
          issues_url:
            'https://api.github.com/repos/google/repo1/issues{/number}',
          pulls_url: 'https://api.github.com/repos/google/repo1/pulls{/number}',
          milestones_url:
            'https://api.github.com/repos/google/repo1/milestones{/number}',
          notifications_url:
            'https://api.github.com/repos/google/repo1/notifications{?since,all,participating}',
          labels_url: 'https://api.github.com/repos/google/repo1/labels{/name}',
          releases_url:
            'https://api.github.com/repos/google/repo1/releases{/id}',
          deployments_url:
            'https://api.github.com/repos/google/repo1/deployments',
          created_at: '2020-01-01T00:00:00Z',
          updated_at: '2024-05-31T00:00:00Z',
          pushed_at: '2024-05-31T00:00:00Z',
          git_url: 'git://github.com/google/repo1.git',
          ssh_url: 'git@github.com:google/repo1.git',
          clone_url: 'https://github.com/google/repo1.git',
          svn_url: 'https://github.com/google/repo1',
          homepage: 'https://google.com',
          size: 123,
          stargazers_count: 123,
          watchers_count: 123,
          language: 'JavaScript',
          has_issues: true,
          has_projects: true,
          has_downloads: true,
          has_wiki: true,
          has_pages: false,
          has_discussions: false,
          forks_count: 123,
          mirror_url: null,
          archived: false,
          disabled: false,
          open_issues_count: 1,
          license: {
            key: 'mit',
            name: 'MIT License',
            spdx_id: 'MIT',
            url: 'https://api.github.com/licenses/mit',
            node_id: 'MDc6TGljZW5zZTEz',
          },
          allow_forking: true,
          is_template: false,
          web_commit_signoff_required: false,
          topics: ['topic1', 'topic2'],
          visibility: 'public',
          forks: 123,
          open_issues: 1,
          watchers: 123,
          default_branch: 'main',
          score: 1,
        }),
      };
      jest
        .spyOn(userService, 'getTopRepositoriesByGoogle')
        .mockResolvedValue(mockRepositories);

      await userController.getTopRepositoriesByGoogle();
      expect(userService.getTopRepositoriesByGoogle).toHaveBeenCalledTimes(1);
    });
  });
});
