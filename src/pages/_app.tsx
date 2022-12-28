interface AppProps {
  children?: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  return <div>{children}</div>;
};

export default App;
