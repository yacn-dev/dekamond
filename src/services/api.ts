import { User } from '@/types';

class BaseApiService {
  protected async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`https://randomuser.me/api${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

class UserService extends BaseApiService {
  async getRandomUser(): Promise<User> {
    try {
      const data = await this.get<{ results: User[] }>('/?results=1&nat=us');
      
      if (!data.results || data.results.length === 0) {
        throw new Error('No user data received');
      }

      return data.results[0];
    } catch (error) {
      console.error('UserService error:', error);
      throw new Error('Failed to fetch user data');
    }
  }
}

class AuthService extends BaseApiService {
  async login(phone: string): Promise<User> {
    try {
      const userService = new UserService();
      const user = await userService.getRandomUser();
      
      return user;
    } catch (error) {
      console.error('AuthService error:', error);
      throw new Error('Login failed');
    }
  }
}

export const authService = new AuthService();
export const userService = new UserService();

export interface IAuthService {
  login(phone: string): Promise<User>;
}

export interface IUserService {
  getRandomUser(): Promise<User>;
}