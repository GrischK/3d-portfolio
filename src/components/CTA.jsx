import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="cta">
      <p className="cta-text">
        Have a project in mind?&nbsp;
        <br className="sm:block hidden" />
        Let's something together!
      </p>
      <Link
        to={'/contact'}
        className="btn"
      >
        Contact
      </Link>
    </section>
  );
};

export default CTA;