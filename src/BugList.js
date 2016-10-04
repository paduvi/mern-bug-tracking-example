/**
 * Created by Cho To Xau Tinh on 03-Oct-16.
 */
var React = require('react');
var $ = require('jquery');
var withRouter = require('react-router').withRouter;
var Link = require('react-router').Link;

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td><Link to={'/bugs/' + this.props.bug._id}>{this.props.bug._id}</Link></td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
            </tr>
        )
    }
});

var BugTable = React.createClass({
    render: function () {
        var bugRows = this.props.bugs.map(bug=>(
            <BugRow bug={bug} key={bug._id}/>
        ))
        return (
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Owner</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                {bugRows}
                </tbody>
            </table>
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
            $("input[name='owner']").val("");
            $("input[name='title']").val("");
        }.bind(this)).fail(function (xhr, status, err) {
            console.log("Error adding bug:", err);
        })
    },
    render: function () {
        return (
            <div>
                <h1>Bug Tracker</h1>
                <BugFilter applyFilter={this.changeFilter} initFilter={this.props.location.query}/>
                <BugTable bugs={this.state.bugs}/>
                <BugAdd addBug={this.addBug}/>
            </div>
        )
    }
});

module.exports = withRouter(BugList);