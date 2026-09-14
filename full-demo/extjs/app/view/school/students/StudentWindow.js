/**
 * Form window used to create or edit a student.
 *
 * The current save handler is intentionally a placeholder for the future API
 * integration already indicated in the implementation.
 */
Ext.define('EvalApp.view.school.students.StudentWindow', {
    extend: 'Ext.window.Window',
    xtype: 'student-window',

    modal: true,

    width: 500,

    layout: 'fit',

    mode: 'new',

    items: [{
        xtype: 'form',

        bodyPadding: 15,

        defaults: {
            xtype: 'textfield',
            anchor: '100%',
            labelWidth: 100
        },

        items: [{
            xtype: 'hiddenfield',
            name: 'id'
        }, {
            fieldLabel: 'Full Name',
            name: 'full_name',
            allowBlank: false
        }, {
            fieldLabel: 'E-mail',
            name: 'email',
            vtype: 'email',
            allowBlank: false
        }, {
            xtype: 'combo',
            fieldLabel: 'Status',
            name: 'status',

            store: [
                ['active', 'Active'],
                ['inactive', 'Inactive']
            ],

            value: 'active',

            editable: false,
            forceSelection: true
        }]
    }],

    buttons: [{
        text: 'Cancel',
        /**
         * Closes the student form without saving.
         *
         * @param {Ext.button.Button} button Cancel button that fired the handler.
         * @returns {void}
         */
        handler: function (button) {
            button.up('window').close();
        }
    }, {
        text: 'Save',
        iconCls: 'x-fa fa-save',
        /**
         * Validates the student form and collects the values to be saved.
         *
         * The POST/PUT integration remains a placeholder in the existing code.
         *
         * @param {Ext.button.Button} button Save button inside the student window.
         * @returns {void}
         */
        handler: function (button) {
            var win = button.up('window'),
                form = win.down('form').getForm();

            if (!form.isValid()) {
                return;
            }

            var values = form.getValues();

            console.log('Mode:', win.mode);
            console.log('Values:', values);

            // Later:
            // if (win.mode === 'new') {
            //     call POST endpoint
            // } else {
            //     call PUT endpoint
            // }
        }
    }]
});