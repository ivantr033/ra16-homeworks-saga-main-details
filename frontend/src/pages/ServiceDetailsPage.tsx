import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailsRequested, fetchListRequested } from '../store/servicesSlice';
import { Spinner } from '../components/Spinner';
import { ErrorView } from '../components/ErrorView';
import type { RootState } from '../store';

export function ServiceDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const serviceId = Number(id);
    const dispatch = useDispatch();

    const { data: details, loading, error } = useSelector(
        (state: RootState) => state.services.details
    );
    const listItems = useSelector((state: RootState) => state.services.list.data);

    useEffect(() => {
        if (!isNaN(serviceId)) {
            dispatch(fetchDetailsRequested(serviceId));
        }
        if (listItems.length === 0) {
            dispatch(fetchListRequested());
        }
    }, [serviceId, listItems.length, dispatch]);

    const handleRetry = () => {
        if (!isNaN(serviceId)) {
            dispatch(fetchDetailsRequested(serviceId));
        }
    };

    return (
        <div className="details-layout">
            {/* Sidebar highlighting currently active service */}
            {listItems.length > 0 && (
                <aside className="sidebar-card">
                    <h2 className="sidebar-title">Все услуги</h2>
                    <ul className="sidebar-list">
                        {listItems.map((item) => (
                            <li key={item.id}>
                                <Link
                                    to={`/${item.id}/details`}
                                    className={`sidebar-link ${item.id === serviceId ? 'active' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
            )}

            <div className="page-card">
                <Link to="/" className="back-link">
                    ← Назад к списку
                </Link>

                {loading && <Spinner />}

                {!loading && error && <ErrorView onRetry={handleRetry} />}

                {!loading && !error && details && (
                    <div className="details-content">
                        <h1 className="page-title">{details.name}</h1>
                        <p className="details-price">
                            Стоимость: <strong>{details.price.toLocaleString('ru-RU')} ₽</strong>
                        </p>
                        <div className="details-description">
                            <h3>Описание услуги</h3>
                            <p>{details.content}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
