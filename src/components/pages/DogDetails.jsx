import { Suspense, useRef } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';

const DogDetails = () => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/dogs');
  const { dogId } = useParams();

  // useEffect(() => {
  //   HTTP zapros jaksho treba
  // }, [])

  return (
    <>
      <h1>Details: {dogId} </h1>
      <Link to={backLinkLocationRef.current}>Back</Link>
      <ul>
        <li>
          <Link to="subbreeds">Poroda</Link>
        </li>
        <li>
          <Link to="gallery">Galeri</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      ;
    </>
  );
};

export default DogDetails;
