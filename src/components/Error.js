import React, { PureComponent } from 'react';

export default class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        /* eslint-disable */
        console.error('页面加载异常', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>oops~~ 网络出小差，请刷新页面试试~~.</h1>;
        }
        return this.props.children;
    }
}
