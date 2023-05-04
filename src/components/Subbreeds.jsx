import { useParams } from 'react-router-dom';
const Subbreeds = () => {
  const { dogId } = useParams();

  // useEffect(() => {
  //   HTTP zapros jaksho treba
  // }, [])

  return <div>Subbreeds: {dogId} </div>;
};

export default Subbreeds;
