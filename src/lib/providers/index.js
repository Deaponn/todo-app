import ExampleContextPadProvider from './ExampleContextPadProvider';
import ExamplePaletteProvider from './ExamplePaletteProvider';
import ExampleRuleProvider from './ExampleRuleProvider';

const exports = {
    __init__: [
        'exampleContextPadProvider',
        'examplePaletteProvider',
        'exampleRuleProvider'
    ],
    exampleContextPadProvider: [ 'type', ExampleContextPadProvider ],
    examplePaletteProvider: [ 'type', ExamplePaletteProvider ],
    exampleRuleProvider: [ 'type', ExampleRuleProvider ]
};

export default exports