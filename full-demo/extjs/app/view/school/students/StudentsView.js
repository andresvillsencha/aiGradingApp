Ext.define('EvalApp.view.school.students.StudentsView', {
    extend: 'Ext.grid.Panel',
    xtype: 'students-view',

    requires: [
        'EvalApp.store.Students',
        'EvalApp.view.school.students.StudentsController'
    ],

    store: {
        type: 'students'
    },

    title: 'Students',

    controller: 'students',

    tbar: [{
        text: 'New Student',
        iconCls: 'x-fa fa-plus',
        handler: 'onNewStudent'
    }],

    columns: [{
        text: 'Id',
        dataIndex: 'id',
        width: 80
    }, {
        text: 'Full Name',
        dataIndex: 'full_name',
        flex: 1
    }, {
        text: 'E-mail',
        dataIndex: 'email',
        flex: 2
    }, {
        text: 'Active',
        dataIndex: 'active',
        width: 80,
        renderer: function (value) {
            return (value==1) ? '<b style="color:#396;">Active</b>' : '<b style="color:#933;">Not Active</b>'
        }
    }, {
        xtype: 'actioncolumn',
        text: 'Actions',
        width: 80,
        align: 'center',

        items: [{
            iconCls: 'x-fa fa-edit',
            tooltip: 'Edit Student',
            handler: 'onEditStudent'
        }]
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: "No topics to display"
    }

});