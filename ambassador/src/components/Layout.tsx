import { useEffect, Dispatch } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Header from './Header';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';
import { useLocation } from 'react-router-dom';

const Layout = (props: any) => {
  const location = useLocation();
  const { setUser } = props;

  useEffect(() => {
    // try to fetch the user, if unsuccessful then redirect to login
    (async () => {
      try {
        const { data } = await axios.get('user');

        setUser(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [setUser]);

  let header;
  if (location.pathname === '/' || location.pathname === '/backend') {
    header = <Header />;
  }

  return (
    <div>
      <Nav />
      {header}
      <main>
        <div className='album py-5 bg-light'>
          <div className='container'>{props.children}</div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
