import React from 'react';
import { View, Button } from 'native-base';
import { StyleProp, ViewStyle } from 'react-native';

interface INavigationPanelProps {
    isFirst: () => boolean,
    isLast: () => boolean,
    navigatePrevious: () => void,
    navigateNext: () => void,
    submit: () => void,
    renderPreviousButton: () => JSX.Element,
    renderNextButton: () => JSX.Element,
    renderSubmitButton: () => JSX.Element,
    canContinue: () => boolean
}

const buttonStyle: StyleProp<ViewStyle> = { flex: 1, margin: 10, justifyContent: 'center' };

export default class NavigationPanel extends React.Component<INavigationPanelProps> {
    constructor(prop: any) {
        super(prop);
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', flex: 1 }}>
                {
                    !this.props.isFirst()
                        ? <Button onPress={this.props.navigatePrevious} style={buttonStyle}>
                            {this.props.renderPreviousButton()}
                        </Button>
                        : <View style={buttonStyle} />
                }
                {this.props.isLast()
                    ?
                    <Button disabled={!this.props.canContinue()} onPress={this.props.submit} style={buttonStyle}>
                        {this.props.renderSubmitButton()}
                    </Button>
                    : <Button disabled={!this.props.canContinue()} onPress={this.props.navigateNext} style={buttonStyle}>
                        {this.props.renderNextButton()}
                    </Button>
                }
            </View>
        );
    }
}