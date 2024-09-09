import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authenticator>{({ signOut }) => <App signOut={signOut} />}</Authenticator>
  </React.StrictMode>
);
