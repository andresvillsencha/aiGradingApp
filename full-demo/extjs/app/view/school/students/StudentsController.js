Ext.define('EvalApp.view.school.students.StudentsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.students',

    requires: [
        'EvalApp.view.school.students.StudentWindow',
    ],

    onNewStudent: function () {
        Ext.create('EvalApp.view.school.students.StudentWindow', {
            title: 'New Student',
            mode: 'new'
        }).show();
    },

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