/**
 * Created by Cho To Xau Tinh on 04-Oct-16.
 */
var React = require('react');
var $ = require('jquery');
var RaisedButton = require('material-ui').RaisedButton;
var FlatButton = require('material-ui').FlatButton;
var Card = require('material-ui').Card;
var CardHeader = require('material-ui').CardHeader;
var Avatar = require('material-ui').Avatar;
var FontIcon = require('material-ui').FontIcon;
var Colors = require('material-ui/styles').colors;
var CardText = require('material-ui').CardText;
var SelectField = require('material-ui').SelectField;
var MenuItem = require('material-ui').MenuItem;
var TextField = require('material-ui').TextField;
var Snackbar = require('material-ui').Snackbar;

var BugEdit = React.createClass({
    getInitialState: function () {
        return {successVisible: false};
    },
    componentDidMount: function () {
        this.loadData();
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function () {
        $.ajax('/api/bugs/' + this.props.params.id).done(function (bug) {
            this.setState(bug)
        }.bind(this));
    },
    onChangeStatus: function (e, i, value) {
        this.setState({status: value});
    },
    onChangePriority: function (e, i, value) {
        this.setState({priority: value});
    },
    onChangeOwner: function (e) {
        this.setState({owner: e.target.value});
    },
    onChangeTitle: function (e) {
        this.setState({title: e.target.value});
    },
    showSuccessMessage: function () {
        this.setState({successVisible: true});
    },
    dismissSuccessMessage: function () {
        this.setState({successVisible: false});
    },
    onSubmit: function () {
        var bug = {
            status: this.state.status,
            priority: this.state.priority,
            owner: this.state.owner,
            title: this.state.title
        }
        $.ajax({
            url: '/api/bugs/' + this.props.params.id,
            method: "PUT",
            data: bug
        }).done(function (data) {
            this.setState(data);
            this.showSuccessMessage();
        }.bind(this)).fail(function (xhr, status, err) {
            console.log("Error editing bug:", err);
        })
    },
    render: function () {
        var avatar = <Avatar backgroundColor={Colors.teal500}
                             icon={<FontIcon className="fa fa-bug"/>}></Avatar>;
        return (
            <div style={{maxWidth: 800}}>
                <Card>
                    <CardHeader title="Edit Bug" subtitle={this.props.params.id}
                                avatar={avatar}/>
                    <CardText>
                        <SelectField fullWidth={true} value={this.state.priority} onChange={this.onChangePriority}
                                     floatingLabelText="Priority">
                            <MenuItem value="P1" primaryText="P1"/>
                            <MenuItem value="P2" primaryText="P2"/>
                            <MenuItem value="P3" primaryText="P3"/>
                        </SelectField>
                        <br/>
                        <SelectField fullWidth={true} value={this.state.status} onChange={this.onChangeStatus}
                                     floatingLabelText="Status">
                            <MenuItem value="New" primaryText="New"/>
                            <MenuItem value="Open" primaryText="Open"/>
                            <MenuItem value="Closed" primaryText="Closed"/>
                        </SelectField>
                        <br/>
                        <TextField fullWidth={true} floatingLabelText="Bug Title" multiLine={true}
                                   value={this.state.title} onChange={this.onChangeTitle}/>
                        <br/>
                        <TextField fullWidth={true} floatingLabelText="Owner"
                                   value={this.state.owner} onChange={this.onChangeOwner}/>
                        <br/>
                        <RaisedButton label="Save" primary={true} onTouchTap={this.onSubmit}/>
                        <FlatButton label="Back to Bug List" href="/#/bugs"
                                    style={{verticalAlign: 'top'}}/>
                        <Snackbar open={this.state.successVisible} message="Changes saved, thank you."
                                  autoHideDuration={5000} action="ok"
                                  onActionTouchTap={this.dismissSuccessMessage}
                                  onRequestClose={this.dismissSuccessMessage}/>
                    </CardText>
                </Card>
            </div>
        )
    }
});

module.exports = BugEdit;