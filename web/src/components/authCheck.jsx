'use client';

import { useAuth } from '@libs/userAuth';

export default function AuthCheck() {
  useAuth();
}
