export default function selectStoreSuccess(store) {
  return {
    type: '@store/SELECT_STORE_SUCCESS',
    payload: store,
  };
}
