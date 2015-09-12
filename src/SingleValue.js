var React = require('react');
var seamstress = require('react-seamstress');

var SingleValue = React.createClass({
	propTypes: {
		placeholder: React.PropTypes.string,       // this is default value provided by React-Select based component
		value: React.PropTypes.object              // selected option
	},

	getStyleState: function() {
		return {
			value: this.props.value,
		};
	},

	render: function() {
		var styleProps = this.getStyleProps();
		return (
			<div
				className={styleProps.className}
				style={styleProps.style}
				title={this.props.value && this.props.value.title}
				>{this.props.placeholder}</div>
		);
	}
});

SingleValue.styles = [
	'Select-placeholder',

	function(state) {
		var value = state.value;
		if (!!value) {
			return [
				...(value.styles || []),
				value.className,
				value.style
			];
		}
	},
];

module.exports = seamstress(SingleValue);
