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
  const params = new URLSearchParams(window.location.search);

  const fileName = params.get('fileName');

  const {
    data: files = [],
    error,
    loading,
    reload,
  } = useApiFetch(ENDPOINTS.FILES.DATA, {
    searchParams: { fileName },
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
