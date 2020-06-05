# react-native-stepper
A stepper component for react native

# Examples
For the example look into examples folder and into `render()` method

![Example screenshot](https://github.com/Omarox/react-native-stepper/blob/master/examples/example.png)

## Usage

Place a `<Step />` tag for each desired step within the `<Stepper />` wrapper.
Define rendering functions for step icons (step numbers usually), navigation button (previous, next, sumbit), a layout of the page and completion conditions.

```
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
  </Step>
  <Step
    title=''
    isCompleted={() => this.state.secondQuestionResponse !== SecondQuestionResponse.NotAnswered}
    mustComplete={() => true}>
    <Text>Second question?</Text>
    <View style={{ flexDirection: 'row' }}>
      <CheckBox
        checked={this.state.firstQuestionResponse === FirstQuestionResponse.No}
        onPress={() => this.setState({ firstQuestionResponse: this.state.firstQuestionResponse === FirstQuestionResponse.No ? FirstQuestionResponse.NotAnswered : FirstQuestionResponse.No })} />
      <Text style={{ marginLeft: 16 }}>No</Text>
    </View>
  </Step>
</Stepper>
```

### Renderers examples

```
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
```

## Documentation

### Stepper Component
| Name                      | Description                               | Type       |
|---------------------------|-------------------------------------------|------------|
| submit                    | Function to call when stepper is completed | () => void |
| renderActiveStepIcon      | Function to render the step icon for currently active step | (props: IStepIconProps) => JSX.Element  |
| renderDisabledStepIcon    | Function to render the step icon for disabled step | (props: IStepIconProps) => JSX.Element  |
| renderCompletedStepIcon   | Function to render the step icon for completed step | (props: IStepIconProps) => JSX.Element  |
| layout                    | Function to render layout | (navigationPanel: JSX.Element, StepView: JSX.Element, stepBar: JSX.Element) => JSX.Element  |
| renderPreviousButton      | Function to render navigate back button | () => JSX.Element  |
| renderNextButton          | Function to render navigate forward button | () => JSX.Element  |
| renderSubmitButton        | Function to render submit button | () => JSX.Element  |

### Step Component
| Name                      | Description                               | Type       |
|---------------------------|-------------------------------------------|------------|
| title                     | Step title | string |
| isCompleted      | Function to determine whether the step is completed | () => boolean |
| mustComplete    | Function to determine whether the step must be completed | () => boolean |

### IStepIconProps
| Name | Description | Type |
|------|-------------|------|
| number | Step index (0 based) | number |
| Step | Step component props | IStepProps |

## Contributing
Pull requests are appreciated!
Feel free to open a new GitHub issue for any change request or found issue.

## Author
Bohdan Yarema

## License
[MIT](./LICENSE)
