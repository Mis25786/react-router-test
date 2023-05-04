import { Link, Outlet, useParams } from 'react-router-dom';

const DogDetails = () => {
  const { dogId } = useParams();

  // useEffect(() => {
  //   HTTP zapros jaksho treba
  // }, [])

  return (
    <>
      <h1>Details: {dogId} </h1>
      <ul>
        <li>
          <Link to="subbreeds">Poroda</Link>
        </li>
        <li>
          <Link to="gallery">Galeri</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default DogDetails;
