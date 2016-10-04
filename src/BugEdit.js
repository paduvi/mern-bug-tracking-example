/**
 * Created by Cho To Xau Tinh on 04-Oct-16.
 */
var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var BugEdit = React.createClass({
    getInitialState: function () {
        return {}
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
    onChangeStatus: function (e) {
        this.setState({status: e.target.value});
    },
    onChangePriority: function (e) {
        this.setState({priority: e.target.value});
    },
    onChangeOwner: function (e) {
        this.setState({owner: e.target.value});
    },
    onChangeTitle: function (e) {
        this.setState({title: e.target.value});
    },
    onSubmit: function (e) {
        e.preventDefault();
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
        }.bind(this)).fail(function (xhr, status, err) {
            console.log("Error editing bug:", err);
        })
    },
    render: function () {
        return (
            <div>
                <h4>Edit bug {this.state._id}</h4>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="status">Status:</label>
                        <select value={this.state.status} name="status" id="status" onChange={this.onChangeStatus}>
                            <option value="">(Any)</option>
                            <option value="New">New</option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority">Priority:</label>
                        <select value={this.state.priority} name="priority" id="priority"
                                onChange={this.onChangePriority}>
                            <option value="">(Any)</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                            <option value="P3">P3</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="owner">Owner:</label>
                        <input type="text" name="owner" id="owner" value={this.state.owner}
                               onChange={this.onChangeOwner}/>
                    </div>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" id="title" value={this.state.title}
                               onChange={this.onChangeTitle}/>
                    </div>
                    <button onClick={this.onSubmit}>Submit</button>
                    <Link to="/bugs">Back to Bug List</Link>
                </form>
            </div>
        )
    }
});

module.exports = BugEdit;