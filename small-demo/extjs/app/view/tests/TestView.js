Ext.define('EvalApp.view.tests.TestView', {
    extend: 'Ext.grid.Panel',
    xtype: 'tests-view',

    title: 'Test Attempts',

    requires: [
        'EvalApp.store.TestAttempts',
        'EvalApp.view.tests.TestController'
    ],

    controller: 'test-attempts',

    store: {
        type: 'test-attempts'
    },

    listeners: {
        itemdblclick: 'onAttemptDoubleClick'
    },

    columns: [{
        text: 'ID',
        dataIndex: 'id',
        width: 70
    }, {
        text: 'Student',
        dataIndex: 'full_name',
        flex: 1,
        minWidth: 160
    }, {
        text: 'Test',
        dataIndex: 'title',
        flex: 2,
        minWidth: 220
    }, {
        text: 'Status',
        dataIndex: 'status',
        width: 120,
        align: 'center',

        renderer: function (value) {
            switch (value) {
                case 'graded':
                    return '<b style="color:green;">Graded</b>';

                case 'submitted':
                    return '<b style="color:#369;">Submitted</b>';

                default:
                    return Ext.String.capitalize(value || 'Pending');
            }
        }
    }, {
        text: 'Score',
        dataIndex: 'score',
        width: 90,
        align: 'center',

        renderer: function (value, meta, record) {
            if (value === null || value === undefined) {
                return '-';
            }

            var maxScore = record.get('max_score');

            if (maxScore !== null && maxScore !== undefined) {
                return value + ' / ' + maxScore;
            }

            return value;
        }
    }, {
        text: 'Percentage',
        dataIndex: 'percentage',
        width: 110,
        align: 'center',

        renderer: function (value) {
            if (value === null || value === undefined) {
                return '-';
            }

            return Ext.util.Format.number(value, '0.00') + '%';
        }
    }, {
        text: 'Passed',
        dataIndex: 'passed',
        width: 90,
        align: 'center',

        renderer: function (value, meta, record) {
            if (record.get('status') !== 'graded') {
                return '-';
            }

            return value
                ? '<span style="color:green;font-weight:bold;">Yes</span>'
                : '<span style="color:red;font-weight:bold;">No</span>';
        }
    }, {
        text: 'Started',
        dataIndex: 'started_at',
        xtype: 'datecolumn',
        format: 'm/d/Y H:i',
        width: 145
    }, {
        text: 'Submitted',
        dataIndex: 'submitted_at',
        xtype: 'datecolumn',
        format: 'm/d/Y H:i',
        width: 145
    }, {
        text: 'Graded',
        dataIndex: 'graded_at',
        xtype: 'datecolumn',
        format: 'm/d/Y H:i',
        width: 145
    }],

    viewConfig: {
        emptyText: 'No test attempts found.',
        deferEmptyText: false,
        stripeRows: true
    }

});