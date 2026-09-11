Ext.define('EvalApp.view.school.attempts.OverviewPanel', {
    extend: 'Ext.form.Panel',

    xtype: 'attempt-overview-panel',

    title: 'Overview',
    controller: 'test-attempts',

    iconCls: 'x-fa fa-info-circle',

    bodyPadding: 20,
    

    scrollable: true,

    config: {
        attemptRecord: null
    },

    defaults: {
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    },

    tbar: [{
        text: 'Evaluate',
        iconCls: 'x-fa fa-magic',

        handler: 'evaluateTest'
    }, {
        text: 'Refresh',
        iconCls: 'x-fa fa-refresh',

        handler: 'refreshDetailsWindow'
    }],

    items: [{
        margin: '0 0 15 0',

        defaults: {
            xtype: 'fieldset',
            flex: 1,
            margin: '0 8 0 0',
            padding: 20,
            cls: 'attempt-card',
            defaults: {
                xtype: 'displayfield',
                labelWidth: 110,
                labelStyle: 'font-weight:600;color:#666;',
                fieldStyle:
                    'font-size:14px;' +
                    'color:#222;'
            }
        },

        items: [{
            title: 'Student',

            margin: '0 8 0 0',

            items: [{
                fieldLabel: 'Student',
                name: 'full_name'
            }, {
                fieldLabel: 'Student ID',
                name: 'student_id'
            }]
        }, {
            title: 'Test',

            margin: '0 0 0 8',

            items: [{
                fieldLabel: 'Test',
                name: 'title'
            }, {
                fieldLabel: 'Test ID',
                name: 'test_id'
            }, {
                fieldLabel: 'Attempt ID',
                name: 'id'
            }]
        }]
    }, {
        defaults: {
            xtype: 'fieldset',

            flex: 1,

            padding: 20,

            cls: 'attempt-card',

            defaults: {
                xtype: 'displayfield',

                labelWidth: 110,

                labelStyle: 'font-weight:600;color:#666;',

                fieldStyle:
                    'font-size:14px;' +
                    'color:#222;'
            }
        },

        items: [{
            title: 'Attempt Status',

            margin: '0 8 0 0',

            items: [{
                fieldLabel: 'Status',
                name: 'status'
            }, {
                fieldLabel: 'Started',
                name: 'started_at'
            }, {
                fieldLabel: 'Submitted',
                name: 'submitted_at'
            }, {
                fieldLabel: 'Graded',
                name: 'graded_at'
            }]
        }, {
            title: 'Grade',

            margin: '0 0 0 8',

            items: [{
                fieldLabel: 'Score',
                name: 'score'
            }, {
                fieldLabel: 'Percentage',
                name: 'percentage'
            }, {
                fieldLabel: 'Result',
                name: 'passed'
            }]
        }]
    }],

    listeners: {
        afterrender: 'showSummary',
    },

});