import { FilesProvider } from './features/files/context';
import HomeScreen from './screens/Home.screen';

export default function App() {
  return (
    <FilesProvider>
      <HomeScreen />
    </FilesProvider>
  );
}
