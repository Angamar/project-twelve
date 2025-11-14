import { Request, Response } from 'express';
import { CreateUserSchema, UserSchema } from '@your-app/shared';
import { createUser, getUsers, getUserById } from './userController.helpers';

export const userController = {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await getUsers();
      res.json({ data: users, success: true });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const parsed = CreateUserSchema.safeParse(req.body);
      
      if (!parsed.success) {
        res.status(400).json({ 
          success: false, 
          message: 'Invalid request body',
          errors: parsed.error.issues
        });
        return;
      }

      const user = await createUser(parsed.data);
      res.status(201).json({ data: user, success: true });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ success: false, message: 'Failed to create user' });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      res.json({ data: user, success: true });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch user' });
    }
  },
};