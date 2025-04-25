import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
/**
 * Service responsible for handling posts logic.
 */
@Injectable()
export class PostsService {
  /**
   * Connects the UsersService to the PostsService via dependency injection.
   */
  constructor(private readonly usersService: UsersService) {}
  /**
   * Fetches all posts that belong to a user by Id.
   */
  public findAll(userId: string) {
    // Users Service
    const user = this.usersService.findOneById(userId);
    // Find a User
    // Return posts
    return [
      {
        user: user,
        title: 'Post title',
        content: 'Test content',
      },
      {
        user: user,
        title: 'Post title 2',
        content: 'Test content 2',
      },
    ];
  }
}
