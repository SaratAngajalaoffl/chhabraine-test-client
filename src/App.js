import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from './components/Snackbar';
import { AuthProvider } from './components/Auth';
import MainComponent from './components/MainComponent';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<SnackbarProvider>
					<div className='App'>
						<MainComponent />
					</div>
				</SnackbarProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
