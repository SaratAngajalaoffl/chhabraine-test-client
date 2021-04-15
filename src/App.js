import './App.css';
import { SnackbarProvider } from './components/Snackbar';
import { AuthProvider } from './components/Auth';
import MainComponent from './components/MainComponent';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				HOLA
				<AuthProvider>
					<SnackbarProvider>
						<MainComponent />
					</SnackbarProvider>
				</AuthProvider>
			</header>
		</div>
	);
}

export default App;
