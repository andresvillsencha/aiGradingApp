/**
 * Controller for browsing, grading, and refreshing test-attempt details.
 *
 * Coordinates the attempts grid, details window, AI grading endpoint, and the
 * summary/answer refresh flow after grading.
 */
Ext.define('EvalApp.view.school.attempts.TestAttemptsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.test-attempts',

    /**
     * Handles the action-column click used to open an attempt.
     *
     * @param {Ext.view.View} view Grid view that fired the action.
     * @param {Number} rowIndex Row index supplied by the action column.
     * @param {Number} colIndex Column index supplied by the action column.
     * @param {HTMLElement} item Action element that was clicked.
     * @param {Ext.event.Event} e Click event.
     * @param {Ext.data.Model} record Attempt record associated with the action.
     * @returns {void}
     */
    onViewAttempt: function (view, rowIndex, colIndex, item, e, record) {
        this.openDetailsWindow(record);
    },

    /**
     * Opens attempt details when a grid row is double-clicked.
     *
     * @param {Ext.grid.Panel} grid Attempts grid that fired the event.
     * @param {Ext.data.Model} record Attempt record that was double-clicked.
     * @returns {void}
     */
    onAttemptDoubleClick: function (grid, record) {
        this.openDetailsWindow(record);
    },

    /**
     * Creates and shows the details window for an attempt record.
     *
     * @param {Ext.data.Model} record Attempt to display.
     * @returns {void}
     */
    openDetailsWindow: function (record) {
        Ext.create(
            'EvalApp.view.school.attempts.DetailsWindow',
            {
                attemptRecord: record
            }
        ).show();
    },

    /**
     * Confirms AI evaluation, sends the grading request, and refreshes the UI.
     *
     * The attempt ID is taken from the details window's current attempt record and
     * sent to the backend grading endpoint.
     *
     * @param {Ext.button.Button} btn Evaluate button that fired the handler.
     * @returns {void}
     */
    evaluateTest: function (btn) {
        let me=this;
        let view=btn.up('attempt-details-window');
        let attemptId = (view.attemptRecord!==null) ? view.attemptRecord.get('id') : 0;

        /**
         * Ask for confirmation before overwriting any existing grading.
         * The callback receives the selected button identifier in `option` and
         * does not return a value.
         */
        Ext.Msg.confirm('Continue?','Will perform AI evaluation, overwriting current grading.', function (option) {
            if (option==='yes') {
                let mask=new Ext.LoadMask({
                    target: view,
                    msg: 'Performing evaluation...'
                });
                mask.show();

                // Send the selected attempt to the backend AI grading endpoint.
                Ext.Ajax.request({
                    url: 'http://localhost:3000/api/attempts/' + attemptId + '/grade',
                    method: 'POST',

                    /**
                     * Handles a successful response from the grading endpoint.
                     *
                     * @param {Object} response Ajax response returned by the backend.
                     * @returns {void}
                     */
                    success: function (response) {
                        mask.hide();
                        let result = Ext.decode(response.responseText);

                        me.refreshDetailsWindow();

                        Ext.Msg.alert(
                            'Grading Complete',
                            'The test has been graded successfully.'
                        );
                    },

                    /**
                     * Handles an unsuccessful grading request.
                     *
                     * @param {Object} response Ajax error response returned by the backend.
                     * @returns {void}
                     */
                    failure: function (response) {
                        mask.hide();
                        Ext.Msg.alert(
                            'Grading Error',
                            'Unable to grade the test.'
                        );
                    },
                });                    
            }

        });
    },

    /**
     * Reloads the current attempt from the backend after grading or refresh.
     *
     * @returns {void}
     */
    loadAttempt: function () {
        let me=this;
        let view = Ext.getCmp('details-summary');
        let attemptId = view.getAttemptRecord().id;

        Ext.Ajax.request({
            url: 'http://localhost:3000/api/attempts/' + attemptId,
            method: 'GET',

            /**
             * Replaces the local attempt data with the latest backend response.
             *
             * @param {Object} response Ajax response containing the refreshed attempt.
             * @returns {void}
             */
            success: function (response) {
                var result = Ext.decode(response.responseText);

                view.attemptRecord.data = result.data;

                me.showSummary(view);
            },

            /**
             * Reports a failure to reload the latest attempt information.
             *
             * @param {Object} response Ajax error response returned by the backend.
             * @returns {void}
             */
            failure: function (response) {
                Ext.Msg.alert(
                    'Error',
                    'Unable to reload attempt information.'
                );
            }
        });
    },

    /**
     * Formats the selected attempt and populates the overview form.
     *
     * @param {Ext.form.Panel} panel Overview panel that owns the attempt record.
     * @returns {void}
     */
    showSummary: function (panel) {
        let record = panel.getAttemptRecord();
        let me=this;

        if (!record) {return;}

        let values = Ext.apply({}, record.data);

        values.status =
            '<span class="attempt-status attempt-status-' +
            values.status +
            '">' +
            Ext.String.capitalize(values.status || '') +
            '</span>';

        values.started_at = me.formatDate(values.started_at);
        values.submitted_at = me.formatDate(values.submitted_at);
        values.graded_at = me.formatDate(values.graded_at);
        values.score = me.formatValue(values.score) + '/' + me.formatValue(values.max_score);
        values.percentage = me.formatPercentage(values.percentage);
        values.passed = me.formatPassed( record.get('passed'), record.get('status')==='graded' );

        panel.getForm().setValues(values);
    },

    /**
     * Formats a date value for the attempt summary.
     *
     * @param {Date|String|null} value Date value to format.
     * @returns {String} Formatted date/time or '-' when no value exists.
     */
    formatDate: function (value) {
        return value
            ? Ext.Date.format(Ext.isDate(value) ? value : new Date(value), 'm/d/Y H:i')
            : '-';
    },

    /**
     * Converts null or undefined summary values to a display placeholder.
     *
     * @param {*} value Value to display.
     * @returns {*} Original value, or '-' when the value is null/undefined.
     */
    formatValue: function (value) {
        return value === null || value === undefined
            ? '-'
            : value;
    },

    /**
     * Formats a numeric grade percentage for the summary panel.
     *
     * @param {Number|null} value Percentage value.
     * @returns {String} Percentage text or '-' when no value exists.
     */
    formatPercentage: function (value) {
        return value === null || value === undefined
            ? '-'
            : value + '%';
    },

    /**
     * Builds the styled pass/fail status shown in the attempt summary.
     *
     * @param {Boolean} passed Whether the attempt passed.
     * @param {Boolean} isGraded Whether grading has been completed.
     * @returns {String} Styled HTML status label.
     */
    formatPassed: function (passed, isGraded) {
        if (isGraded) {
            if (passed) {
                return '<span style="background-color: #396; color:#fff; padding: 8px 16px; border-radius: 8px;">Passed</span>';
            } else {
                return '<span style="background-color: #933; color:#fff; padding: 8px 16px; border-radius: 8px;">Failed</span>';
            }
        } 
        return '<span style="background-color: #666; color:#fff; padding: 8px 16px; border-radius: 8px;">Not Graded</span>';
    },

    /**
     * Refreshes the answer grid, attempts grid, and attempt summary data.
     *
     * @returns {void}
     */
    refreshDetailsWindow: function () {
        let me=this;
        let dAnswers = Ext.getCmp('details-answers');
        let vGrid = Ext.getCmp('tests-grid');

        dAnswers.getStore().load();
        vGrid.getStore().load();
        me.loadAttempt();
    }
});