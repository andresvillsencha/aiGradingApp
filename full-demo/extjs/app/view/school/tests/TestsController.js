Ext.define('EvalApp.view.school.tests.TestsController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'EvalApp.view.school.tests.TestWindow',
        'EvalApp.view.school.tests.QuestionsWindow'
    ],

    alias: 'controller.tests',

    onNewTest: function () {
        Ext.create('EvalApp.view.school.tests.TestWindow', {
            title: 'New Test',
            mode: 'new'
        }).show();
    },

    onEditTest: function (grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);

        var win = Ext.create('EvalApp.view.school.tests.TestWindow', {
            title: 'Edit Test',
            mode: 'edit'
        });

        win.down('form').loadRecord(record);

        win.show();
    },

    onViewQuestions: function (grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);

        Ext.create('EvalApp.view.school.tests.QuestionsWindow', {
            testRecord: record
        }).show();
    },

    onSaveTest: function (button) {
        var win = button.up('window'),
            form = win.down('form').getForm();

        if (!form.isValid()) {
            return;
        }

        var values = form.getValues();

        if (win.mode === 'new') {

            console.log('Create test:', values);

            // POST /api/tests

        } else {

            console.log('Update test:', values);

            // PUT /api/tests/:id

        }
    }
});