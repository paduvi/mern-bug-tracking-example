/**
 * Created by Cho To Xau Tinh on 03-Oct-16.
 */
var React = require('react');
var $ = require('jquery');
var withRouter = require('react-router').withRouter;
var Link = require('react-router').Link;
var Paper = require('material-ui').Paper;
var Table = require('material-ui').Table;
var TableBody = require('material-ui').TableBody;
var TableHeader = require('material-ui').TableHeader;
var TableHeaderColumn = require('material-ui').TableHeaderColumn;
var TableRow = require('material-ui').TableRow;
var TableRowColumn = require('material-ui').TableRowColumn;
var Colors = require('material-ui/styles').colors;
var AppBar = require('material-ui').AppBar;

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = React.createClass({
    getStyle: function (width, bug) {
        var style = {height: 24};
        if (width) style.width = width;
        if (bug.priority == 'P1') style.color = 'red';
        return style;
    },
    render: function () {
        var bug = this.props.bug;
        return (
            <TableRow hoverable={true}>
                <TableRowColumn style={this.getStyle(180, bug)}>
                    <Link to={'/bugs/' + bug._id}
                          style={{textDecoration: "none", cursor: "pointer"}}>{bug._id}</Link>
                </TableRowColumn>
                <TableRowColumn style={this.getStyle(40, bug)}>{bug.status}</TableRowColumn>
                <TableRowColumn style={this.getStyle(40, bug)}>{bug.priority}</TableRowColumn>
                <TableRowColumn style={this.getStyle(60, bug)}>{bug.owner}</TableRowColumn>
                <TableRowColumn style={this.getStyle(undefined, bug)}>{bug.title}</TableRowColumn>
            </TableRow>
        )
    }
});

var BugTable = React.createClass({
    render: function () {
        var bugRows = this.props.bugs.map(bug=>(
            <BugRow bug={bug} key={bug._id}/>
        ))
        return (
            <Paper zDepth={1} style={{marginTop: 10, marginBottom: 10}}>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow style={{backgroundColor: Colors.lightBlueA700}}>
                            <TableHeaderColumn style={{width: 180, color: 'white'}}>Id</TableHeaderColumn>
                            <TableHeaderColumn style={{width: 40, color: 'white'}}>Status</TableHeaderColumn>
                            <TableHeaderColumn style={{width: 40, color: 'white'}}>Priority</TableHeaderColumn>
                            <TableHeaderColumn style={{width: 60, color: 'white'}}>Owner</TableHeaderColumn>
                            <TableHeaderColumn style={{color: 'white'}}>Title</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={true}>
                        {bugRows}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
});

var BugList = React.createClass({
    getInitialState: function () {
        return {
            bugs: []
        }
    },
    componentDidMount: function () {
        this.loadData();
    },
    componentDidUpdate: function (prevProps) {
        var oldQuery = prevProps.location.query;
        var newQuery = this.props.location.query;
        if (oldQuery.priority === newQuery.priority &&
            oldQuery.status === newQuery.status) {
            return;
        }
        this.loadData();
    },
    changeFilter: function (newFilter) {
        this.props.router.push({
            search: '?' + $.param(newFilter)
        });
    },
    loadData: function () {
        var query = this.props.location.query || {};
        var filter = {
            priority: query.priority,
            status: query.status
        };
        $.ajax({
            url: "/api/bugs",
            method: "GET",
            data: filter
        }).done(function (result) {
            this.setState({
                bugs: result
            });
        }.bind(this));
    },
    addBug: function (bug) {
        $.ajax({
            url: "/api/bugs",
            method: "POST",
            data: bug
        }).done(function (data) {
            var bugsModified = this.state.bugs.concat(data);
            this.setState({
                bugs: bugsModified
            });
        }.bind(this)).fail(function (xhr, status, err) {
            console.log("Error adding bug:", err);
        })
    },
    render: function () {
        return (
            <div>
                <AppBar title="React Bug Tracker" showMenuIconButton={false}/>
                <BugFilter applyFilter={this.changeFilter} initFilter={this.props.location.query}/>
                <BugTable bugs={this.state.bugs}/>
                <BugAdd addBug={this.addBug}/>
            </div>
        )
    }
});

module.exports = withRouter(BugList);