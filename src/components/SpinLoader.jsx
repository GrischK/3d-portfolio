import { Html } from '@react-three/drei';

const SpinLoader = () => {
  return (
    <Html fullscreen>
      <div className="w-[100vw] h-[100vh] bg-[#171720] flex justify-center items-center">
        <div className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-white rounded-full animate-spin" />
      </div>
    </Html>
  );
};

export default SpinLoader;
