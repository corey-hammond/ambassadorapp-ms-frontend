import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../models/user';

const Header = (props: { user: User }) => {
  const [title, setTitle] = useState('Welcome');
  const [description, setDescription] = useState('Share links to earn money');
  const { user } = props;

  useEffect(() => {
    if (user?.id) {
      setTitle(`$${user.revenue}`);
      setDescription('...earned so far');
    } else {
      setTitle('Welcome');
      setDescription('Share links to earn money');
    }
  }, [user]);

  let buttons;
  if (!user?.id) {
    buttons = (
      <p>
        <Link to={'/login'} className='btn btn-primary my-2'>
          Login
        </Link>
        <Link to={'/register'} className='btn btn-secondary my-2'>
          Register
        </Link>
      </p>
    );
  }

  return (
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-6 col-md-8 mx-auto'>
          <h1 className='fw-light'>{title}</h1>
          <p className='lead text-muted'>{description}</p>
          {buttons}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Header);
