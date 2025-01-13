import { Component, type PropsWithChildren, type ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMsg: string | null;
}

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMsg: error.name };
  }

  componentDidCatch(error: Error) {
    Sentry.captureException(error);
  }

  render() {
    // TODO: hasError일 때 fallback을 렌더링하도록 수정 필요

    return this.props.children;
  }
}

export default ErrorBoundary;
