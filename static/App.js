'use strict';

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
}];

var BugList = React.createClass({
    displayName: 'BugList',

    getInitialState: function getInitialState() {
        return {
            bugs: this.props.bugs
        };
    },
    addBug: function addBug() {
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
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Bug Tracker'
            ),
            React.createElement(
                'button',
                { onClick: this.addBug },
                'Test Add Bug'
            ),
            React.createElement(BugFilter, null),
            React.createElement(BugTable, { bugs: this.state.bugs }),
            React.createElement(BugAdd, null)
        );
    }
});
var BugFilter = React.createClass({
    displayName: 'BugFilter',

    render: function render() {
        return React.createElement(
            'div',
            null,
            'A way to filter the list of bugs would come here.'
        );
    }
});

var BugTable = React.createClass({
    displayName: 'BugTable',

    render: function render() {
        var bugRows = this.props.bugs.map(function (bug) {
            return React.createElement(BugRow, { data: bug, key: bug.id });
        });
        return React.createElement(
            'table',
            null,
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        null,
                        'Id'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Status'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Priority'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Owner'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Title'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                bugRows
            )
        );
    }
});

var BugRow = React.createClass({
    displayName: 'BugRow',

    render: function render() {
        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                this.props.data.id
            ),
            React.createElement(
                'td',
                null,
                this.props.data.status
            ),
            React.createElement(
                'td',
                null,
                this.props.data.priority
            ),
            React.createElement(
                'td',
                null,
                this.props.data.owner
            ),
            React.createElement(
                'td',
                null,
                this.props.data.title
            )
        );
    }
});

var BugAdd = React.createClass({
    displayName: 'BugAdd',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
            React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
            React.createElement('input', { type: 'submit', name: 'submit', value: 'Add Bug' })
        );
    }
});
ReactDOM.render(React.createElement(BugList, { bugs: bugs }), document.getElementById('main'));