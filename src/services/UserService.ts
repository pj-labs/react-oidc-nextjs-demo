import { User } from '@/User';
import { FetchClient } from '@/FetchClient';

/**
 * Utility class for User operations
 *
 * @author Pavan Kumar Jadda
 * @since 0.1.0
 */
export class UserService {
	/**
	 * Get user information
	 *
	 * @author Pavan Kumar Jadda
	 * @since 0.1.0
	 */
	static async getUserInformation(): Promise<User> {
		return await FetchClient(`/api/v1/user/home`).then((res) => res?.json());
	}
}
