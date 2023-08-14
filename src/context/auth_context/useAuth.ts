const {useContext} = require('react');
const {AuthContext} = require('./AuthContext');

export const useAuth = () => {
  return useContext(AuthContext);
};
