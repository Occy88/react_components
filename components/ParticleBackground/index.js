import React from "react";
import './style.scss'
import './particles.js'
import config from './particlesjs-config.json'

export default class ParticleBackground extends React.Component {
    // Styles
    constructor(props) {
        super(props);
        this.background = React.createRef();
        this.particles = React.createRef();
    }

    componentDidMount() {
        particlesJS.load(this.particles.current.id, config, function () {
            console.log('callback - particles.js config loaded');
        });
    }

    render() {

        // Create the interior of any given widget to be displayed.
        return (
                <div className={'ParticleBackground'}>
                    <div className={"background"} ref={this.particles} id={'particles-js'}></div>
                    {/*<canvas className={"background"} ref={this.background}/>*/}
                </div>
        );
    };
}

