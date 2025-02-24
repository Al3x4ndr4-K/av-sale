import { ConfigProvider } from 'antd';

export const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: '#fff',
            colorPrimaryHover: '#fff',
            borderRadiusSM: 2,
            colorText: '#4A4A4A',
            colorBorder: '#9ABBCE',
            colorWhite: '#2196F3',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
