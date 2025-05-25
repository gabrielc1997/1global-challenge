import authReducer, { loginSuccess, logout } from '../authSlice';

describe('authSlice reducer logic', () => {
  it('should return the initial state', () => {
    const initialState = { user: null };
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle loginSuccess', () => {
    const user = {
      id: '1',
      name: 'Gabriel Carvalho',
    email: 'gabriel@1global.com',
      token: 'jwt-token',
    };

    const expectedState = {
      user,
    };

    expect(authReducer(undefined, loginSuccess(user))).toEqual(expectedState);
  });

  it('should handle logout', () => {
    const currentState = {
      user: {
        id: '1',
        name: 'Gabriel Carvalho',
        email: 'gabriel@1global.com',
        token: 'jwt-token',
      },
    };

    const expectedState = {
      user: null,
    };

    expect(authReducer(currentState, logout())).toEqual(expectedState);
  });
});