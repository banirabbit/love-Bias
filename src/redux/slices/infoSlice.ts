import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfoSliceState {
    data: number
}

const initialState: InfoSliceState = {
    data: 0
};

const InfoSlice = createSlice({
    name: 'dashboardSettings',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<number>) => {
            state.data= action.payload;
        },
    },
});

// 导出 actions 和 reducer
export const { setData } = InfoSlice.actions;
export default InfoSlice.reducer;