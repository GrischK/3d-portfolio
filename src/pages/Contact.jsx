import { Suspense, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader.jsx';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
import Husky2 from '../models/Husky2.jsx';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('Idle_2_HeadLow');
  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = () => {
    setCurrentAnimation('Walk');
  };
  const handleBlur = () => {
    setCurrentAnimation('Idle_2_HeadLow');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('Gallop');

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE,
        {
          from_name: form.name,
          to_name: 'Grisch',
          from_email: form.email,
          to_email: 'contact@dev.com',
          message: form.message
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        showAlert({ show: true, text: 'Message send succesfully', type: 'success' });
        setTimeout(() => {
          hideAlert();
          setCurrentAnimation('Idle_2_HeadLow');
          setForm({ name: '', email: '', message: '' });
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setCurrentAnimation('idle');
        console.log(error);
        showAlert({ show: true, text: `I didn't receive your message`, type: 'danger' });
      });
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in <span className="blue-gradient_text font-semibold drop-shadow">touch</span></h1>
        <form
          ref={formRef}
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold text-lg">
            Name
            <input
              type="text"
              name="name"
              className="input"
              required
              placeholder="John"
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold text-lg">
            Email
            <input
              type="text"
              name="email"
              className="input"
              required
              placeholder="john@gmail.com"
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold text-lg">
            Message
            <textarea
              name="message"
              rows="4"
              className="textarea"
              required
              placeholder="Let me know how I can help you!"
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isLoading}
          >
            {isLoading ? 'Sending' : 'Send Message'}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight
            intensity={2.5}
            position={[0, 0, 1]}
          />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Husky2
              currentAnimation={currentAnimation}
              position={[0.5, -2, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={1}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
