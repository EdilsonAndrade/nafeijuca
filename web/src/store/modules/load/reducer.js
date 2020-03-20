const INITIAL_DATA = {
  loading: false,
};

export default function load(state = INITIAL_DATA, action) {
  switch (action.type) {
    case '@load/START':
      return { state, loading: true };
    case '@load/STOP':
      return { state, loading: false };
    default:
      return state;
  }
}
