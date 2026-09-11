Ext.define('EvalApp.view.tests.TestController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.test-attempts',

    requires: [
        'EvalApp.view.tests.DetailsWindow'
    ],
    
    onAttemptDoubleClick: function (grid, record) {
        Ext.create(
            'EvalApp.view.tests.DetailsWindow',
            {
                attemptRecord: record,
                mainGrid: grid,

                listeners: {
                    evaluatetest: 'onEvaluateTest'
                }
            }
        ).show();
    },

    onEvaluateTest: function (btn) {
        let wnd = btn.up('window');
        let attemptRecord = wnd.attemptRecord;
        let me = this,
            attemptId = attemptRecord.get('id'),
            answersGrid = wnd.down('grid'),
            answersStore = answersGrid.getStore();

        Ext.Msg.confirm(
            'Evaluate Test',
            'Are you sure you want to evaluate this test?',
            function (choice) {

                if (choice !== 'yes') {
                    return;
                }

                wnd.setLoading('Evaluating test...');

                Ext.Ajax.request({
                    url: 'http://localhost:3000/api/attempts/' +
                        attemptId +
                        '/grade',

                    method: 'POST',

                    success: function (response) {
                        var result;

                        wnd.setLoading(false);

                        try {
                            result = Ext.decode(response.responseText);
                        } catch (e) {
                            result = null;
                        }

                        if (result && result.success === false) {
                            Ext.Msg.alert(
                                'Evaluation Error',
                                result.message || 'Unable to evaluate the test.'
                            );

                            return;
                        }

                        wnd.mainGrid.getStore().reload();

                        answersStore.reload({
                            callback: function (records, operation, success) {
                                Ext.toast({
                                    html: 'Test evaluated successfully.',
                                    title: 'Evaluation Complete',
                                    align: 't',
                                    slideInDuration: 300
                                });
                            }
                        });
                    },

                    failure: function (response) {
                        var result;

                        wnd.setLoading(false);

                        try {
                            result = Ext.decode(response.responseText);
                        } catch (e) {
                            result = null;
                        }

                        Ext.Msg.alert(
                            'Evaluation Error',
                            result && result.message
                                ? result.message
                                : 'An error occurred while evaluating the test.'
                        );
                    }
                });
            }
        );
    }
});