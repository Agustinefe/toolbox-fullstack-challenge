import { useContext } from 'react';
import { FilesContext } from '../context';

export const useFileContext = () => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FilesProvider');
  }
  return context;
};
