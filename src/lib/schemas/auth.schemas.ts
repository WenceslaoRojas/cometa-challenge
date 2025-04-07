import { z } from 'zod';

export const SIGN_IN_SCHEMA = z.object({
    email: z
        .string()
        .email('Invalid email')
        .nonempty('Required')
        .transform((v) => v.trim().toLocaleLowerCase()),
    password: z
        .string()
        .min(6, 'Min 6 characters')
        .max(20, 'Max 20 characters')
        .nonempty('Required')
        .regex(/^(?=.*[!@#$%^&*])/, 'At least one symbol')
        .regex(/^(?=.*[A-Z])/, 'At least one uppercase letter')
        .regex(/^(?=.*[a-z])/, 'At least one lowercase letter')
        .regex(/^(?=.*[0-9])/, 'At least one number')
        .transform((v) => v.trim())
});

export const SIGN_UP_SCHEMA = z.object({
    name: z
        .string()
        .nonempty('Required')
        .transform((v) => v.trim()),
    email: z
        .string()
        .email('Invalid email')
        .nonempty('Required')
        .transform((v) => v.trim().toLocaleLowerCase()),
    password: z
        .string()
        .min(6, 'Min 6 characters')
        .max(20, 'Max 20 characters')
        .nonempty('Required')
        .regex(/^(?=.*[!@#$%^&*])/, 'At least one symbol')
        .regex(/^(?=.*[A-Z])/, 'At least one uppercase letter')
        .regex(/^(?=.*[a-z])/, 'At least one lowercase letter')
        .regex(/^(?=.*[0-9])/, 'At least one number')
        .transform((v) => v.trim()),
    profileImage: z
        .instanceof(File, { message: 'Profile Image is required' })
        .refine((file) => file.size > 0, {
            message: 'Profile image is required'
        })
        .refine((file) => ['image/png', 'image/jpeg', 'image/jpg', 'image/webpp'].includes(file.type), {
            message: 'Invalid image file type'
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'Image must be less than 5MB'
        })
});

export const ADD_ADDRESS_SCHEMA = z.object({
    phone: z
        .string()
        .nonempty('Required')
        .regex(/^\d+$/, 'Only numbers')
        .min(10, 'Min 10 characters')
        .max(15, 'Max 15 characters')
        .transform((v) => v.trim()),
    address: z
        .string()
        .nonempty('Required')
        .transform((v) => v.trim()),
    numberHouse: z
        .string()
        .nonempty('Required')
        .regex(/^\d+$/, 'Only numbers')
        .min(1, 'Min 1 characters')
        .max(5, 'Max 5 characters')
        .transform((v) => v.trim()),
    city: z
        .string()
        .nonempty('Required')
        .transform((v) => v.trim())
});
