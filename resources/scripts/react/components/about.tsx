import React from "react";
import ReactDOM from "react-dom";

/**
 * Props interface
 */
export interface AboutPageProps {
    title: string;
}

/**
 * State interface
 */
export interface AboutPageState {
    count: number;
}

/**
 * About class
 */
export class AboutPage extends React.Component<AboutPageProps, AboutPageState> {
    state = {
        count: 0,
    } as AboutPageState;

    /**
     * Increase function
     */
    increaseCounter = () => {
        this.state.count++;
        this.setState(this.state);
    };

    /**
     * Render function
     * @returns {}
     */
    render() {
        return (
            <div>
                <h1>Hello {this.props.title}</h1>
                <div>
                    <h3>{this.state.count}</h3>
                    <button onClick={() => this.increaseCounter()}>
                        Increase counter
                    </button>
                </div>
            </div>
        );
    }
}

export default AboutPage;
