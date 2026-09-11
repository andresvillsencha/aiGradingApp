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
        handler: function (button) {
            button.up('window').close();
        }
    }, {
        text: 'Save',
        iconCls: 'x-fa fa-save',
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