import { FilesProvider } from './features/files/context';
import HomeScreen from './screens/Home.screen';
import { ToastProvider } from './shared/components/toast/provider';

export default function App() {
  return (
    <ToastProvider>
      <FilesProvider>
        <HomeScreen />
      </FilesProvider>
    </ToastProvider>
  );
}
