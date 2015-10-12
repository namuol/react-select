var React = require('react');
var Seamstress = require('react-seamstress');

var SingleValue = React.createClass({
	propTypes: {
		placeholder: React.PropTypes.string,       // this is default value provided by React-Select based component
		value: React.PropTypes.object              // selected option
	},

	render: function() {
		return (
			<div {...this.getComputedStyles().root}
				title={this.props.value && this.props.value.title}
				>{this.props.placeholder}</div>
		);
	}
});

module.exports = Seamstress.createDecorator({
	getStyleState: function({props}) {
		return {
			value: props.value,
		};
	},
	styleStateTypes: {
		value: React.PropTypes.object,
	},
	styles: [
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
	],
})(SingleValue);