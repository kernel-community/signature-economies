import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'wagmi';
import {connectors, provider, connectorStorageKey} from './web3/connect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider
      connectors={connectors}
      provider={provider}
      connectorStorageKey={connectorStorageKey}>
        <App />
    </Provider>
  </React.StrictMode>
);

