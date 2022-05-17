import { LOGIN, PASSWORD } from '../constants';

export default ({ login: formLogin, password: formPassword }) => {
  if (formLogin !== LOGIN && formPassword !== PASSWORD)
    return 'Please provide correct login and password';

  if (formLogin !== LOGIN) return 'Please provide correct login!';

  if (formPassword !== PASSWORD) return 'Please provide correct password!';
};
