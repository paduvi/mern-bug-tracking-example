/**
 * Created by chotoxautinh on 9/29/16.
 */

var bugs = [{
    id: 1,
    status: 'fixed',
    priority: 1,
    owner: 'Việt',
    title: 'Bug tính lương'
}, {
    id: 2,
    status: 'unfixed',
    priority: 2,
    owner: 'Việt',
    title: 'Bug video server'
}]

var BugList = React.createClass({
    getInitialState: function () {
        return {
            bugs: this.props.bugs
        }
    },
    addBug: function () {
        var bugs = this.state.bugs.slice();
        bugs.push({
            id: 3,
            status: 'unfixed',
            priority: 2,
            owner: 'Việt',
            title: 'Bug video server 2'
        });
        this.setState({
            bugs: bugs
        });
    },
    render: function () {
        return (
            <div>
                <h1>Bug Tracker</h1>
                <button onClick={this.addBug}>Test Add Bug</button>
                <BugFilter />
                <BugTable bugs={this.state.bugs}/>
                <BugAdd />
            </div>
        )
    }
});
var BugFilter = React.createClass({
    render: ()=>(
        <div>
            A way to filter the list of bugs would come here.
        </div>
    )
});

var BugTable = React.createClass({
    render: function () {
        var bugRows = this.props.bugs.map(bug=>(
            <BugRow data={bug} key={bug.id}/>
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
                <td>{this.props.data.id}</td>
                <td>{this.props.data.status}</td>
                <td>{this.props.data.priority}</td>
                <td>{this.props.data.owner}</td>
                <td>{this.props.data.title}</td>
            </tr>
        )
    }
})

var BugAdd = React.createClass({
    render: ()=>(
        <div>
            <input type="text" name="owner" placeholder="Owner"/>
            <input type="text" name="title" placeholder="Title"/>
            <input type="submit" name="submit" value="Add Bug"/>
        </div>
    )
});
ReactDOM.render(
    <BugList bugs={bugs}/>,
    document.getElementById('main')
);