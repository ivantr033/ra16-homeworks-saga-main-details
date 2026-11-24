import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServiceItem, ServiceDetails } from '../api/servicesApi';

interface RequestState<T> {
    data: T;
    loading: boolean;
    error: string | null;
}

interface ServicesState {
    list: RequestState<ServiceItem[]>;
    details: RequestState<ServiceDetails | null>;
}

const initialState: ServicesState = {
    list: {
        data: [],
        loading: false,
        error: null,
    },
    details: {
        data: null,
        loading: false,
        error: null,
    },
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        // List actions
        fetchListRequested(state) {
            state.list.loading = true;
            state.list.error = null;
        },
        fetchListSucceeded(state, action: PayloadAction<ServiceItem[]>) {
            state.list.loading = false;
            state.list.data = action.payload;
            state.list.error = null;
        },
        fetchListFailed(state, action: PayloadAction<string>) {
            state.list.loading = false;
            state.list.error = action.payload;
        },

        // Details actions
        fetchDetailsRequested: {
            reducer(state) {
                state.details.loading = true;
                state.details.error = null;
                state.details.data = null;
            },
            prepare(id: number) {
                return { payload: id };
            },
        },
        fetchDetailsSucceeded(state, action: PayloadAction<ServiceDetails>) {
            state.details.loading = false;
            state.details.data = action.payload;
            state.details.error = null;
        },
        fetchDetailsFailed(state, action: PayloadAction<string>) {
            state.details.loading = false;
            state.details.error = action.payload;
        },
    },
});

export const {
    fetchListRequested,
    fetchListSucceeded,
    fetchListFailed,
    fetchDetailsRequested,
    fetchDetailsSucceeded,
    fetchDetailsFailed,
} = servicesSlice.actions;

export default servicesSlice.reducer;
