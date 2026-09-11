Ext.define('EvalApp.view.tests.DetailsWindow', {
    extend: 'Ext.window.Window',
    xtype: 'details-window',

    requires: [
        'EvalApp.store.StudentAnswers'
    ],

    title: 'Questions',

    controller: 'test-attempts',

    modal: true,

    width: 1100,
    height: 650,

    layout: 'fit',

    maximizable: true,

    attemptRecord: null,
    mainGrid: null,

    initComponent: function () {
        var me = this,
            attempt = me.attemptRecord,
            attemptId = attempt.get('id');

        me.title =
            attempt.get('full_name') +
            ' - ' +
            attempt.get('title');

        me.items = [{
            xtype: 'grid',

            reference: 'answersGrid',

            store: {
                type: 'student-answers',

                proxy: {
                    type: 'ajax',
                    url: 'http://localhost:3000/api/attempts/' +
                        attemptId +
                        '/answers',

                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                },

                autoLoad: true
            },

            columns: [{
                text: '#',
                dataIndex: 'question_id',
                width: 60,
                align: 'center'
            }, {
                text: 'Question',
                dataIndex: 'question_text',
                flex: 2,

                renderer: function (value) {
                    return '<div style="white-space:normal;">' +
                        Ext.String.htmlEncode(value || '') +
                        '</div>';
                }
            }, {
                text: 'Student Answer',
                dataIndex: 'answer_text',
                flex: 2,

                renderer: function (value) {
                    return '<div style="white-space:normal;">' +
                        Ext.String.htmlEncode(value || '') +
                        '</div>';
                }
            }, {
                text: 'Score',
                dataIndex: 'score',
                width: 80,
                align: 'center',

                renderer: function (value, meta, record) {
                    if (value === null || value === undefined) {
                        return '-';
                    }

                    var maxScore = record.get('max_score');

                    return value + ' / ' + maxScore;
                }
            }, {
                text: 'Feedback',
                dataIndex: 'feedback',
                flex: 2,

                renderer: function (value) {
                    if (!value) {
                        return '-';
                    }

                    return '<div style="white-space:normal;">' +
                        Ext.String.htmlEncode(value) +
                        '</div>';
                }
            }],

            viewConfig: {
                stripeRows: true,
                emptyText: 'No answers found for this attempt.',
                deferEmptyText: false
            }
        }];

        me.tbar = [{
            text: 'Evaluate Test',
            iconCls: 'x-fa fa-check-circle',

            handler: 'onEvaluateTest'
        }, '-', {
            xtype: 'tbtext',

            text:
                '<b>Student:</b> ' +
                Ext.String.htmlEncode(attempt.get('full_name')) +
                '&nbsp;&nbsp;&nbsp;' +
                '<b>Test:</b> ' +
                Ext.String.htmlEncode(attempt.get('title'))
        }, '->', {
            text: 'Refresh',
            iconCls: 'x-fa fa-refresh',

            handler: function () {
                var grid = me.down('grid');

                grid.getStore().reload();
            }
        }];

        me.callParent(arguments);
    }

});