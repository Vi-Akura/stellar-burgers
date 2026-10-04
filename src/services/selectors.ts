

export const userDataSelector = (state: any) => state.user?.user;

export const isAuthCheckedSelector = (state: any) => state.user?.isAuthChecked ?? true;
