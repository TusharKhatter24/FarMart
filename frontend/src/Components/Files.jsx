import { useSelector } from 'react-redux';

const Files = () => {

  const isLoggedIn = useSelector((state) => state?.login?.isLoggedIn);

  return (
    <>
      {isLoggedIn ?
        <div>
          <h2>Files Page</h2>
        </div>
        :
        <div>Please Login / Register</div>
      }
    </>
  );
}

export default Files;
