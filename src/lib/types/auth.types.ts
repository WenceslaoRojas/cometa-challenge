import { SIGN_IN_SCHEMA, SIGN_UP_SCHEMA } from '../schemas/auth.schemas';
import { z } from 'zod';

export type SIGN_IN = z.infer<typeof SIGN_IN_SCHEMA>;
export type SignUp = z.infer<typeof SIGN_UP_SCHEMA>;

export interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}
