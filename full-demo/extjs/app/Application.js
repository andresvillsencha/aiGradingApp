/**
 * Main Ext JS application class for EvalApp.
 *
 * Ext.application creates this class from app.js. Application-wide behavior,
 * such as responding to a detected application update, is handled here.
 */
Ext.define('EvalApp.Application', {
    extend: 'Ext.app.Application',

    name: 'EvalApp',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    /**
     * Prompts the user to reload when Sencha detects a newer application build.
     *
     * @returns {void}
     */
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            /**
             * Handles the user's response to the reload confirmation dialog.
             *
             * @param {String} choice Button identifier selected by the user.
             * @returns {void}
             */
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
