/**
 * Read-only detail window for a single test question.
 *
 * The question to display is supplied through `questionRecord`.
 */
Ext.define('EvalApp.view.school.tests.QuestionDetailsWindow', {
    extend: 'Ext.window.Window',

    xtype: 'question-details-window',

    title: 'Question Details',

    modal: true,

    width: 750,
    height: 600,

    layout: 'fit',

    questionRecord: null,

    /**
     * Initializes the detail form from the supplied question record.
     *
     * @returns {void}
     */
    initComponent: function () {
        var me = this,
            record = me.questionRecord;

        me.title = 'Question #' + record.get('sort_order');

        me.items = [{
            xtype: 'form',

            bodyPadding: 20,

            scrollable: true,

            defaults: {
                anchor: '100%',
                labelAlign: 'top',
                margin: '0 0 15 0'
            },

            items: [{
                xtype: 'textfield',
                fieldLabel: 'Question ID',
                value: record.get('id')
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Question',
                value: record.get('question_text')
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Reference Answer',
                value: record.get('reference_answer')
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Grading Criteria',
                value: record.get('grading_criteria')
            }, {
                xtype: 'textfield',
                fieldLabel: 'Maximum Score',
                value: record.get('max_score')
            }, {
                xtype: 'textfield',
                fieldLabel: 'Sort Order',
                value: record.get('sort_order')
            }]
        }];

        me.buttons = [{
            text: 'Close',

            /**
             * Closes the question detail window.
             *
             * @param {Ext.button.Button} button Close button that fired the handler.
             * @returns {void}
             */
            handler: function (button) {
                button.up('window').close();
            }
        }];

        me.callParent(arguments);
    }
});