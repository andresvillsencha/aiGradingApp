/**
 * Form window used to create or edit a test.
 *
 * The `mode` config indicates whether the form represents a new or existing
 * test. Saving is delegated to the Tests controller.
 */
Ext.define('EvalApp.view.school.tests.TestWindow', {
    extend: 'Ext.window.Window',
    xtype: 'test-window',

    modal: true,

    width: 550,

    layout: 'fit',

    mode: 'new',

    items: [{
        xtype: 'form',

        bodyPadding: 15,

        defaults: {
            anchor: '100%',
            labelWidth: 120
        },

        items: [{
            xtype: 'hiddenfield',
            name: 'id'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Title',
            name: 'title',
            allowBlank: false
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'description',
            height: 120
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Passing Score',
            name: 'passing_score',
            minValue: 0,
            maxValue: 100,
            value: 70,
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
         * Closes the test form without saving.
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
        handler: 'onSaveTest'
    }]
});