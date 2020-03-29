import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const stylesCC = {
    button: {
        color: 'green'
    },
    trace: {
        lifecycle: 'color: green'
    }
};

class ClassComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            counter: 0
        };
        console.log('%cCC: constructor(): counter =', stylesCC.trace.lifecycle, this.state.counter);
    }

    componentDidMount() { console.log('%cCC: componentDidMount(): counter =', stylesCC.trace.lifecycle, this.state.counter); }
    componentDidUpdate() { console.log('%cCC: componentDidUpdate(): counter =', stylesCC.trace.lifecycle, this.state.counter); }
    componentWillUnmount() { console.log('%cCC: componentWillUnmount(): counter =', stylesCC.trace.lifecycle, this.state.counter); }
    shouldComponentUpdate() { console.log('%cCC: shouldComponentUpdate(): counter =', stylesCC.trace.lifecycle, this.state.counter); return true; }

    render() {

        console.log('%cCC: render(): counter =', stylesCC.trace.lifecycle, this.state.counter);
        return (
            <div>
                <div>Class Component</div>
                <span style={stylesCC.button}>{this.state.counter}</span>
                <button onClick={() => { this.setState(state => ({ counter: state.counter + 1 })); }} >+</button>
                <button onClick={() => { this.setState(state => ({ counter: state.counter - 1 })); }} >-</button>
            </div>
        );
    }
} //class ClassComponent

const stylesFC = {
    button: {
        color: 'blue'
    },
    trace: {
        lifecycle: 'color: blue'
    }
};

function FunctionalComponent() {
    const [counter, setCounter] = useState(0);

    useEffect(() => { console.log('%cFC: mount(): counter =', stylesFC.trace.lifecycle, counter); }, []);
    useEffect(() => { return () => { console.log('%cFC: unmount(): counter =', stylesFC.trace.lifecycle, counter); }; }, []);
    useEffect(() => { console.log('%cFC: update(): counter =', stylesFC.trace.lifecycle, counter); });

    console.log('%cFC: render(): counter =', stylesFC.trace.lifecycle, counter);
    return (
        <div>
            <div>Functional Component</div>
            <span style={stylesFC.button}>{counter}</span>
            <button onClick={() => setCounter(counter + 1)}>+</button>
            <button onClick={() => setCounter(counter - 1)}>-</button>
        </div>
    );
} //FunctionalComponent()

const stylesApp = {
    button: {
        color: 'blue'
    }
};

function buttonText(state) {
    return state ? 'Remove' : 'Add';
}

function App() {
    const [doCComp, setDoCComp] = useState(true);
    const [doFComp, setDoFComp] = useState(true);
    
    return (
        <div>
            <div className="controls">
                <button onClick={() => setDoCComp(!doCComp)}>{buttonText(doCComp)} Class Component</button>
                <button onClick={() => setDoFComp(!doFComp)}>{buttonText(doFComp)} Functional Component</button>
            </div>
            <hr />
            {doCComp && <ClassComponent />}
            <hr />
            {doFComp && <FunctionalComponent />}
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));
