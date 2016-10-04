/**
 * Created by Cho To Xau Tinh on 03-Oct-16.
 */
var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var RaisedButton = require('material-ui').RaisedButton;
var SelectField = require('material-ui').SelectField;
var MenuItem = require('material-ui').MenuItem;
var Card = require('material-ui').Card;
var CardHeader = require('material-ui').CardHeader;
var CardText = require('material-ui').CardText;
var Avatar = require('material-ui').Avatar;
var FontIcon = require('material-ui').FontIcon;
var Colors = require('material-ui/lib/styles/colors');

injectTapEventPlugin();

var anyValue = '*';

var BugFilter = React.createClass({
    getInitialState: function () {
        return {
            status: this.props.initFilter.status || anyValue,
            priority: this.props.initFilter.priority || anyValue
        };
    },
    componentWillReceiveProps: function (newProps) {
        var newFilter = {
            status: newProps.initFilter.status || anyValue,
            priority: newProps.initFilter.priority || anyValue
        };
        if (newFilter.status === this.state.status
            && newFilter.priority === this.state.priority) {
            return;
        }
        this.setState({
            status: newFilter.status,
            priority: newFilter.priority
        });
    },
    onChangeStatus: function (e, index, value) {
        this.setState({status: value});
    },
    onChangePriority: function (e, index, value) {
        this.setState({priority: value});
    },
    submitFilter: function (e) {
        e.preventDefault();
        var newFilter = {};
        if (this.state.priority != anyValue) newFilter.priority = this.state.priority;
        if (this.state.status != anyValue) newFilter.status = this.state.status;
        this.props.applyFilter(newFilter);
    },
    render: function () {
        var avatar = (
            <Avatar backgroundColor={Colors.teal500} icon={<FontIcon className="fa fa-filter"></FontIcon>}></Avatar>
        );
        return (
            <Card initiallyExpanded={true}>
                <CardHeader title="Filter" subtitle="Show a subset of records"
                            actAsExpander={true} showExpandableButton={true}
                            avatar={avatar}
                />
                <CardText expandable={true} style={{paddingTop: 0}}>
                    <form onSubmit={this.submitFilter}>
                        <SelectField value={this.state.status} onChange={this.onChangeStatus}
                                     floatingLabelText="Status">
                            <MenuItem primaryText="(Any)" value={anyValue}/>
                            <MenuItem primaryText="New" value="New"/>
                            <MenuItem primaryText="Open" value="Open"/>
                            <MenuItem primaryText="Closed" value="Closed"/>
                        </SelectField>
                        &nbsp;
                        <SelectField value={this.state.priority} onChange={this.onChangePriority}
                                     floatingLabelText="Priority">
                            <MenuItem primaryText="(Any)" value={anyValue}/>
                            <MenuItem primaryText="P1" value="P1"/>
                            <MenuItem primaryText="P2" value="P2"/>
                            <MenuItem primaryText="P3" value="P3"/>
                        </SelectField>
                        <br/>
                        <RaisedButton label="Apply" onTouchTap={this.submitFilter}/>
                    </form>
                </CardText>
            </Card>
        );
    }
});

module.exports = BugFilter;