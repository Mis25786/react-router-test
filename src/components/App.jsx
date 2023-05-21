import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './Layout';
// import Dogs from './pages/Dogs';
// import Home from './pages/Home';
// import DogDetails from './pages/DogDetails';
// import Gallery from './Gallery';
// import Subbreeds from './Subbreeds';

const Dogs = lazy(() => import('./pages/Dogs'));
const Home = lazy(() => import('./pages/Home'));
const DogDetails = lazy(() => import('./pages/DogDetails'));
const Gallery = lazy(() => import('./Gallery'));
const Subbreeds = lazy(() => import('./Subbreeds'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/dogs/:dogId" element={<DogDetails />}>
          <Route path="subbreeds" element={<Subbreeds />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Route>
    </Routes>
  );
};
