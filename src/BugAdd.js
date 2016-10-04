/**
 * Created by Cho To Xau Tinh on 03-Oct-16.
 */
var React = require('react');
var $ = require('jquery');

var BugAdd = React.createClass({
    addBug: function (e) {
        e.preventDefault();
        let bug = {
            status: 'New',
            priority: 'P1',
            owner: $("input[name='owner']").val(),
            title: $("input[name='title']").val()
        }
        this.props.addBug(bug);
    },
    render: function () {
        return (
            <div>
                <form onSubmit={this.addBug}>
                    <input type="text" name="owner" placeholder="Owner"/>
                    <input type="text" name="title" placeholder="Title"/>
                    <input type="submit" name="submit" value="Add Bug" onClick={this.addBug}/>
                </form>
            </div>
        );
    }
});

module.exports = BugAdd;