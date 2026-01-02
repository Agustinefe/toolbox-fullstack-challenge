import { ENDPOINTS } from '../../shared/services/endpoints';
import { useApiFetch } from '../../shared/hooks/useApiFetch';
import { createContext } from 'react';

export const FilesContext = createContext({
  fileData: {
    data: [],
    loading: false,
    error: null,
  },
  fileList: {
    value: '',
    onChange: () => {},
    data: [],
    loading: false,
    error: null,
  },
});

export const FilesProvider = ({ children }) => {
  const params = new URLSearchParams(window.location.search);

  const fileName = params.get('fileName') ?? '';

  const fileData = useApiFetch(ENDPOINTS.FILES.DATA, {
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

  const fileList = useApiFetch(ENDPOINTS.FILES.LIST, {
    parseResponse: (data) =>
      [{ value: '', label: 'All the files' }].concat(
        data.files.map((file) => ({ value: file, label: file }))
      ),
  });

  const onChangeFileName = (filename) => {
    const params = new URLSearchParams(window.location.search);

    if (filename === '') {
      params.delete('fileName');
    } else {
      params.set('fileName', filename);
    }

    window.location.search = `?${params.toString()}`;
  };

  return (
    <FilesContext.Provider
      value={{
        fileData,
        fileList: {
          ...fileList,
          value: fileName,
          onChange: (e) => onChangeFileName(e.target.value),
        },
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
