Ext.define('EvalApp.view.school.tests.TestsView', {
    extend: 'Ext.grid.Panel',
    xtype: 'tests-view',

    requires: [
        'EvalApp.store.Tests',
        'EvalApp.view.school.tests.TestsController'
    ],

    controller: 'tests',

    store: {
        type: 'tests'
    },

    title: 'Tests',

    tbar: [{
        text: 'New Test',
        iconCls: 'x-fa fa-plus',
        handler: 'onNewTest'
    }],

    columns: [{
        text: 'Id',
        dataIndex: 'id',
        width: 70
    }, {
        text: 'Title',
        dataIndex: 'title',
        flex: 2
    }, {
        text: 'Description',
        dataIndex: 'description',
        flex: 3
    }, {
        text: 'Passing Score',
        dataIndex: 'passing_score',
        width: 120,
        align: 'center',
        renderer: function (value) {
            return value + '%';
        }
    }, {
        text: 'Questions',
        dataIndex: 'question_count',
        width: 100,
        align: 'center'
    }, {
        text: 'Status',
        dataIndex: 'status',
        width: 100,
        align: 'center',
        renderer: function (value) {
            if (value === 'active') {
                return '<b style="color:#396;">Active</b>';
            }

            return '<b style="color:#933;">Not Active</b>';
        }
    }, {
        xtype: 'actioncolumn',
        text: 'Actions',
        width: 80,
        align: 'center',

        items: [{
            iconCls: 'x-fa fa-edit',
            tooltip: 'Edit Test',
            handler: 'onEditTest'
        }, {
            iconCls: 'x-fa fa-clipboard-question',
            tooltip: 'View Questions',
            handler: 'onViewQuestions'
        }]
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying tests {0} - {1} of {2}',
        emptyMsg: 'No tests to display'
    }
});