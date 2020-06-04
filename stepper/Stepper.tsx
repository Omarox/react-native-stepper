import React from 'react';
import { IStepIconProps } from './StepIcon';
import NavigationPanel from './NavigationPanel';
import StepBar from './StepBar';
import Step from './Step';

interface IStepperProps {
    submit: () => void;
    renderActiveStepIcon: (props: IStepIconProps) => JSX.Element,
    renderDisabledStepIcon: (props: IStepIconProps) => JSX.Element,
    renderCompletedStepIcon: (props: IStepIconProps) => JSX.Element,
    layout: (navigationPanel: JSX.Element, StepView: JSX.Element, stepBar: JSX.Element) => JSX.Element,
    renderPreviousButton: () => JSX.Element,
    renderNextButton: () => JSX.Element,
    renderSubmitButton: () => JSX.Element
}

interface IStepperState {
    currentStepNumber: number
}

export default class Stepper extends React.Component<IStepperProps, IStepperState> {
    constructor(prop: any) {
        super(prop);
        this.state = {
            currentStepNumber: 0
        };
    }

    render() {
        let children = React.Children.toArray(this.props.children).map(e => e as Step);
        const navigationPanel = <NavigationPanel
            isFirst={() => this.state.currentStepNumber === 0}
            isLast={() => {
                if (this.state.currentStepNumber < children.length - 1) {
                    let nextStepNumber = this.state.currentStepNumber + 1;
                    for (let i = nextStepNumber; i < children.length; i++) {
                        if (children[i].props.mustComplete()) {
                            return false;
                        }
                    }

                    return true;
                }

                return this.state.currentStepNumber === children.length - 1;
            }
            }
            navigatePrevious={() => this.setState({ currentStepNumber: this.state.currentStepNumber - 1 })}
            navigateNext={() => {
                let nextStepNumber = this.state.currentStepNumber + 1;
                for (let i = nextStepNumber; i < children.length; i++) {
                    if (children[i].props.mustComplete()) {
                        break;
                    }
                }

                this.setState({ currentStepNumber: nextStepNumber });
            }}
            canContinue={() => children[this.state.currentStepNumber].props.isCompleted()}
            {...this.props} />
        const StepView = children[this.state.currentStepNumber].props.children;
        const stepBar = (
            <StepBar
                navigate={(StepNumber) => {
                    this.setState({ currentStepNumber: StepNumber })
                    console.log(StepNumber);
                }}
                isActivePredicate={(StepNumber) => StepNumber === this.state.currentStepNumber}
                Steps={children.map(c => c.props)}
                renderActiveIcon={this.props.renderActiveStepIcon}
                renderDisabledIcon={this.props.renderDisabledStepIcon}
                renderCompletedIcon={this.props.renderCompletedStepIcon} />
        );
        return this.props.layout(navigationPanel, StepView as JSX.Element, stepBar);
    }
}