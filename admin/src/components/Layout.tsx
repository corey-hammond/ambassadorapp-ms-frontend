import { Dispatch, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Menu from './Menu';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);
  const { setUser } = props;

  useEffect(() => {
    // try to fetch the user, if unsuccessful then redirect to login
    (async () => {
      try {
        const { data } = await axios.get('user');

        setUser(data);
      } catch (e) {
        setRedirect(true);
      }
    })();
  }, [setUser]);

  if (redirect) {
    return <Navigate to={'/login'} />;
  }
  return (
    <div>
      <Nav />

      <div className='container-fluid'>
        <div className='row'>
          <Menu />

          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <div className='table-responsive'>{props.children}</div>
          </main>
        </div>
      </div>
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
