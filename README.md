This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deployment

To deploy your application to Firebase, follow these steps:

1. **Login to Firebase**

   If you haven't already, log in to your Firebase account:

   ```
   firebase login
   ```

   This command will open a browser window for you to authenticate with your Google account associated with Firebase.

2. **Initialize Firebase in your project**

   If you haven't initialized Firebase in your project yet, run:

   ```
   firebase init
   ```

   This command will guide you through the setup process:

   - Select the Firebase features you want to use (Hosting, Firestore, etc.)
   - Choose an existing Firebase project or create a new one
   - Set up your public directory (usually "build" for React apps or "out" for Next.js)
   - Configure as a single-page app if applicable
   - Set up automatic builds and deploys with GitHub (optional)

3. **Build your application**

   Before deploying, make sure to build your application:

   ```
   npm run build
   ```

   This command will create a production-ready build of your application.

4. **Deploy to Firebase**

   Once your app is built, deploy it to Firebase:

   ```
   firebase deploy
   ```

   This command will upload your application files and deploy your Firebase configuration (Firestore rules, Firebase Functions, etc.) to your Firebase project.

After successful deployment, Firebase will provide you with a hosted URL where your application is live.

Note: Make sure your `.firebaserc` file is correctly configured with your Firebase project ID. If you're using multiple environments (development, staging, production), you can use Firebase targets to manage different deployments.

For more detailed information about deploying to Firebase, refer to the [Firebase Hosting documentation](https://firebase.google.com/docs/hosting).
