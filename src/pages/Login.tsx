import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // In a real app, this would make an API call
      const mockUsers = {
        'owner@example.com': {
          id: '1',
          name: 'John Owner',
          role: 'owner' as const,
          email: 'owner@example.com',
        },
        'manager@example.com': {
          id: '2',
          name: 'Jane Manager',
          role: 'manager' as const,
          email: 'manager@example.com',
          hotelId: '1',
        },
        'accountant@example.com': {
          id: '3',
          name: 'Bob Accountant',
          role: 'accountant' as const,
          email: 'accountant@example.com',
        },
      };

      const user = mockUsers[values.email as keyof typeof mockUsers];
      
      if (user && values.password === 'password') {
        login(user, 'mock-token');
        navigate('/');
      } else {
        form.setError('root', {
          message: 'Invalid email or password',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      form.setError('root', {
        message: 'An error occurred during login',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-red-500">
                  {form.formState.errors.root.message}
                </p>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Demo Accounts:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Owner: owner@example.com</li>
              <li>Manager: manager@example.com</li>
              <li>Accountant: accountant@example.com</li>
              <li>Password: password (for all accounts)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;