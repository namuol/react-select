var React = require('react');
var Seamstress = require('react-seamstress');

var Value = React.createClass({

	displayName: 'Value',

	propTypes: {
		disabled: React.PropTypes.bool,                   // disabled prop passed to ReactSelect
		onOptionLabelClick: React.PropTypes.func,         // method to handle click on value label
		onRemove: React.PropTypes.func,                   // method to handle remove of that value
		option: React.PropTypes.object.isRequired,        // option passed to component
		optionLabelClick: React.PropTypes.bool,           // indicates if onOptionLabelClick should be handled
		renderer: React.PropTypes.func                    // method to render option label passed to ReactSelect
	},

	blockEvent: function(event) {
		event.stopPropagation();
	},

	handleOnRemove: function(event) {
		if (!this.props.disabled) {
			this.props.onRemove(event);
		}
	},

	render: function() {
		var label = this.props.option.label;
		if (this.props.renderer) {
			label = this.props.renderer(this.props.option);
		}
		
		var computedStyles = this.getComputedStyles();

		if(!this.props.onRemove && !this.props.optionLabelClick) {
			return (
				<div {...computedStyles.root}
					title={this.props.option.title}
				>{label}</div>
			);
		}

		if (this.props.optionLabelClick) {

			label = (
				<a {...computedStyles['label-anchor']}
					onMouseDown={this.blockEvent}
					onTouchEnd={this.props.onOptionLabelClick}
					onClick={this.props.onOptionLabelClick}
					title={this.props.option.title}>
					{label}
				</a>
			);
		}

		return (
			<div {...computedStyles.root}
				 title={this.props.option.title}>
				<span {...computedStyles.icon}
					onMouseDown={this.blockEvent}
					onClick={this.handleOnRemove}
					onTouchEnd={this.handleOnRemove}>&times;</span>
				<span {...computedStyles.label}>{label}</span>
			</div>
		);
	}
});

module.exports = Seamstress.createDecorator({
	getStyleState: function({props}) {
		return {
			option: props.option,
			removable: !!props.onRemove,
			clickable: !!props.optionLabelClick,
		};
	},
	styleStateTypes: {
		option: React.PropTypes.object,
		removable: React.PropTypes.bool,
		clickable: React.PropTypes.bool,
	},
	styles: {
	':base': (state) => {
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
			return [
				'Select-item',
				option.className,
				option.style,
				...(option.styles || []),
			];
		}
	},

	'::icon': 'Select-item-icon',
	'::label': 'Select-item-label',
	'::label-anchor': 'Select-item-label__a'
}
})(Value);
