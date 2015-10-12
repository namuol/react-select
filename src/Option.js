var React = require('react');
var Seamstress = require('react-seamstress');

var Option = React.createClass({
	propTypes: {
		addLabelText: React.PropTypes.string,          // string rendered in case of allowCreate option passed to ReactSelect
		className: React.PropTypes.string,             // className (based on mouse position)
		mouseDown: React.PropTypes.func,               // method to handle click on option element
		mouseEnter: React.PropTypes.func,              // method to handle mouseEnter on option element
		mouseLeave: React.PropTypes.func,              // method to handle mouseLeave on option element
		option: React.PropTypes.object.isRequired,     // object that is base for that option
		renderFunc: React.PropTypes.func,              // method passed to ReactSelect component to render label text

		// Added for getStyleState:
		focused: React.PropTypes.bool,
		selected: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
	},

	blockEvent: function(event) {
		event.preventDefault();
		if ((event.target.tagName !== 'A') || !('href' in event.target)) {
			return;
		}

		if (event.target.target) {
			window.open(event.target.href);
		} else {
			window.location.href = event.target.href;
		}
	},

	render: function() {
		var obj = this.props.option;
		var renderedLabel = this.props.renderFunc(obj);
		var styleProps = this.getComputedStyles().root;

		return obj.disabled ? (
			<div className={styleProps.className}
				style={styleProps.style}
				onMouseDown={this.blockEvent}
				onClick={this.blockEvent}>
				{renderedLabel}
			</div>
		) : (
			<div className={styleProps.className}
				 style={styleProps.style}
				 onMouseEnter={this.props.mouseEnter}
				 onMouseLeave={this.props.mouseLeave}
				 onMouseDown={this.props.mouseDown}
				 onClick={this.props.mouseDown}
				 title={obj.title}>
				{ obj.create ? this.props.addLabelText.replace('{label}', obj.label) : renderedLabel }
			</div>
		);
	}
});

module.exports = Seamstress.createDecorator({
	getStyleState: function getStyleState ({props}) {
		return {
			focused: props.focused,
			selected: props.selected,
			disabled: props.disabled,
		};
	},
	styleStateTypes: {
		focused: React.PropTypes.bool,
		selected: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
	},
	styles: {
		':base': 'Select-option',
		':focused': 'is-focused',
		':selected': 'is-selected',
		':disabled': 'is-disabled',
	}
})(Option);
