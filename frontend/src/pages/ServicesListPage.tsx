import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListRequested } from '../store/servicesSlice';
import { Spinner } from '../components/Spinner';
import { ErrorView } from '../components/ErrorView';
import type { RootState } from '../store';

export function ServicesListPage() {
    const dispatch = useDispatch();
    const { data: items, loading, error } = useSelector(
        (state: RootState) => state.services.list
    );

    useEffect(() => {
        dispatch(fetchListRequested());
    }, [dispatch]);

    const handleRetry = () => {
        dispatch(fetchListRequested());
    };

    return (
        <div className="page-card">
            <h1 className="page-title">Список услуг</h1>

            {loading && <Spinner />}

            {!loading && error && <ErrorView onRetry={handleRetry} />}

            {!loading && !error && (
                <ul className="services-list">
                    {items.map((service) => (
                        <li key={service.id} className="service-list-item">
                            <Link to={`/${service.id}/details`} className="service-link">
                                <span className="service-name">{service.name}</span>
                                <span className="service-price">
                                    {service.price.toLocaleString('ru-RU')} ₽
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
