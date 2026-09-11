Ext.define('EvalApp.view.school.attempts.TestAttemptsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.test-attempts',

    onViewAttempt: function (view, rowIndex, colIndex, item, e, record) {
        this.openDetailsWindow(record);
    },

    onAttemptDoubleClick: function (grid, record) {
        this.openDetailsWindow(record);
    },

    openDetailsWindow: function (record) {
        Ext.create(
            'EvalApp.view.school.attempts.DetailsWindow',
            {
                attemptRecord: record
            }
        ).show();
    },

    evaluateTest: function (btn) {
        let me=this;
        let view=btn.up('attempt-details-window');
        let attemptId = (view.attemptRecord!==null) ? view.attemptRecord.get('id') : 0;

        Ext.Msg.confirm('Continue?','Will perform AI evaluation, overwriting current grading.', function (option) {
            if (option==='yes') {
                let mask=new Ext.LoadMask({
                    target: view,
                    msg: 'Performing evaluation...'
                });
                mask.show();

                Ext.Ajax.request({
                    url: 'http://localhost:3000/api/attempts/' + attemptId + '/grade',
                    method: 'POST',

                    success: function (response) {
                        mask.hide();
                        let result = Ext.decode(response.responseText);

                        me.refreshDetailsWindow();

                        Ext.Msg.alert(
                            'Grading Complete',
                            'The test has been graded successfully.'
                        );
                    },

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

    loadAttempt: function () {
        let me=this;
        let view = Ext.getCmp('details-summary');
        let attemptId = view.getAttemptRecord().id;

        Ext.Ajax.request({
            url: 'http://localhost:3000/api/attempts/' + attemptId,
            method: 'GET',

            success: function (response) {
                var result = Ext.decode(response.responseText);

                view.attemptRecord.data = result.data;

                me.showSummary(view);
            },

            failure: function (response) {
                Ext.Msg.alert(
                    'Error',
                    'Unable to reload attempt information.'
                );
            }
        });
    },

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

    formatDate: function (value) {
        return value
            ? Ext.Date.format(Ext.isDate(value) ? value : new Date(value), 'm/d/Y H:i')
            : '-';
    },

    formatValue: function (value) {
        return value === null || value === undefined
            ? '-'
            : value;
    },

    formatPercentage: function (value) {
        return value === null || value === undefined
            ? '-'
            : value + '%';
    },

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

    refreshDetailsWindow: function () {
        let me=this;
        let dAnswers = Ext.getCmp('details-answers');
        let vGrid = Ext.getCmp('tests-grid');

        dAnswers.getStore().load();
        vGrid.getStore().load();
        me.loadAttempt();
    }
});