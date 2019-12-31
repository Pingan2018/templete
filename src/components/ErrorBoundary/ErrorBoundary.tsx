import React, { PureComponent } from 'react';

interface PropType {

}
interface StateType {
    hasError: boolean
}
export default class ErrorBoundary extends PureComponent<PropType, StateType> {
    constructor(props: PropType) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
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
