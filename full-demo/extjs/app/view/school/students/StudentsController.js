/**
 * View controller for the Students grid.
 *
 * Handles opening the student form in create or edit mode.
 */
Ext.define('EvalApp.view.school.students.StudentsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.students',

    requires: [
        'EvalApp.view.school.students.StudentWindow',
    ],

    /**
     * Opens an empty student form in create mode.
     *
     * @returns {void}
     */
    onNewStudent: function () {
        Ext.create('EvalApp.view.school.students.StudentWindow', {
            title: 'New Student',
            mode: 'new'
        }).show();
    },

    /**
     * Opens the student form in edit mode and loads the selected record.
     *
     * @param {Ext.grid.Panel} grid Grid containing the selected student.
     * @param {Number} rowIndex Index of the selected row in the grid store.
     * @returns {void}
     */
    onEditStudent: function (grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);

        var win = Ext.create('EvalApp.view.school.students.StudentWindow', {
            title: 'Edit Student',
            mode: 'edit'
        });

        win.down('form').loadRecord(record);

        win.show();
    }
});