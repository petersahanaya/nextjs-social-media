declare module 'next-auth/client' {
    export interface Session {
      user :  {
        name : string | undefined,
        email : string | undefined,
        image : string | undefined,
        id : string | undefined
      }
    }
  }