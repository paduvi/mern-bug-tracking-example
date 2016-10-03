/**
 * Created by Cho To Xau Tinh on 03-Oct-16.
 */
var React = require('react');

var BugFilter = React.createClass({
    getInitialState: function () {
        return {
            status: this.props.initFilter.status,
            priority: this.props.initFilter.priority
        };
    },
    componentWillReceiveProps: function (newProps) {
        if (newProps.initFilter.status === this.state.status
            && newProps.initFilter.priority === this.state.priority) {
            return;
        }
        this.setState({
            status: newProps.initFilter.status,
            priority: newProps.initFilter.priority
        });
    },
    onChangeStatus: function (e) {
        this.setState({status: e.target.value});
    },
    onChangePriority: function (e) {
        this.setState({priority: e.target.value});
    },
    submitFilter: function (e) {
        e.preventDefault();
        var newFilter = {};
        if (this.state.priority) newFilter.priority = this.state.priority;
        if (this.state.status) newFilter.status = this.state.status;
        this.props.applyFilter(newFilter);
    },
    render: function () {
        return (
            <div>
                <form onSubmit={this.submitFilter}>
                    <select id="statusFilter" value={this.state.status} onChange={this.onChangeStatus}>
                        <option value="">(Any)</option>
                        <option value="New">New</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <select id="priorityFilter" value={this.state.priority} onChange={this.onChangePriority}>
                        <option value="">(Any)</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>
                    <button onClick={this.submitFilter}>Apply</button>
                </form>
            </div>
        );
    }
});

module.exports = BugFilter;