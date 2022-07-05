import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { client } from '../../api/client';

/*const initialState = [
{ id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
];*/
//const initialState = [];

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    /*builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });*/
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});

//Selectors
//export const selectAllUsers = (state) => state.users;
/*export const selectUserById = (state, idUser) =>
  state.users.find((user) => user.id === idUser);*/

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
