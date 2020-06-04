import React from 'react';
import { IStepProps } from './Step';

export interface IStepIconProps {
    number: number,
    Step: IStepProps,
    isActive: () => boolean,
    renderActiveIcon: (props: IStepIconProps) => JSX.Element,
    renderDisabledIcon: (props: IStepIconProps) => JSX.Element,
    renderCompletedIcon: (props: IStepIconProps) => JSX.Element
}

export default class StepIcon extends React.Component<IStepIconProps> {
    constructor(prop: any) {
        super(prop);
    }

    render() {
        if (this.props.isActive()) {
            return this.props.renderActiveIcon(this.props);
        }
        else if (this.props.Step.isCompleted()) {
            return this.props.renderCompletedIcon(this.props);
        }

        return this.props.renderDisabledIcon(this.props);
    }
}