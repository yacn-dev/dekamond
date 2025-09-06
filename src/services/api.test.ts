import { userService } from './api';

export async function testApiService() {
  try {
    console.log('Testing API service...');
    const user = await userService.getRandomUser();
    console.log('API test successful:', user);
    return true;
  } catch (error) {
    console.error('API test failed:', error);
    return false;
  }
}