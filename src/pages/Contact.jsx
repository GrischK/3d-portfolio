import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = (e) => {};
  const handleBlur = (e) => {};

  console.log(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
  console.log(import.meta.env.VITE_APP_EMAILJS_SERVICE);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(import.meta.env.APP_EMAILJS_PUBLIC_KEY);
    console.log(import.meta.env.APP_EMAILJS_SERVICE);

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
        setForm({ name: '', email: '', message: '' });
      });
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>
        <form
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
    </section>
  );
};

export default Contact;
