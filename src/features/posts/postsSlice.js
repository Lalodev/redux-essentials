import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'; /*nanoid,*/
import { client } from '../../api/client';
//import { sub } from 'date-fns';

/*const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post!',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];*/

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

/*const initialState = {
  items: [],
  status: 'idle', // | 'loading' | 'succeeded' | 'failed',
  error: null, // string
};*/

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', initialPost);
    // The response includes the complete post object, including unique ID
    return response.data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    /*postAdded: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(title, content, idUser) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: idUser,
          },
        };
      },
    },*/
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      //const existingPost = state.items.find((post) => post.id === id);
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { idPost, reaction } = action.payload;
      //const existingPost = state.items.find((post) => post.id === idPost);
      const existingPost = state.entities[idPost];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    /*postAdded(state, action) {
      state.push(action.payload);
    },*/
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload);
        //state.items = state.items.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.items.push(action.payload);
      });
  },
});

export const { postUpdated, reactionAdded } = postsSlice.actions; //postAdded

//Selectors
//export const selectAllPosts = (state) => state.posts.items;
/*export const selectPostById = (state, idPost) =>
  state.posts.items.find((post) => post.id === idPost);*/

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts); //************* items */

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, idUser) => idUser],
  (posts, idUser) => posts.filter((post) => post.user === idUser)
);

export default postsSlice.reducer;
