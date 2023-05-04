import { useParams } from 'react-router-dom';

const Gallery = () => {
  const { dogId } = useParams();

  // useEffect(() => {
  //   HTTP zapros jaksho treba
  // }, [])

  return <div>Image gallery: {dogId} </div>;
};

export default Gallery;
