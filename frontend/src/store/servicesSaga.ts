import { call, put, takeLatest, all } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    fetchServicesList,
    fetchServiceById,
    type ServiceItem,
    type ServiceDetails,
} from '../api/servicesApi';
import {
    fetchListRequested,
    fetchListSucceeded,
    fetchListFailed,
    fetchDetailsRequested,
    fetchDetailsSucceeded,
    fetchDetailsFailed,
} from './servicesSlice';

function* handleFetchListSaga() {
    try {
        const items: ServiceItem[] = yield call(fetchServicesList);
        yield put(fetchListSucceeded(items));
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Произошла ошибка!';
        yield put(fetchListFailed(message));
    }
}

function* handleFetchDetailsSaga(action: PayloadAction<number>) {
    try {
        const details: ServiceDetails = yield call(fetchServiceById, action.payload);
        yield put(fetchDetailsSucceeded(details));
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Произошла ошибка!';
        yield put(fetchDetailsFailed(message));
    }
}

export function* rootSaga() {
    yield all([
        takeLatest(fetchListRequested.type, handleFetchListSaga),
        takeLatest(fetchDetailsRequested.type, handleFetchDetailsSaga),
    ]);
}
