/**
 * Store that loads available tests and their question counts from the API.
 */
Ext.define('EvalApp.store.Tests', {
    extend: 'EvalApp.store.baseStore',

    alias: 'store.tests',

    fields: [
        'id',
        'title',
        'description',
        {
            name: 'passing_score',
            type: 'int'
        },
        'status',
        {
            name: 'question_count',
            type: 'int'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'http://localhost:3000/api/tests',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'count',
            successProperty: 'success'
        }
    },
});