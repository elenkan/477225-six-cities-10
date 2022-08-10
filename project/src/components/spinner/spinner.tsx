const Spinner = () => {
  const spinnerStyle: { [propertyName: string]: string } = {
    position: 'absolute',
    backgroundColor: 'rgba(220, 233, 248, 0.5)',
    zIndex: '10',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    textAlign: 'center',
    paddingTop: '50px'
  };
  return (
    <div style={spinnerStyle}>
      Данные загружаются...
    </div>
  );
};

export default Spinner;
