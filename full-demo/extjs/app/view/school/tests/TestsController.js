/**
 * View controller for the Tests grid and related test windows.
 *
 * Handles opening create/edit windows, displaying test questions, and the
 * current placeholder save flow.
 */
Ext.define('EvalApp.view.school.tests.TestsController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'EvalApp.view.school.tests.TestWindow',
        'EvalApp.view.school.tests.QuestionsWindow'
    ],

    alias: 'controller.tests',

    /**
     * Opens an empty test form in create mode.
     *
     * @returns {void}
     */
    onNewTest: function () {
        Ext.create('EvalApp.view.school.tests.TestWindow', {
            title: 'New Test',
            mode: 'new'
        }).show();
    },

    /**
     * Opens the test form in edit mode and loads the selected record into it.
     *
     * @param {Ext.grid.Panel} grid Grid containing the selected test.
     * @param {Number} rowIndex Index of the selected row in the grid store.
     * @returns {void}
     */
    onEditTest: function (grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);

        var win = Ext.create('EvalApp.view.school.tests.TestWindow', {
            title: 'Edit Test',
            mode: 'edit'
        });

        win.down('form').loadRecord(record);

        win.show();
    },

    /**
     * Opens the questions window for the selected test.
     *
     * @param {Ext.grid.Panel} grid Grid containing the selected test.
     * @param {Number} rowIndex Index of the selected row in the grid store.
     * @returns {void}
     */
    onViewQuestions: function (grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);

        Ext.create('EvalApp.view.school.tests.QuestionsWindow', {
            testRecord: record
        }).show();
    },

    /**
     * Validates the test form and branches between create and update behavior.
     *
     * The API calls are currently placeholders; the existing implementation only
     * logs the submitted values.
     *
     * @param {Ext.button.Button} button Save button inside the test window.
     * @returns {void}
     */
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