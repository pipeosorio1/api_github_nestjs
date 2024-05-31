import { AxiosAdapter } from '@common/adapters/axios.adapter';
import { Keys } from '@common/enums/keys.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Github } from './enums/github.enum';
import { GithubApiResponse } from './interfaces/github-repository.interface';
import { GithubQueryParams } from './interfaces/github-query-params.interface';
import { GithubRequestHeaders } from './interfaces/github-request-headers.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly axiosAdapter: AxiosAdapter,
  ) {}

  /**
   * Retrieves the top 10 repositories of the user google sorted by stars in descending order.
   *
   * @returns {Promise<GithubApiResponse>} A promise that resolves to the API response containing the top repositories.
   */
  async getTopRepositoriesByGoogle(): Promise<GithubApiResponse> {
    const urlGithub = this.configService.get<string>(Keys.URL_GITHUB);
    const githubAccessToken = this.configService.get<string>(
      Keys.GITHUB_ACCESS_TOKEN,
    );
    const userGit = Github.userGit;
    const baseUrl = urlGithub + Github.repositories;

    const headers: GithubRequestHeaders = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (githubAccessToken) {
      headers.Authorization = `token ${githubAccessToken}`;
    }

    const params: GithubQueryParams = {
      q: `user:${userGit}`,
      sort: 'stars',
      order: 'desc',
      per_page: 10,
    };

    return await this.axiosAdapter.get(baseUrl, headers, params);
  }
}
