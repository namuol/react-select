var React = require('react');
var seamstress = require('react-seamstress');

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

	getStyleState: function() {
		return {
			option: this.props.option,
			removable: !!this.props.onRemove,
			clickable: this.props.optionLabelClick,
		};
	},

	render: function() {
		var label = this.props.option.label;
		if (this.props.renderer) {
			label = this.props.renderer(this.props.option);
		}
		
		var styleProps = this.getStyleProps();

		if(!this.props.onRemove && !this.props.optionLabelClick) {
			return (
				<div {...styleProps}
					title={this.props.option.title}
				>{label}</div>
			);
		}

		if (this.props.optionLabelClick) {

			label = (
				<a {...this.getStylePropsFor('label-anchor')}
					onMouseDown={this.blockEvent}
					onTouchEnd={this.props.onOptionLabelClick}
					onClick={this.props.onOptionLabelClick}
					title={this.props.option.title}>
					{label}
				</a>
			);
		}

		return (
			<div {...styleProps}
				 title={this.props.option.title}>
				<span {...this.getStylePropsFor('icon')}
					onMouseDown={this.blockEvent}
					onClick={this.handleOnRemove}
					onTouchEnd={this.handleOnRemove}>&times;</span>
				<span {...this.getStylePropsFor('label')}>{label}</span>
			</div>
		);
	}

});

var itemStyles = function(state) {
	var option = state.option;
	return [
		'Select-item',
		...(option.styles || []),
		option.className,
		option.style
	];
};

Value.styles = {
	':base': 'Select-value',

	// Looks like seamstress will probably need
	//   the equivalent to CSS's comma (logical OR).
	// This could be expressed much more nicely with
	//  ':removable, :clickable'
	':removable': itemStyles,
	':clickable': itemStyles,

	'::icon': 'Select-item-icon',
	'::label': 'Select-item-label',
	'::label-anchor': 'Select-item-label__a'
};

module.exports = seamstress(Value);
