import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import App from './App.jsx';
import './styles/index.scss';
import { theme } from './utils/constants.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
				<ToastContainer></ToastContainer>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
