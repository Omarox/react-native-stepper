import React from 'react';

export interface IStepProps {
    title: string,
    isCompleted: () => boolean,
    mustComplete: () => boolean
}

export default class Step extends React.Component<IStepProps> {
    constructor(prop: any) {
        super(prop);
    }

    render() {
        return this.props.children;
    }
}