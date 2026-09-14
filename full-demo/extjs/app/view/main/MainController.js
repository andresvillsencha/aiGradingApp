/**
 * Controller for the application's main view.
 *
 * Contains the handlers used by the sample personnel view included with the
 * generated Ext JS application.
 */
Ext.define('EvalApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    /**
     * Handles selection of a record in the sample personnel list and asks the
     * user to confirm the selection.
     *
     * @param {Ext.Component} sender Component that fired the selection event.
     * @param {Ext.data.Model} record Selected record.
     * @returns {void}
     */
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    /**
     * Receives the result of the confirmation dialog.
     *
     * @param {String} choice Button identifier selected by the user.
     * @returns {void}
     */
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
