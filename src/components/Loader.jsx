import { Puff } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <Puff
        height='100'
        width='100'
        margin='auto'
        color='black'
        secondaryColor='#eee'
        radius='15'
        ariaLabel='mutating-dots-loading'
        wrapperStyle={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        wrapperClass=''
        visible={true}
      />
    </>
  );
};

export default Loader;
