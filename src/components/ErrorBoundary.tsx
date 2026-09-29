import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
export class ErrorBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) { /* Do not log birth data. */ }
  render() {
    if (this.state.failed) return <main className="error-boundary"><h1>Let’s try that again.</h1><p>The chart could not be displayed. Reload to recover. If a saved chart keeps causing the problem, you can clear it from this browser.</p><button className="button primary" onClick={() => location.reload()}>Reload</button><button className="button secondary" onClick={() => { try { localStorage.removeItem('natal-axis-reader.chart.v1'); } catch { /* Storage may be unavailable. */ } location.reload(); }}>Clear saved chart & reload</button></main>;
    return this.props.children;
  }
}
