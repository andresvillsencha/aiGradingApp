/**
 * Window that combines the overview and answer details for one test attempt.
 *
 * The selected attempt record is passed to both child panels during component
 * initialization.
 */
Ext.define('EvalApp.view.school.attempts.DetailsWindow', {
    extend: 'Ext.window.Window',

    xtype: 'attempt-details-window',

    requires: [
        'EvalApp.view.school.attempts.AnswersPanel',
        'EvalApp.view.school.attempts.OverviewPanel'
    ],

    modal: true,

    width: 1000,
    height: 700,

    layout: 'fit',

    maximizable: true,

    attemptRecord: null,
    cls: 'attempt-details-window',

    items: [{
        xtype: 'tabpanel',

        items: [
            {
                xtype: 'attempt-overview-panel',
                id: 'details-summary'
            }, {
                xtype: 'attempt-answers-panel',
                id: 'details-answers'
            }
        ]
    }],

    buttons: [{
        text: 'Close',

        /**
         * Closes the attempt details window.
         *
         * @param {Ext.button.Button} button Close button that fired the handler.
         * @returns {void}
         */
        handler: function (button) {
            button.up('window').close();
        }
    }],

    /**
     * Initializes the window title and passes the selected attempt to both tabs.
     *
     * @returns {void}
     */
    initComponent: function () {
        var me = this,
            record = me.attemptRecord;

            me.title = 'Attempt #' +
                record.get('id') +
                ' - ' +
                record.get('full_name');

        me.items[0].items[0].attemptRecord=record;
        me.items[0].items[1].attemptRecord=record;

        me.callParent(arguments);
    }
});