import React from 'react';
import PropTypes from 'prop-types';

export default class Window extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMainSequence: false,
            isDragging: false,
            xDiff: 0,
            yDiff: 0,
            x: 50,
            y: 50
        };

        this.onDragStart = this.onDragStart.bind(this);

        this.toggleMainSequence = this.toggleMainSequence.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousemove', this.onDrag.bind(this));
        document.addEventListener('mouseup', this.onDragStop.bind(this));
    }
    render() {
        if (this.props.isHidden) {
            return null;
        }

        const style = {
            position: 'absolute',
            transform: `translate(${this.state.x}px, ${this.state.y}px)`
        };

        return (
            <div className="window" style={style}
                 onMouseDown={this.onDragStart}>
                <div className="window-bar">
                    <div>HR Diagram</div>
                    <span className="window-close"
                          onClick={this.props.onWindowClose}>
                        <svg viewport="0 0 12 12" version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="11"
                                  x2="11" y2="1"
                                  stroke="black"
                                  strokeWidth="2"/>
                            <line x1="1" y1="1"
                                  x2="11" y2="11"
                                  stroke="black"
                                  strokeWidth="2"/>
                        </svg>
                    </span>
                </div>
                <div className="window-body">
                    <img src="./img/hrcloud.png" width="300" height="200" />
                    {this.state.showMainSequence &&
                     <img className="main-sequence"
                          src="./img/mainsequence.png" width="300" height="200" />
                    }
                    <div className="ml-2">
                        <input type="checkbox" name="showMainSequence"
                               id="showMainSequenceCheckbox"
                               onChange={this.toggleMainSequence} />
                        <label className="ml-1" htmlFor="showMainSequenceCheckbox">
                            Show main sequence track
                        </label>
                    </div>
                </div>
            </div>
        );

    }
    toggleMainSequence(e) {
        this.setState({
            showMainSequence: !!e.target.checked
        });
    }

    onDragStart(e) {
        this.setState({isDragging: true});
        this.setState({
            xDiff: e.pageX - this.state.x,
            yDiff: e.pageY - this.state.y
        });
    }
    onDragStop() {
        this.setState({isDragging: false});
    }
    onDrag(e) {
        if (this.state.isDragging) {
            this.setState({
                x: e.pageX - this.state.xDiff,
                y: e.pageY - this.state.yDiff
            });
        }
    }
}

Window.propTypes = {
    isHidden: PropTypes.bool.isRequired,
    onWindowClose: PropTypes.func.isRequired
};
