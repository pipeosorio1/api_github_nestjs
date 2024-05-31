import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GithubApiResponse } from './interfaces/github-repository.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves the top repositories from Google.
   *
   * @returns {Promise<GithubApiResponse>} A promise that resolves to an array of top repositories.
   * @throws {Error} If there is an error fetching the repositories.
   *
   * @remarks
   * This method interacts with the Google API to fetch the top repositories.
   * The returned array contains objects with repository details such as name, owner, and description.
   */
  @Get('top-repositories-google')
  getTopRepositoriesByGoogle(): Promise<GithubApiResponse> {
    return this.userService.getTopRepositoriesByGoogle();
  }
}
