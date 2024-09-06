import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import Loader from "../Components/Loader.jsx";

// <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
//   Home Pop-Up
// </div>

const Home = () => {
  return (
    <section className="w-full h-screen relative">
      <p>Home</p>
      <Canvas className="w-full h-screen bg-transparent"
              camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader/>}>
          <directionalLight/>
          <ambientLight/>
          <pointLight/>
          <spotLight/>
          <hemisphereLight/>
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home;