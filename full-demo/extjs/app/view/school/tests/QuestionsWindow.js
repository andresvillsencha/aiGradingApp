Ext.define('EvalApp.view.school.tests.QuestionsWindow', {
    extend: 'Ext.window.Window',

    xtype: 'questions-window',

    requires: [
        'EvalApp.view.school.tests.QuestionDetailsWindow'
    ],

    modal: true,
    title: 'Questions',

    width: 1000,
    height: 600,

    layout: 'fit',

    testRecord: null,
    
    initComponent: function () {
        var me = this,
            testId = me.testRecord.get('id'),
            testTitle = me.testRecord.get('title');

        me.title = 'Questions - ' + testTitle;

        me.items = [{
            xtype: 'grid',

            listeners: {
                itemdblclick: function (grid, record) {
                    Ext.create('EvalApp.view.school.tests.QuestionDetailsWindow', {
                        questionRecord: record
                    }).show();
                }
            },

            store: {
                fields: [
                    { name: 'id', type: 'int' },
                    { name: 'test_id', type: 'int' },
                    { name: 'question_text', type: 'string' },
                    { name: 'reference_answer', type: 'string' },
                    { name: 'grading_criteria', type: 'string' },
                    { name: 'max_score', type: 'int' },
                    { name: 'sort_order', type: 'int' }
                ],

                proxy: {
                    type: 'ajax',

                    url: 'http://localhost:3000/api/tests/' +
                        testId +
                        '/questions',

                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        totalProperty: 'count',
                        successProperty: 'success'
                    }
                },

                autoLoad: true
            },

            columns: [{
                text: '#',
                dataIndex: 'sort_order',
                width: 60,
                align: 'center'
            }, {
                text: 'Question',
                dataIndex: 'question_text',
                flex: 2
            }, {
                text: 'Reference',
                dataIndex: 'reference_answer',
                flex: 1
            }, {
                text: 'Critirea',
                dataIndex: 'grading_criteria',
                flex: 1
            }, {
                text: 'Max Score',
                dataIndex: 'max_score',
                width: 100,
                align: 'center'
            }]
        }];

        me.buttons = [{
            text: 'Close',

            handler: function (button) {
                button.up('window').close();
            }
        }];

        me.callParent(arguments);
    }
});