Ext.define('EvalApp.view.school.attempts.AnswersPanel', {
    extend: 'Ext.grid.Panel',

    xtype: 'attempt-answers-panel',

    requires: [
        'EvalApp.store.AttemptAnswers'
    ],

    title: 'Responses',

    controller: 'test-attempts',
    

    iconCls: 'x-fa fa-list-alt',

    attemptRecord: null,

    plugins: {
        rowexpander: {
            rowBodyTpl: new Ext.XTemplate(
                '<p><b>Question:</b><br> {question_text}</p>',
                '<p style="color:{score:this.colorAnswer}"><b>Answer:</b><br>{answer_text}</p>',
                '<p><b>Feedback:</b><br>{feedback}</p>',
                '<p><b>Reference:</b><br>{reference_answer}</p>',
                {
                    colorAnswer: function (score) {
                        return (score>=7) ? "#396" : "#933";
                    }
                }
            )
        }
    },

    columns: [{
        text: '#',
        dataIndex: 'question_id',
        width: 60,
        align: 'center'
    }, {
        text: 'Question',
        dataIndex: 'question_text',
        flex: 1,
        cellWrap: true
    }, {
        text: 'Student Answer',
        dataIndex: 'answer_text',
        flex: 2,
        cellWrap: true
    }, {
        text: 'Reference Answer',
        dataIndex: 'reference_answer',
        flex: 1,
        cellWrap: true,
        hidden:true
    }, {
        text: 'Feedback',
        dataIndex: 'feedback',
        flex: 1,
        cellWrap: true,
        hidden:true
    }, {
        text: 'Score',
        dataIndex: 'score',
        width: 80,
        align: 'center',

        renderer: function (value, a, row) {
            let maxScore = row.get('max_score') || '-';
            let newValue = (value === null || value === undefined) ? "-" : value;
            let color = (isNaN(value)) ? "#666" : ((value>=maxScore*0.7) ? "#396" : "#933");

            return `<span style="background-color:${color}; border-radius: 8px; color:#fff; padding: 4px 8px;">${newValue}/${maxScore}</span>`;
        }
    }, {
        text: 'Status',
        dataIndex: 'grading_status',
        width: 100,
        align: 'center',

        renderer: function (value) {
            if (value === 'graded') {
                return '<b style="color:#396;">Graded</b>';
            }

            if (value === 'pending') {
                return '<b style="color:#996600;">Pending</b>';
            }

            return Ext.String.capitalize(value || '');
        }
    }],

    tbar: [{
        text: 'Evaluate',
        iconCls: 'x-fa fa-magic',

        handler: 'evaluateTest'
    }, {
        text: 'Refresh',
        iconCls: 'x-fa fa-refresh',

        handler: 'refreshDetailsWindow'
    }],

    initComponent: function () {
        let me = this,
            attemptId = me.attemptRecord.get('id');

        me.store = Ext.create('EvalApp.store.AttemptAnswers');

        me.store.getProxy().setUrl(
            'http://localhost:3000/api/attempts/' +
            attemptId +
            '/answers'
        );

        me.store.load();

        me.callParent(arguments);
    }
});