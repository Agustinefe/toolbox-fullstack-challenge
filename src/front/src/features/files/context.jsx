import { ENDPOINTS } from '../../shared/services/endpoints';
import { useApiFetch } from '../../shared/hooks/useApiFetch';
import { createContext } from 'react';

export const FilesContext = createContext({
  files: [],
  loading: false,
  error: null,
  reload: () => {},
});

export const FilesProvider = ({ children }) => {
  const {
    data: files = [],
    error,
    loading,
    reload,
  } = useApiFetch(ENDPOINTS.FILES.DATA, {
    parseResponse: (data) => {
      return data.reduce((acc, file) => {
        acc.push(
          ...file.lines.map((line) => ({ ...line, fileName: file.file }))
        );
        return acc;
      }, []);
    },
  });

  return (
    <FilesContext.Provider value={{ files, loading, error, reload }}>
      {children}
    </FilesContext.Provider>
  );
};
