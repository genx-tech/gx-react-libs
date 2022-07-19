import React from 'react';
import Runtime from '../Runtime';

class ErrorBoundary extends React.Component {
    state = {
        error: null,
    };

    static getDerivedStateFromError(error) {
        // Update state so next render shows fallback UI.
        return { error: error };
    }

    componentDidCatch(error, info) {
        // Log the error to an error reporting service
        Runtime.log('error', [error, info]);
    }

    render() {
        if (this.state.error) {
            // You can render any custom fallback UI
            const ErrorReporter = Runtime.getComponent('ErrorReporter');
            return ErrorReporter ? (
                <ErrorReporter error={this.state.error} />
            ) : (
                // eslint-disable-next-line react-native/no-inline-styles
                <p style={{ color: 'red' }}>{this.state.error.toString()}</p>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
