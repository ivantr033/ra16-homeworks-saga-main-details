interface ErrorViewProps {
    onRetry: () => void;
}

export function ErrorView({ onRetry }: ErrorViewProps) {
    return (
        <div className="error-banner" role="alert">
            <span className="error-banner-text">Произошла ошибка!</span>
            <button type="button" className="retry-button" onClick={onRetry}>
                Повторить запрос
            </button>
        </div>
    );
}
