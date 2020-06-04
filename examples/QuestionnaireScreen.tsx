import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { View, CheckBox, Button, Text } from 'native-base';
import { IStepIconProps } from '../stepper/StepIcon';
import { Container, Content, Header } from 'native-base';
import Step from '../stepper/Step';
import Stepper from '../stepper/Stepper';

enum FirstQuestionResponse {
    NotAnswered = 0,
    No = 1,
    YesOneTime = 2,
    YesMoreThanOneTime = 3
}

enum SecondQuestionResponse {
    NotAnswered = 0,
    No = 1,
    Yes = 2
}

enum OptionalQuestionResponse {
    NotAnswered = 0,
    Yes = 2
}

interface StepperState {
    firstQuestionResponse: FirstQuestionResponse,
    secondQuestionResponse: SecondQuestionResponse,
    optionalQuestionResponse: OptionalQuestionResponse
}

const styles = {
    currentCircleStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 5,
        alignItems: 'center'
    } as StyleProp<ViewStyle>,
    disabledCircleStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 5,
        alignItems: 'center'
    } as StyleProp<ViewStyle>,
    filledCircleStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 5,
        alignItems: 'center'
    } as StyleProp<ViewStyle>
}

export default class StepperScreenImplementation extends React.Component<{ navigation: { navigate: (screenName: string) => void; }, localizationContext: any }, StepperState> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            firstQuestionResponse: FirstQuestionResponse.NotAnswered,
            secondQuestionResponse: SecondQuestionResponse.NotAnswered,
            optionalQuestionResponse: OptionalQuestionResponse.NotAnswered
        }
    }

    buildCurrentStepIcon(stepIconProps: IStepIconProps) {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={styles.currentCircleStyle}>
                    <Text style={{ color: 'green', alignContent: 'center' }}>
                        {stepIconProps.number}
                    </Text>
                </View>
            </View>
        );
    }

    buildDisabledStepIcon(stepIconProps: IStepIconProps) {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={styles.disabledCircleStyle}>
                    <Text style={{ color: 'green' }}>
                        {stepIconProps.number}
                    </Text>
                </View>
            </View>
        );
    }

    buildFilledStepIcon() {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={styles.filledCircleStyle}>
                    <Text style={{ color: 'white' }}>
                        &#10003;
                    </Text>
                </View>
            </View>
        );
    }

    buildLayout(navigationPanel: JSX.Element, StepView: JSX.Element, stepBar: JSX.Element) {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ margin: 10, flex: 1 }}>
                    {stepBar}
                </View>
                <View style={{ margin: 10, flex: 10 }}>
                    {StepView}
                </View>
                <View style={{ flex: 2 }}>
                    {navigationPanel}
                </View>
            </View>
        );
    }

    _submit() {
        this.props.navigation.navigate("EmptyScreen")
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Header></Header>
                <Content scrollEnabled={true} contentContainerStyle={{ flex: 1 }}>
                    <Stepper
                        renderActiveStepIcon={this.buildCurrentStepIcon}
                        renderDisabledStepIcon={this.buildDisabledStepIcon}
                        renderCompletedStepIcon={_ => this.buildFilledStepIcon()}
                        renderPreviousButton={() => <Text>Back</Text>}
                        renderNextButton={() => <Text>Next</Text>}
                        renderSubmitButton={() => <Text>Complete</Text>}
                        submit={this._submit}
                        layout={(navigationBar, StepView, stepBar) => this.buildLayout(navigationBar, StepView, stepBar)}
                    >
                        {this.firstStep()}
                        {this.secondStep()}
                        {this.optionalStep()}
                    </Stepper>
                </Content>
            </Container>
        );
    }

    private firstStep() {
        return (
            <Step
                title=''
                isCompleted={() => this.state.firstQuestionResponse !== FirstQuestionResponse.NotAnswered}
                mustComplete={() => true}>
                <Text>First question?</Text>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        checked={this.state.firstQuestionResponse === FirstQuestionResponse.No}
                        onPress={() => this.setState({ firstQuestionResponse: this.state.firstQuestionResponse === FirstQuestionResponse.No ? FirstQuestionResponse.NotAnswered : FirstQuestionResponse.No })} />
                    <Text style={{ marginLeft: 16 }}>No</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        checked={this.state.firstQuestionResponse === FirstQuestionResponse.YesOneTime}
                        onPress={() => this.setState({ firstQuestionResponse: this.state.firstQuestionResponse === FirstQuestionResponse.YesOneTime ? FirstQuestionResponse.NotAnswered : FirstQuestionResponse.YesOneTime })} />
                    <Text style={{ marginLeft: 16 }}>Yes, one time</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        checked={this.state.firstQuestionResponse === FirstQuestionResponse.YesMoreThanOneTime}
                        onPress={() => this.setState({ firstQuestionResponse: this.state.firstQuestionResponse === FirstQuestionResponse.YesMoreThanOneTime ? FirstQuestionResponse.NotAnswered : FirstQuestionResponse.YesMoreThanOneTime })} />
                    <Text style={{ marginLeft: 16 }}>Yes, multiple times</Text>
                </View>
            </Step>
        );
    }

    secondStep() {
        return (
            <Step
                title=''
                isCompleted={() => this.state.secondQuestionResponse !== SecondQuestionResponse.NotAnswered}
                mustComplete={() => true}>
                <Text>Second question?</Text>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        checked={this.state.secondQuestionResponse === SecondQuestionResponse.No}
                        onPress={() => this.setState({ secondQuestionResponse: this.state.secondQuestionResponse === SecondQuestionResponse.No ? SecondQuestionResponse.NotAnswered : SecondQuestionResponse.No })} />
                    <Text style={{ marginLeft: 16 }}>No</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        checked={this.state.secondQuestionResponse === SecondQuestionResponse.Yes}
                        onPress={() => this.setState({ secondQuestionResponse: this.state.secondQuestionResponse === SecondQuestionResponse.Yes ? SecondQuestionResponse.NotAnswered : SecondQuestionResponse.Yes })} />
                    <Text style={{ marginLeft: 16 }}>Yes</Text>
                </View>
            </Step>
        );
    }

    private optionalStep() {
        return (
            <Step
                title=''
                isCompleted={() => this.state.optionalQuestionResponse !== OptionalQuestionResponse.NotAnswered}
                mustComplete={() => true}>
                <Text>Optional question?</Text>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        checked={this.state.optionalQuestionResponse === OptionalQuestionResponse.Yes}
                        onPress={() => this.setState({ optionalQuestionResponse: this.state.optionalQuestionResponse === OptionalQuestionResponse.Yes ? OptionalQuestionResponse.NotAnswered : OptionalQuestionResponse.Yes })} />
                    <Text style={{ marginLeft: 16 }}>Yes</Text>
                </View>
            </Step>
        );
    }
}