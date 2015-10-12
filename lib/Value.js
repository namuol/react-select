'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var React = require('react');
var Seamstress = require('react-seamstress');

var Value = React.createClass({

	displayName: 'Value',

	propTypes: {
		disabled: React.PropTypes.bool, // disabled prop passed to ReactSelect
		onOptionLabelClick: React.PropTypes.func, // method to handle click on value label
		onRemove: React.PropTypes.func, // method to handle remove of that value
		option: React.PropTypes.object.isRequired, // option passed to component
		optionLabelClick: React.PropTypes.bool, // indicates if onOptionLabelClick should be handled
		renderer: React.PropTypes.func // method to render option label passed to ReactSelect
	},

	blockEvent: function blockEvent(event) {
		event.stopPropagation();
	},

	handleOnRemove: function handleOnRemove(event) {
		if (!this.props.disabled) {
			this.props.onRemove(event);
		}
	},

	render: function render() {
		var label = this.props.option.label;
		if (this.props.renderer) {
			label = this.props.renderer(this.props.option);
		}

		var computedStyles = this.getComputedStyles();

		if (!this.props.onRemove && !this.props.optionLabelClick) {
			return React.createElement(
				'div',
				_extends({}, computedStyles.root, {
					title: this.props.option.title
				}),
				label
			);
		}

		if (this.props.optionLabelClick) {

			label = React.createElement(
				'a',
				_extends({}, computedStyles['label-anchor'], {
					onMouseDown: this.blockEvent,
					onTouchEnd: this.props.onOptionLabelClick,
					onClick: this.props.onOptionLabelClick,
					title: this.props.option.title }),
				label
			);
		}

		return React.createElement(
			'div',
			_extends({}, computedStyles.root, {
				title: this.props.option.title }),
			React.createElement(
				'span',
				_extends({}, computedStyles.icon, {
					onMouseDown: this.blockEvent,
					onClick: this.handleOnRemove,
					onTouchEnd: this.handleOnRemove }),
				'×'
			),
			React.createElement(
				'span',
				computedStyles.label,
				label
			)
		);
	}
});

module.exports = Seamstress.createDecorator({
	getStyleState: function getStyleState(_ref) {
		var props = _ref.props;

		return {
			option: props.option,
			removable: !!props.onRemove,
			clickable: !!props.optionLabelClick
		};
	},
	styleStateTypes: {
		option: React.PropTypes.object,
		removable: React.PropTypes.bool,
		clickable: React.PropTypes.bool
	},
	styles: {
		':base': function base(state) {
			//
			// Here's an interesting special case.
			//
			// There's no single unconditional base-class for this component
			// as it is currently implemented, so I'm using some ugly if/else
			// logic to achieve the result I want.
			//
			// I may want to expand seamstress to allow this kind
			// of logical composition, so it instead might look like this:
			// {
			// 	'not(:clickable,:removable)': 'Select-value',
			// 	':clickable,:removable': function...,
			// }
			//
			// This would require two new features:
			// - Logical OR (via `,`)
			// - Logical NOT (via `not`)
			//
			if (!state.clickable && !state.removable) {
				return 'Select-value';
			} else {
				var option = state.option;
				return ['Select-item', option.className, option.style].concat(_toConsumableArray(option.styles || []));
			}
		},

		'::icon': 'Select-item-icon',
		'::label': 'Select-item-label',
		'::label-anchor': 'Select-item-label__a'
	}
})(Value);