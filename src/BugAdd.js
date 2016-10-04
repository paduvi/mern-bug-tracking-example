/**
 * Created by Cho To Xau Tinh on 03-Oct-16.
 */
var React = require('react');
var RaisedButton = require('material-ui').RaisedButton;
var Card = require('material-ui').Card;
var CardHeader = require('material-ui').CardHeader;
var CardText = require('material-ui').CardText;
var Avatar = require('material-ui').Avatar;
var Colors = require('material-ui/styles').colors;
var TextField = require('material-ui').TextField;
var FontIcon = require('material-ui').FontIcon;

var BugAdd = React.createClass({
    getInitialState: function () {
        return ({owner: '', title: ''});
    },
    addBug: function (e) {
        e.preventDefault();
        this.props.addBug({
            owner: this.state.owner,
            title: this.state.title,
            status: 'New',
            priority: 'P1'
        });
        this.state.owner = "";
        this.state.title = "";
    },
    onChangeTitle: function (e) {
        this.setState({title: e.target.value});
    },
    onChangeOwner: function (e) {
        this.setState({owner: e.target.value});
    },
    render: function () {
        var avatar = <Avatar backgroundColor={Colors.teal500} icon={<FontIcon className="fa fa-filter"/>}/>;
        return (
            <Card initiallyExpanded={true}>
                <CardHeader title="Create" subtitle="Add a new bug"
                            actAsExpander={true} showExpandableButton={true}
                            avatar={avatar}/>
                <CardText expandable={true} style={{paddingTop: 0}}>
                    <TextField hintText="Bug Title" value={this.state.title} onChange={this.onChangeTitle}/>
                    <br />
                    <TextField hintText="Owner" value={this.state.owner} onChange={this.onChangeOwner}/>
                    <br />
                    <RaisedButton label="Add" primary={true} onTouchTap={this.addBug}/>
                </CardText>
            </Card>
        );
    }
});

module.exports = BugAdd;