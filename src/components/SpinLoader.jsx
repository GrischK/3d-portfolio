import { Html } from '@react-three/drei';

const SpinLoader = ({ bg, textColor }) => {
  return (
    <Html fullscreen>
      <div className={`w-full h-full ${bg ? `bg-[${bg}]` : 'bg-[#171720]'} flex justify-center items-center flex-col`}>
        <div
          className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-white rounded-full animate-spin"
        />
        <span className={`${textColor ? `text-[${textColor}]` : 'text-[white]'} `}>
        Loading
        </span>
      </div>
    </Html>
  );
};

export default SpinLoader;
