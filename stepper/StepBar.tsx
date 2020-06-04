import React from 'react';
import StepIcon, { IStepIconProps } from './StepIcon';
import { IStepProps } from './Step';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IStepBarProps {
    Steps: IStepProps[],
    navigate: (StepNumber: number) => void,
    isActivePredicate: (StepNumber: number) => boolean,
    renderActiveIcon: (props: IStepIconProps) => JSX.Element,
    renderDisabledIcon: (props: IStepIconProps) => JSX.Element,
    renderCompletedIcon: (props: IStepIconProps) => JSX.Element
}

export default class StepBar extends React.Component<IStepBarProps> {
    constructor(prop: any) {
        super(prop);
    }

    render() {
        return (<FlatList
            horizontal={true}
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }}
            data={this.props.Steps}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity onPress={() => {
                        let previousStepIsAnswered = true;
                        for (let i = 0; i < index; i++) {
                            if (!this.props.Steps[i].isCompleted() && this.props.Steps[i].mustComplete()) {
                                previousStepIsAnswered = false;
                                break;
                            }
                        }

                        if (index === 0 || (previousStepIsAnswered && item.mustComplete())) {
                            this.props.navigate(index)
                        }
                    }
                    }>
                        <StepIcon Step={item} number={index + 1} isActive={() => this.props.isActivePredicate(index)} {...this.props} />
                    </TouchableOpacity>
                )
            }}
        />);
    }
}