import { createMiddleware } from '@tanstack/react-start'
import { auth } from './firebase'
import { getIdToken } from "firebase/auth";

export const attachFirebaseAuth = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    let token = undefined;
    if (auth.currentUser) {
      token = await getIdToken(auth.currentUser);
    }
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  },
)
