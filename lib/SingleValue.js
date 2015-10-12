'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var React = require('react');
var Seamstress = require('react-seamstress');

var SingleValue = React.createClass({
	displayName: 'SingleValue',

	propTypes: {
		placeholder: React.PropTypes.string, // this is default value provided by React-Select based component
		value: React.PropTypes.object // selected option
	},

	render: function render() {
		return React.createElement(
			'div',
			_extends({}, this.getComputedStyles().root, {
				title: this.props.value && this.props.value.title
			}),
			this.props.placeholder
		);
	}
});

module.exports = Seamstress.createDecorator({
	getStyleState: function getStyleState(_ref) {
		var props = _ref.props;

		return {
			value: props.value
		};
	},
	styleStateTypes: {
		value: React.PropTypes.object
	},
	styles: ['Select-placeholder', function (state) {
		var value = state.value;
		if (!!value) {
			return [].concat(_toConsumableArray(value.styles || []), [value.className, value.style]);
		}
	}]
})(SingleValue);