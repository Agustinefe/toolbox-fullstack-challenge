import { render, screen, within } from '@testing-library/react';
import App from './App';
import { useApiFetch } from './shared/hooks/useApiFetch';

jest.mock('./shared/hooks/useApiFetch', () => ({
  useApiFetch: jest.fn(),
}));



describe('App', () => {
  const mockFiles = ['file1.csv', 'file2.csv', 'file4.csv'];
  const mockFileData = [
    {
      file: 'file1.csv',
      lines: [],
    },
    {
      file: 'file2.csv',
      lines: [
        {
          text: 'CQVLtyBLaOmJGFxk',
          number: 3,
          hex: 'eb8c464cb565cb9d0e2f2fd3348293f9',
        },
      ],
    },
    {
      file: 'file4.csv',
      lines: [
        {
          text: 'jeOIQGLNTgJIlIXbbqNdg',
          number: 531696319,
          hex: 'd2971a3b8ecbe3b56473f40bfe2e4aac',
        },
        {
          text: 'sdnasjhkdnajksdnsajd',
          number: 1234567890,
          hex: '00000000000000000000000000000000',
        },
      ],
    },
  ];

  const mockUseApiFetchBuilder = ({fileList = {data: [], loading: false, error: null}, fileData = {data: [], loading: false, error: null}}) => (endpoint) => {
    if (endpoint === '/files/list') {
      return {
        ...fileList,
        data: [{ value: '', label: 'All the files' }].concat(
          fileList.data.map((file) => ({ value: file, label: file }))
        ),
        reload: jest.fn(),
      };
    }
    if (endpoint === '/files/data') {
      return {
        ...fileData,
        data: fileData.data.reduce((acc, file) => {
          acc.push(
            ...file.lines.map((line) => ({ ...line, fileName: file.file }))
          );
          return acc;
        }, []),
        reload: jest.fn(),
      };
    }
    return {
      data: null,
      loading: false,
      error: null,
      reload: jest.fn(),
    };
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    jest.mocked(useApiFetch).mockImplementation(mockUseApiFetchBuilder({}));
    render(<App />);
  });

  it('should render the placeholder text when the file list is loading', async () => {
    jest.mocked(useApiFetch).mockImplementation(mockUseApiFetchBuilder({fileList: {
      data: [],
      loading: true,
      error: null,
    }, fileData: {
      data: [],
      loading: false,
      error: null,
    }}));
    render(<App />);
    expect(await screen.findByTestId('loading-file-list')).toBeInTheDocument();
  });

  it('should render the file list in the select after loading', async () => {
    jest.mocked(useApiFetch).mockImplementation(mockUseApiFetchBuilder({fileList: {
      data: mockFiles,
      loading: false,
      error: null,
    }, fileData: {
      data: [],
      loading: false,
      error: null,
    }}));
    render(<App />);

    await screen.findByRole('combobox', {
      name: /filename select/i,
    });

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent('All the files');
    expect(options[1]).toHaveTextContent('file1.csv');
    expect(options[2]).toHaveTextContent('file2.csv');
    expect(options[3]).toHaveTextContent('file4.csv');

    expect(options[0]).toHaveValue('');
    expect(options[1]).toHaveValue('file1.csv');
    expect(options[2]).toHaveValue('file2.csv');
    expect(options[3]).toHaveValue('file4.csv');
  });

  it('should disable the select when the file list is loading and there is an error', async () => {
    jest.mocked(useApiFetch).mockImplementation(mockUseApiFetchBuilder({fileList: {
      data: [],
      loading: false,
      error: {status: 500, message: 'Error loading file list'},
    }, fileData: {
      data: [],
      loading: false,
      error: null,
    }}));
    render(<App />);
    const select = screen.getByRole('combobox', {
      name: /filename select/i,
    });
    expect(select).toBeDisabled();
  });

  it('should render the placeholder text when the file content for table is loading', async () => {
    jest.mocked(useApiFetch).mockImplementation(mockUseApiFetchBuilder({fileList: {
      data: [],
      loading: false,
      error: null,
    }, fileData: {
      data: [],
      loading: true,
      error: null,
    }}));
    render(<App />);
    expect(await screen.findByTestId('loading-file-data')).toBeInTheDocument();
  });

  it('should render the table content after loading', async () => {
    jest.mocked(useApiFetch).mockImplementation(mockUseApiFetchBuilder({fileList: {
      data: [],
      loading: false,
      error: null,
    }, fileData: {
      data: mockFileData,
      loading: false,
      error: null,
    }}));
    render(<App />);

    const table = await screen.findByRole('table');
    const tableContent = within(table);

    expect(tableContent.queryByText('file1.csv')).not.toBeInTheDocument(); // Because it doesn't have any data
    expect(tableContent.getByText('file2.csv')).toBeInTheDocument();
    const file4Rows = tableContent.getAllByText('file4.csv');
    file4Rows.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

});