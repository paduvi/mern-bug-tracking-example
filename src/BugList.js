/**
 * Created by Cho To Xau Tinh on 03-Oct-16.
 */
var React = require('react');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugList = React.createClass({
    getInitialState: function () {
        return {
            bugs: []
        }
    },
    componentDidMount: function () {
        $.ajax("/api/bugs").done(function (result) {
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
            var bugs = this.state.bugs.slice();
            bugs.push(data);
            this.setState({
                bugs: bugs
            });
            $("input[name='owner']").val("");
            $("input[name='title']").val("");
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <h1>Bug Tracker</h1>
                <BugFilter />
                <BugTable bugs={this.state.bugs}/>
                <BugAdd addBug={this.addBug}/>
            </div>
        )
    }
});

var BugTable = React.createClass({
    render: function () {
        var bugRows = this.props.bugs.map(bug=>(
            <BugRow data={bug} key={bug._id}/>
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

var BugRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>{this.props.data.status}</td>
                <td>{this.props.data.priority}</td>
                <td>{this.props.data.owner}</td>
                <td>{this.props.data.title}</td>
            </tr>
        )
    }
});

module.exports = BugList;